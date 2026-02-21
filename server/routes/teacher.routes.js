import express from "express";
import { getTeacherDetails, getTeachersList } from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/", getTeachersList);
router.get("/:teacherId", getTeacherDetails);

export default router;