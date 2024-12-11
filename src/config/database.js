const mongoose = require("mongoose")


const connectDB = async () => {
    try {
      console.log("Database connected")
    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

module.exports = connectDB
