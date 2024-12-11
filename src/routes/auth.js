const express = require("express");

const router = express.Router();

const { body } = require('express-validator')
const authController = require("../controllers/authController");

router.get("/login", authController.showLoginForm);

router.get("/register", authController.showRegisterForm);

router.post("/register",[ body('username').trim().isLength({ min: 3 }).escape(),  body('email').isEmail().normalizeEmail(),  body('password').isLength({ min: 6 })], authController.register);

router.post("/login",  [ body("email").isEmail().normalizeEmail(), body("password").notEmpty()], authController.login);

router.get("/logout", authController.logout);

module.exports = router;
