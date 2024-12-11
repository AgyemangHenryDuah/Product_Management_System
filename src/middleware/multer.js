const multer = require("multer")
const path = require("path")

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, `file_${Date.now()}-${file.originalname}`)
  },
})

// File filter configuration
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimeType = allowedTypes.test(file.mimetype)

  if (extName && mimeType) {
    cb(null, true)
  } else {
    cb(new Error("Only images are allowed"))
  }
}

// Multer initialization
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
})

console.log(__dirname);
const uploadImage= upload.single("image")
module.exports = uploadImage
