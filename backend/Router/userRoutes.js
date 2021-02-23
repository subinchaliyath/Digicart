const express = require("express");
const router = express.Router();

const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUser
} = require("../controllers/userController");
const {protect,admin} = require("../middleware/authMiddleware.js");
router.route("/login").post(authUser);
router.route("/").post(registerUser).get(protect,admin,getAllUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
