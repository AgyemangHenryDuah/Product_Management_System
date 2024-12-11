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


    const userExists = await User.findOne({ $or: [{ email }, { password }] })

    
    if(userExists){
      return ree.render('auth/register', { error: 'User already exists', user: req.body }) 
    }


    const user = User.create({ username, email, password })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    
    req.session.token = token
    req.session.user = user

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d", })

    req.session.token = token
    req.session.user = user

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
