const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/user");
const products = require("./data/products");
const User = require("./Model/userModel");
const Order = require("./Model/orderModel.js");
const Product = require("./Model/productModel.js");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("success");
    process.exit();
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("destroyed");
    process.exit();
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
};
 if(process.arch[2]==='-d'){
     destroyData()
 }else{
     importData();
 }