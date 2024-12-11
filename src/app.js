require("dotenv").config()
const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const methodOverride = require("method-override")
const MongoStore = require("connect-mongo")
const connectDB = require("./config/database")
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const productRoutes = require("./routes/products")
const categoryRoutes = require("./routes/categories")
const flash = require("connect-flash");


const app = express()
const PORT = process.env.PORT || 3000

connectDB()


// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(flash())


//Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || "mongodb://localhost:27017/PDS",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


// View engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")


// Routes
app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)

app.get('/', (req, res) => {
    res.render('index', { user: req.user })
})

app.listen(PORT, () => {
  console.log(`E dey go on for http://localhost:${PORT}`)
})
