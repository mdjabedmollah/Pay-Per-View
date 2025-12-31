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

router.post("/", protect, isBuyer, CreateOrder); // order create 
router.get("/buyer", protect, isBuyer, getBuyerOrders); // get all byer order 

router.put("/:id", protect, isSeller, CompleteOrder); // order comple korbe seller
router.get("/seller", protect, isSeller, getSellerOrders);
export default router;
