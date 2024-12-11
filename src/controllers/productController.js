const Product = require("../models/Product")


exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate('category')
  res.render('products/index', { products, user: req.user})
}


exports.getProduct = async (req, res) => {
  id = req.params.id
  const product = Product.findOne({ id })
}

