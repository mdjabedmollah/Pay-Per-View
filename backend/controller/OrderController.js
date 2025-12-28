import mongoose from "mongoose";
import Order from "../models/OrderModels.js";
import Service from "../models/ServiceModels.js";

// ✅ CREATE ORDER
export const CreateOrder = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "serviceId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid serviceId",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // ❗ buyer cannot order own service
    if (service.sellerId.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot order your own service",
      });
    }

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

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ COMPLETE ORDER
export const CompleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (order.status === "Completed") {
      return res.status(400).json({ message: "Already completed" });
    }

    order.status = "Completed";
    await order.save();

    res.json({
      success: true,
      message: "Order completed",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET BUYER ORDERS
export const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id })
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch {
    res.status(500).json({ success: false });
  }
};

// ✅ GET SELLER ORDERS
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user.id })
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch {
    res.status(500).json({ success: false });
  }
};
