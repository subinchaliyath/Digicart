const express = require("express");
const router = express.Router();

const {
  getProductById,
  getProducts,
  deleteProductById,
  createProduct,
  updateProduct,
} = require("../controllers/productControllers");
const { admin, protect } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

module.exports = router;
