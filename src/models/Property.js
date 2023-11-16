import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    CurrentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 6,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 25,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      min: 15,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    phonenumber: {
      type: Number,
      min: 10,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Property ||
  mongoose.model("Property", PropertySchema);
