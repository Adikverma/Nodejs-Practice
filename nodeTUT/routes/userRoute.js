const express = require("express");
const userController = require("../controller/userController");

const route = express.Router();
route.get("/", userController.getAll);
route.get("/:id", userController.getById);
route.put("/:id", userController.replaceById);
route.patch("/:id", userController.updateById);
route.delete("/:id", userController.deleteById);

module.exports.route = route;
