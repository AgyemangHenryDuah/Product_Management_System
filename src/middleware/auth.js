const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("User is admin")
    next()
  } else {
    res.redirect("/")
    // res.status(403).render("error", {
    //   error: "Not admin",
    //   message: "Access denied. Admin privileges required.",
    //   user: req.user
    // })
  }
}

exports.protect = async (req, res, next) => {
  try {
    const token = req.session.token
    if (!token) {
      return res.redirect("/auth/login")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret");
    const user = await User.findById(decoded.id)
    console.log("Token decoded and user found", user, decoded)
    if (!user) {
      return res.redirect("/auth/login")
    }

    req.user = user
    next()
  } catch (error) {
    res.redirect("/auth/login")
  }
}
