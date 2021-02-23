const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
  }

  else if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
const admin = expressAsyncHandler(async (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next()
  }
  else{
    throw new Error('No admin access')
  }
})
module.exports = {protect,admin};
