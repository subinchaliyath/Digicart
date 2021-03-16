const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetype =/(png|jpg|jpeg)/
  const ext=filetype.test(path.extname(file.originalname).toLowerCase())
  const mimetype=filetype.test(file.mimetype)
  console.log(ext, mimetype);
  if(ext && mimetype){
      return cb(null,true)
  }else{
      return cb('Images only')
  }
};
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/',upload.single('image'),(req,res)=>{
    res.send(`${req.file.path}`)
})

module.exports = router;
