import Review from "../models/ReviewModels.js";
import Order from "../models/OrderModels.js";

export const createReview = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;

    if (!orderId || !rating) {
      return res.status(400).json({
        success: false,
        message: "orderId and rating are required",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    //  only buyer
    if (order.buyerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Only buyer can review",
      });
    }

    //  completed order only
    if (order.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Order not completed",
      });
    }

    const review = await Review.create({
      serviceId: order.serviceId,
      sellerId: order.sellerId,
      reviewerId: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this service",
      });
    }

    console.log("Review error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.find({ serviceId })
      .populate("reviewerId", "email")
      .sort({ createdAt: -1 });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) /
      (reviews.length || 1);

    res.json({
      success: true,
      reviews,
      avgRating: Number(avgRating.toFixed(1)),
    });
  } catch (error) {
    console.log("Get review error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

