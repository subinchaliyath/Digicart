const asyncHandler = require("express-async-handler");

const Product = require("../Model/productModel");

// @desc Fetch all products
// @route GET /api/product
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const pageNumber= Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (pageNumber-1));
  res.json({products,pageNumber,pages:Math.ceil(count/pageSize)});
});
// @desc Fetch top 3 products
// @route GET /api/product/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating:-1}).limit(3)
  res.json(products);
});

// @desc Fetch single products
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc delete single product
// @route DELETE /api/product/:id
// @access private and admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc create product
// @route post /api/products
// @access private and admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @desc update product
// @route put /api/products/:id
// @access private and admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc product review
// @route post /api/products/:id/reviews
// @access private
const reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const userReviewed = product.reviews.find(
      (each) => each.user._id.toString() === req.user._id.toString()
    );
    if (userReviewed) {
      res.status(400);
      throw new Error("already reviewed");
    }

    const review = {
      name: req.user.name,
      user: req.user._id,
      rating: Number(rating),
      comment,
    };
    product.numReviews = product.reviews.push(review);
    product.rating =
      product.reviews.reduce((accu, each) => each.rating + accu, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
  reviewProduct,
  getTopProducts
};
