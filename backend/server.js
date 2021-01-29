const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const productRoutes = require("./Router/productRoutes");
const {notFound,errorHandler} =require('./middleware/errorMiddleware')
dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started at ${PORT}`));
