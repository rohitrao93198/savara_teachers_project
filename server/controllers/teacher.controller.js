import Activity from "../models/Activity.js";
import mongoose from "mongoose";

export const getTeacherDetails = async (req, res) => {
    try {
        const { teacherId } = req.params;

        if (!teacherId) {
            return res.status(400).json({ error: "teacherId required" });
        }

        const stats = await Activity.aggregate([
            {
                $match: { teacher_id: teacherId.trim() },
            },
            {
                $group: {
                    _id: "$activity_type",
                    count: { $sum: 1 },
                },
            },
        ]);

        const recent = await Activity.find({
            teacher_id: teacherId.trim(),
        })
            .sort({ created_at: -1 })
            .limit(5);

        res.json({ stats, recent });
    } catch (err) {
        console.error("Teacher details error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getTeachersList = async (req, res) => {
    try {
        const teachers = await Activity.aggregate([
            {
                $group: {
                    _id: "$teacher_id",
                    teacher_name: { $first: "$teacher_name" },
                    totalActivities: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};