const express = require("express");

const {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

//create product route
router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
