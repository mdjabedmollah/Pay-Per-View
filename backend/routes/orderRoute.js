import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { isBuyer, isSeller } from "../middleware/roleMiddleware.js";
import {
  CreateOrder,
  CompleteOrder,
  getBuyerOrders,
  getSellerOrders,
} from "../controller/OrderController.js";

const router = express.Router();

router.post("/", protect, isBuyer, CreateOrder);
router.get("/buyer", protect, isBuyer, getBuyerOrders);
router.get("/seller", protect, isSeller, getSellerOrders);
router.put("/:id", protect, isSeller, CompleteOrder);

export default router;
