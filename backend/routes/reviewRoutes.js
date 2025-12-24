import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { isBuyer } from "../middleware/roleMiddleware.js";
import { createReview, getServiceReviews } from "../controller/reviewController.js";

const router = express.Router();

router.post("/", protect, isBuyer, createReview);
router.get("/:serviceId", getServiceReviews);

export default router;
