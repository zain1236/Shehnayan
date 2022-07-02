import express from "express";
import Ad from "../../../models/Ad.js";
import Donation from "../../../models/Donation.js";
// // auth
import auth from "../middlewares/auth.js";

// // http status codes
import { StatusCodes } from "http-status-codes";
import cloudinary from "../../../cloudinary/index.js";
// //router
const Router = express.Router();

// @route    POST api/v1/donation/makeDonation/:ad_id
// @desc     A donor can make a donation for an ad
// @access   Private. This route will only be accessible to the Donor

Router.post("/makeDonation/:ad_id", auth, async (req, res) => {
  if (req.user.type !== "Donor") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const result1 = await cloudinary.uploader.upload(req.body.donationProof);

    const ad = await Ad.findOne({ _id: req.params.ad_id });
    if (ad) {
      const donation = new Donation({
        user: req.user.userID,
        ad: req.params.ad_id,
        donationProof: result1.secure_url,
        method: req.body.method,
      });
      await donation.save();
      res.status(StatusCodes.OK).send(donation);
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    GET api/v1/donation/:ad_id
// @desc     Get Donation List for a particular ad
// @access   Private. This route will only be accessible to the Admin

Router.get("/:ad_id", auth, async (req, res) => {
  if (req.user.type !== "Admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const donations = await Donation.find({ ad: req.params.ad_id });
    if (donations) {
      res.status(StatusCodes.OK).send(donations);
    } else {
      res.json({ msg: "No Ad Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});
("");

// @route    GET api/v1/donation/
// @desc     Get All donations
// @access   Private. This route will only be accessible to the Admin

Router.get("/", auth, async (req, res) => {
  if (req.user.type !== "Admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const donations = await Donation.find({}).populate("ad");
    if (donations) {
      res.status(StatusCodes.OK).send(donations);
    } else {
      res.json({ msg: "No Donations Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route    PATCH api/v1/donation/:donation_id
// @desc     Approve donation in the donations model
// @access   Private. This route will only be accessible to the Admin

Router.patch("/:donation_id", auth, async (req, res) => {
  if (req.user.type !== "Admin") {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }
  try {
    const donation = await Donation.findOne({ _id: req.params.donation_id });
    if (donation) {
      donation.acceptance = true;
      await donation.save();
      res.status(StatusCodes.OK).send("Done");
    } else {
      res.json({ msg: "No Donation Found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default Router;
