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
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      { $sort: { avgRating: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          sellerId: "$_id",
          email: "$seller.email",
          avgRating: { $round: ["$avgRating", 1] },
          totalReviews: 1,
        },
      },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
