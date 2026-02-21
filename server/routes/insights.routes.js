import express from "express";
import { getOverview, getWeeklyTrend } from "../controllers/insights.controller.js";

const router = express.Router();

router.get("/overview", getOverview);
router.get("/weekly", getWeeklyTrend);

export default router;