const express = require("express");
const router = express.Router();

const {
  getProductById,
  getProducts,
} = require("../controllers/productControllers");

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)


module.exports = router;
