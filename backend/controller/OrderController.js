import Order from "../models/OrderModels.js"

import Service from "../models/ServiceModels.js";

export const CreateOrder = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "serviceId is required",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // prevent duplicate order
    const alreadyOrdered = await Order.findOne({
      serviceId,
      buyerId: req.user.id,
    });

    if (alreadyOrdered) {
      return res.status(400).json({
        success: false,
        message: "You already ordered this service",
      });
    }

    const order = await Order.create({
      serviceId,
      sellerId: service.sellerId,
      buyerId: req.user.id,
      status: "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log("order create error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const CompleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // only seller can complete order
    if (order.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    if (order.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Order already completed",
      });
    }

    order.status = "Completed";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order completed successfully",
    });
  } catch (error) {
    console.log("Complete Order error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
