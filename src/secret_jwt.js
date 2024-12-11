const crypto = require("crypto");

// Generate a random secret key
const secretKey = crypto.randomBytes(64).toString("hex");

console.log("JWT Secret Key:", secretKey);

//dhokabeatz2gmail.com:adminpassword
//test@gmail.com:testpassword
