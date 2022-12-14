const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
 
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png","avif", "jpeg"],
    folder: "gallery" // The name of the folder in cloudinary
    // resource_type: "raw", // => this is in case you want to upload other type of files, not just images
  }
});
 
module.exports = multer({ storage });