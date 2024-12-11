const Product = require("../models/Product")
const Category = require("../models/Category")


exports.getAdminDashboard = (req, res) => {
  res.render("admin/index", { user: req.user })
}

exports.getCategories = async (req, res) => {
  const categories = await Category.find()
  res.render("admin/categories/index", { categories, user: req.user })
}

exports.createCategory = (req, res) => {
  res.render("admin/categories/create", { user: req.user })
}

exports.storeCategory = async (req, res) => {
  const { name, description } = req.body
  if (!name || !description) {
    return res.status(400).render("admin/categories/create", {
      user: req.user,
      error: "Name and description are required.",
    })
  }

  try {
    await Category.create({ name, description })
    res.redirect("/admin/categories")
  } catch (error) {
    console.error("Error creating category:", error)
    res.status(500).render("admin/categories/create", {
      user: req.user,
      error: "An error occurred while creating the category.",
    })
  }
}

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("category").lean()
  const categories = await Category.find()
  res.render("admin/products/index", { categories, products, user: req.user })
}

exports.createProduct = async (req, res) => {
  const categories = await Category.find()
  res.render("admin/products/create", { categories, user: req.user })
}

exports.storeProduct = async (req, res) => {
  const categories = await Category.find()
  const { name, description, price, category } = req.body
  const image = req.file ? req.file.filename : null

  if (!name || !description || !price || !category) {
    return res.status(400).render("admin/products/create", {
      categories,
      user: req.user,
      error: "All fields are required.",
    })
  }

  try {
    await Product.create({ name, description, price, category, image })
    res.redirect("/admin/products")
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).render("admin/products/create", {
      user: req.user,
      error: "An error occurred while creating the product.",
    })
  }
}

exports.getProduct = (req, res) => {
  const id = req.params.id
  const product = Product.findOne({ id })

  res.render("admin/products/edit", { product, user: req.user })
}

exports.editProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image },
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(404).send("Product not found")
    }

    res.redirect("/admin/products")
  } catch (error) {
    res.status(500).send("Server Error")
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      req.flash("error", "Product not found.")
      return res.redirect("/admin/products")
    }

    req.flash("success", "Product deleted successfully")
    res.redirect("/admin/products")
  } catch (error) {
    console.error("Error deleting product:", error)
    req.flash("error", "Failed to delete product.")
    res.redirect("/admin/products")
  }
}
