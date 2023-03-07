const express = require("express");
const productController = require("../controller/productController");

const route = express.Router();
route.get("/", productController.getAll);
route.get("/:id", productController.getById);
route.post("/", productController.create);
route.put("/:id", productController.replaceById);
route.patch("/:id", productController.updateById);
route.delete("/:id", productController.deleteById);

module.exports.route = route;
