
import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { stats, topSellers } from "../controller/adminController.js";

const router = express.Router();

router.get("/stats", protect, isAdmin, stats);
router.get("/top-sellers", protect, isAdmin, topSellers);

export default router;
