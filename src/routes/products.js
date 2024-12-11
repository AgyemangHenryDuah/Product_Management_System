const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const { protect, isAdmin } = require("../middleware/auth")


router.get("/", productController.getAllProducts)

router.get("/:id", productController.getProduct)

module.exports = router
