import express from "express";
import { createReview } from "../controller/reviewController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import { isBuyer } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, isBuyer, createReview);

export default router;
