import express from "express";
import Ad from "../../../models/Ad.js";

// // auth
import auth from "../middlewares/auth.js";

// // http status codes
import { StatusCodes } from "http-status-codes";
// //router
const Router = express.Router();

// // services
import { addAdToDB } from "../services/ad.js";

// middlewares
import cloudinary from "../../../cloudinary/index.js";
import { adValidator } from "../middlewares/ad.js";

// import items from "./items.json";

const getPrice = (item) => {
  const items = [
    {
      item: "Bed set (Bed, Mattress, Wardrobe)",
      price: 200000,
    },
    {
      item: "Refrigerator",
      price: 10000,
    },
    {
      item: "Washing machine",
      price: 30000,
    },
    {
      item: "Crockery",
      price: 50000,
    },
    {
      item: "Grinder",
      price: 30000,
    },
    {
      item: "Juicer",
      price: 40000,
    },
    {
      item: "Iron",
      price: 5000,
    },
  ];

  const found = items.filter((d) => d.item === item);
  return found[0].price;

};

const getTotalPrice =  (items) => {
  let total = 0;

  for (let i in items) {
    // console.log(items[i]);
    total +=  getPrice(items[i]);
  }
  return total;
};

// @route    POST api/v1/ad
// @desc     Post an Ad
// @access   Private

Router.post("/", [auth, adValidator], async (req, res) => {
  if (req.user.type !== "Receiver") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const result = await cloudinary.uploader.upload(
      req.body.electricityBillImage
    );
    const result1 = await cloudinary.uploader.upload(req.body.CNICImage);
    const adData = {
      user: req.user.userID,
      electricityBillImage: result.secure_url,
      CNICImage: result1.secure_url,
      applicantName: req.body.applicantName,
      applicantContactNo: req.body.applicantContactNo,
      applicantCNIC: req.body.applicantCNIC,
      applicantAddress: req.body.applicantAddress,
      houseOwnership: req.body.houseOwnership,
      applicantJobOccupation: req.body.applicantJobOccupation,
      applicantSalary: req.body.applicantSalary,
      guardianName: req.body.guardianName,
      guardianRelationWithApplicant: req.body.guardianRelationWithApplicant,
      guardianCNIC: req.body.guardianCNIC,
      guardianJobOccupation: req.body.guardianJobOccupation,
      guardianSalary: req.body.guardianSalary,
      deliveryDate: req.body.deliveryDate,
      itemsNeeded: req.body.itemsNeeded,
      totalAmount: getTotalPrice(req.body.itemsNeeded),
    };
    await addAdToDB(adData);
    const addedAd = await Ad.findOne({ user: req.user.userID });

    res.status(StatusCodes.OK).json(addedAd);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    GET api/v1/ad:ad_id
// @desc     Get live ad by id
// @access   Private. This route will only be accessible to the Donor and admin

Router.get("/live/:ad_id", auth, async (req, res) => {
  if (req.user.type === "Receiver") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const ad = await Ad.findOne({
      $and: [{ _id: req.params.ad_id }, { status: "Live" }],
    });
    if (ad) {
      const { _id, itemsNeeded, totalAmount, deliveryDate } = ad;
      res.json({ _id, itemsNeeded, totalAmount, deliveryDate });
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    GET api/v1/ad/live
// @desc     Get all live ads
// @access   Private. This route will only be accessible to the Donor and admin

Router.get("/live", auth, async (req, res) => {
  if (req.user.type === "Receiver") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const ad = await Ad.find({ status: "Live" });
    if (ad) {
      //   const refinedAds = ad.map(function (element) {
      //     const advertisement = {
      //       _id: element._id,
      //       itemsNeeded: element.itemsNeeded,
      //       totalAmount: element.totalAmount,
      //       deliveryDate: element.deliveryDate,
      //     };
      //     return advertisement;
      // });
      res.json(ad);
    } else {
      res.json({ msg: "No Ad Found" });
    }
    // }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    GET api/v1/ad/pending
// @desc     Get all pending ads
// @access   Private. This route will only be accessible to  admin

Router.get("/pending", auth, async (req, res) => {
  if (req.user.type !== "Admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const ad = await Ad.find({ status: "Pending" });
    if (ad) {
      res.json(ad);
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    GET api/v1/ad/pending/:ad_id
// @desc     Get pending ad by id
// @access   Private. This route will only be accessible to admin

Router.get("/pending/:ad_id", auth, async (req, res) => {
  if (req.user.type === "Receiver") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const ad = await Ad.findOne({
      $and: [{ _id: req.params.ad_id }, { status: "Pending" }],
    });
    if (ad) {
      res.json(ad);
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});
// @route    PATCH api/v1/ad/ad:ad_id
// @desc     Change status of ad
// @access   Private. This route will only be accessible  admin

Router.patch("/:ad_id", auth, async (req, res) => {
  if (req.user.type !== "Admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    let ad = await Ad.findOne({ Id: req.params.ad_id });
    if (ad) {
      // update
      await Ad.findOneAndUpdate(
        { _id: req.params.ad_id },
        { status: req.body.status }
      );
      ad = await Ad.findOne({ _id: req.params.ad_id });
      return res.send(ad);
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    PATCH api/v1/ad/approveDonation/:ad_id
// @desc     Approve donation given by a donor on particular ad
// @access   Private. This route will only be accessible  admin

Router.patch("/approveDonation/:ad_id", auth, async (req, res) => {
  if (req.user.type !== "Admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    let ad = await Ad.findOne({ _id: req.params.ad_id });
    if (ad) {
      // update
      if (ad.amountPaid + req.body.donation >= ad.totalAmount) {
        // now automatically change status of ad to completed
        await Ad.findOneAndUpdate(
          { _id: req.params.ad_id },
          { amountPaid: ad.amountPaid + req.body.donation, status: "Completed" }
        );
      } else {
        await Ad.findOneAndUpdate(
          { _id: req.params.ad_id },
          { amountPaid: ad.amountPaid + req.body.donation }
        );
      }
      ad = await Ad.findOne({ _id: req.params.ad_id });
      return res.send(ad);
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   GET (/api/v1/ad/myAd)
// @desc    GET All the ads of paticular Reciever
// @access  Private This route will only be accessible to Reciever

Router.get("/myAd", auth, async (req, res) => {
  if (req.user.type !== "Receiver") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const ad = await Ad.find({ user: req.user.userID });
    res.send(ad);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default Router;
