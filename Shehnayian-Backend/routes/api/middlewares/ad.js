import Joi from "joi";

import path from "path";
import multer from "multer";

import dotenv from "dotenv";

// dotenv config
dotenv.config();

// http status codes
import { StatusCodes } from "http-status-codes";

const adValidator = async (req, res, next) => {
  const { body } = req;
  const houseOwnership = {
    A: "Own",
    B: "Rent",
  };
  const items = [
    "Bed set (Bed, Mattress, Wardrobe)",
    "Iron",
    "Crockery",
    "Refrigerator",
    "Juicer",
    "Grinder",
    "Washing machine",
  ];
  const adValidatorSchema = Joi.object({
    applicantName: Joi.string().max(100).required(),
    applicantContactNo: Joi.string().max(100).required(),
    applicantCNIC: Joi.number().required(),
    applicantAddress: Joi.string().required(),
    houseOwnership: Joi.string()
      .valid(...Object.values(houseOwnership))
      .required(),
    applicantJobOccupation: Joi.string(),
    applicantSalary: Joi.number(),
    guardianName: Joi.string().max(100),
    guardianRelationWithApplicant: Joi.string(),
    guardianCNIC: Joi.number(),
    guardianJobOccupation: Joi.string(),
    guardianSalary: Joi.number(),
    deliveryDate: Joi.date().required(),
    itemsNeeded: Joi.array(),
    totalAmount: Joi.number().required(),
    CNICImage: Joi.string().required(),
    electricityBillImage: Joi.string().required(),
  });

  try {
    await adValidatorSchema.validateAsync(body);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: err.details[0].message,
    });
  }
  next();
};

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let uploadDirectory = "";
    const __dirname = path.resolve();
    if (file.fieldname === "electricityBillImage") {
      // uploadDirectory = path.join(__dirname, '\C:\Users\zaina\Desktop\Shehnayian-Backend\ApplicantElectricityBillUploads');
      uploadDirectory = __dirname;
      // uploadDirectory = __dirname+"\\ApplicantElectricityBillUploads"
    } else if (file.fieldname === "CNICImage") {
      // uploadDirectory = path.join(__dirname, '\C:\Users\zaina\Desktop\Shehnayian-Backend\ApplicantCNICUploads');
      uploadDirectory = __dirname;
      // uploadDirectory = __dirname+"\\ApplicantCNICUploads"
    }
    console.log(uploadDirectory, "   asdf");
    // console.log(__dirname, "   asdf")
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    var filename = "";
    const matchForImages = ["image/png", "image/jpeg", "image/jpg"];
    if (
      file.fieldname === "electricityBillImage" &&
      matchForImages.indexOf(file.mimetype) === -1
    ) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      filename = `${Date.now()}-Shehnaiyan-electricityBillImage-${
        req.user.userID
      }-${file.originalname}`;
      return callback(message, null);
    }
    if (
      file.fieldname === "CNICImage" &&
      matchForImages.indexOf(file.mimetype) === -1
    ) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      filename = `${Date.now()}-Shehnaiyan-CNICImage-${req.user.userID}-${
        file.originalname
      }`;
      return callback(message, null);
    }
    callback(null, filename);
  },
});
var uploadFiles = multer({ storage: storage });

export { adValidator, uploadFiles };
