// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Images",
//     allowedFormts: ["jpeg", "png", "jpg"],
//   },
// });

// module.exports = { cloudinary };
//   storage,
