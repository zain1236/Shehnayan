import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  method: {
    type: String,
  },
  ad: {
    type: Schema.Types.ObjectId,
    ref: "Ad",
    required: true,
  },
  donationAmount: {
    type: Number,
  },
  donationProof: {
    type: String,
  },
  acceptance: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
