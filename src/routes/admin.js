const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const uploadImage = require("../middleware/multer")
const { protect, isAdmin } = require("../middleware/auth")


//Admin dashboard

router.get("/", protect, isAdmin,  adminController.getAdminDashboard)

// Categories routes
router.get("/categories",protect, adminController.getCategories)

router.get("/categories/create", protect, adminController.createCategory)
router.post("/categories", adminController.storeCategory)

// Products routes
router.get("/products", protect, adminController.getProducts)
router.get("/products/create",protect, adminController.createProduct)
router.post("/products", uploadImage, adminController.storeProduct)
router.post("/product/edit/:id", adminController.editProduct)
router.post("/products/:id/delete", adminController.deleteProduct)

module.exports = router
