import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);
// eviewSchema.index({ serviceId: 1, reviewerId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
