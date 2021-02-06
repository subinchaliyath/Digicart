const asyncHandler = require("express-async-handler");

const Order = require("../Model/orderModel");

// @desc create new orders
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippngPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippngPrice,
      totalPrice}
    );
    const createOrder = await order.save();
    res.status(201).json({createOrder})

  }
});
// @desc get order by Id
// @route POST /api/orders/:orderId
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
   const order=await Order.findById(req.params.id).populate('user','name email')
   if(order){
     res.json(order)
   }else{
     res.status(401);
     throw new Error('order not found')
   }
});

module.exports={addOrderItems,getOrderById}