const Category = require("../models/Category")
const Product = require("../models/Product")



exports.getAllCategories = async (req, res) => {
  const categories = await Category.find()
  res.render('categories/index', { categories, user: req.user})
}



exports.getProducts = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    const products = await Product.find({ category: id })
    
    res.render('categories/category-products', {category, products, user: req.user})
  } catch (error) {
    res.status(500).send('Error fetching category or products')
  }
}

