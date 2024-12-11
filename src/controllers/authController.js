const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator')

exports.showLoginForm = (req, res) => {
  res.render("auth/login", { user: req.user });
}

exports.showRegisterForm = (req, res) => {
  res.render("auth/register", { user: req.user });
}

exports.register = async (req, res) => {
  try {
    console.log("Started...")
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render('auth/register', {
        error: errors.array(),
        user:req.body
      })
    }
    
    const { username, email, password } = req.body
    console.log(username, email, password)


    const userExists = await User.findOne({ $or: [{ email }, { password }] })
    console.log(userExists)

    
    if(userExists){
      return ree.render('auth/register', { error: 'User already exists', user: req.body }) 
    }

    console.log("User doesn't exist")

    const user = User.create({ username, email, password })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    
    req.session.token = token
    req.session.user = user
    console.log("jwt token signed")
    res.redirect("/admin");    
  } catch (error) {
    res.render('auth/register', { error: 'Registration failed'})
  }

}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
      return res.render("auth/login", { error: "Invalid credentials", })
    }
    console.log(user, password)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d", })
    console.log("login toekn signed")
    req.session.token = token
    req.session.user = user
    console.log("redirecting user")
    res.redirect("/admin",);
  } catch (error) {
    res.render("auth/login", { error: "Login failed", })
  }

}

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if(error) {
      res.status(400).send("Bad request")
      
    } else {
        res.redirect("/auth/login");

    }
  })
}


// exports.isAdmin = async (req, res, next) => {
//   try {
//     let currentUser;
//     if (req.user) {
//       const user = await User.findById(user.id);
//       currentUser= user
//     }
//     if (currentUser.role !== "admin") throw new Error("no authorized")
    
//     next()
//   } catch (error) {
//     res.status(401)
//   }
// }

// exports.auth = (req, res, next) => {
//   try {
//     let token
//     if (req.session && req.session.user && req.session.token) {
//       token = req.session.token
//     }
//     if (!token) {
//       throw new Error("Not logged in")
//     }
//     const verified = jwt.verify(token, process.env.JWT_SECRET)

//     if (!verified) {
//       throw new Error("Session expired")
//     }

//     console.log(verified)
// req.user = verified
//     next()
//   } catch (error) {
//     res.status(401).json({ error: error.message })
//   }
// }

