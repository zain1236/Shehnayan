import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantContactNo: {
    type: String,
    required: true,
  },
  applicantCNIC: {
    type: String,
    required: true,
  },
  applicantAddress: {
    type: String,
    required: true,
  },
  houseOwnership: {
    type: String,
    enum: ["Own", "Rent"],
    required: true,
  },
  applicantJobOccupation: {
    type: String,
  },
  applicantSalary: {
    type: Number,
  },
  guardianName: {
    type: String,
  },
  guardianRelationWithApplicant: {
    type: String,
  },
  guardianCNIC: {
    type: Number,
  },
  guardianJobOccupation: {
    type: String,
  },
  guardianSalary: {
    type: Number,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  itemsNeeded: {
    type: [String],
    enum: [
      "Bed set (Bed, Mattress, Wardrobe)",
      "Iron",
      "Crockery",
      "Refrigerator",
      "Juicer",
      "Grinder",
      "Washing machine",
    ],
  },
  electricityBillImage: {
    type: String,
  },
  CNICImage: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Live", "Completed"],
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Ad = mongoose.model("Ad", AdSchema);
export default Ad;
