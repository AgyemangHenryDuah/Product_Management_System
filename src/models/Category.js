const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

categorySchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  next()
})

const Category = mongoose.model("Category", categorySchema)


module.exports = Category