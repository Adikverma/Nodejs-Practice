const express = require("express");
const authController = require("../controller/authController");

const route = express.Router();

route.post("/signup", authController.signup);
route.post("/login", authController.login);

exports.route = route;
