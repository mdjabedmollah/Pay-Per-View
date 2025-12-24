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

    if (order.buyerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (order.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Order is not completed yet",
      });
    }

    const review = await Review.create({
      serviceId: order.serviceId,
      sellerId: order.sellerId,
      reviewerId: req.user.id,
      rating,
      comment,
    });

    return res.status(201).json({
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
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
