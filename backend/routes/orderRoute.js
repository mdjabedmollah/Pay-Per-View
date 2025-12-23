import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { isBuyer } from "../middleware/roleMiddleware.js";
import { CreateOrder, CompleteOrder } from "../controller/OrderController.js";

const router = express.Router();


router.post("/", protect, isBuyer, CreateOrder);


router.put("/:id", protect, CompleteOrder);

export default router;
