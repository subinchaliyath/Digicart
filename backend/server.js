const express = require("express");
const dotenv = require("dotenv");
const path = require('path')

const connectDB = require("./config/db");

const productRoutes = require("./Router/productRoutes");
const userRoutes = require("./Router/userRoutes");
const orderRoutes = require("./Router/orderRoutes");
const {notFound,errorHandler} =require('./middleware/errorMiddleware')
dotenv.config();
connectDB();
const app = express();
app.use(express.json())




app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})
console.log(__dirname)
if (process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'../frontend/build')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'..','frontend','build','index.html')))
}else{
app.get("/", (req, res) => {
  res.send("hi");
});
}
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started at ${PORT}`));
