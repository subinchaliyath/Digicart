const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const morgan = require('morgan')


const connectDB = require("./config/db");

const productRoutes = require("./Router/productRoutes");
const userRoutes = require("./Router/userRoutes");
const orderRoutes = require("./Router/orderRoutes");
const uploadRoutes = require("./Router/uploadRoutes");
const {notFound,errorHandler} =require('./middleware/errorMiddleware')
dotenv.config();
connectDB();
const app = express();
if(process.env.NODE_ENV ==='dev'){
  app.use(morgan('dev'))
}
app.use(express.json())




app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload",(req,res,next)=>{ console.log("here"); next()}, uploadRoutes);

app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/upload',express.static(path.join(__dirname,'../upload')))
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
