import User from "../models/AuthModels.js";
import Order from "../models/OrderModels.js";
import Review from "../models/ReviewModels.js";
import Service from "../models/ServiceModels.js";

export const stats = async (req, res) => {
  try {
    res.json({
      success: true,
      users: await User.countDocuments(),
      services: await Service.countDocuments(),
      orders: await Order.countDocuments(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const topSellers = async (req, res) => {
  try {
    const data = await Review.aggregate([
      { 
        $group: { 
          _id: "$sellerId", 
          rating: { $avg: "$rating" } 
        } 
      },
      { $sort: { rating: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
