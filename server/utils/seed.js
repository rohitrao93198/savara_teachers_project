import mongoose from "mongoose";
import "dotenv/config";

import connectDB from "../config/db.js";
import Activity from "../models/Activity.js";

const seedData = async () => {
    try {
        await connectDB();

        // 🧹 clear old data
        await Activity.deleteMany({});
        console.log("Old data cleared");

        // 🔥 MANUAL DATA (~60%)
        const data = [
            {
                teacher_id: "T004",
                teacher_name: "Vikas Nair",
                grade: 10,
                subject: "Social Studies",
                activity_type: "Quiz",
                created_at: new Date("2026-02-12T19:07:41"),
            },
            {
                teacher_id: "T003",
                teacher_name: "Pooja Mehta",
                grade: 7,
                subject: "English",
                activity_type: "Question Paper",
                created_at: new Date("2026-02-13T15:31:51"),
            },
            {
                teacher_id: "T001",
                teacher_name: "Anita Sharma",
                grade: 7,
                subject: "Mathematics",
                activity_type: "Lesson Plan",
                created_at: new Date("2026-02-17T20:35:33"),
            },
            {
                teacher_id: "T005",
                teacher_name: "Neha Kapoor",
                grade: 10,
                subject: "Mathematics",
                activity_type: "Quiz",
                created_at: new Date("2026-02-12T12:26:22"),
            },
            {
                teacher_id: "T002",
                teacher_name: "Rahul Verma",
                grade: 9,
                subject: "Science",
                activity_type: "Quiz",
                created_at: new Date("2026-02-17T09:21:32"),
            },
            {
                teacher_id: "T003",
                teacher_name: "Pooja Mehta",
                grade: 6,
                subject: "English",
                activity_type: "Lesson Plan",
                created_at: new Date("2026-02-16T15:41:50"),
            },
            {
                teacher_id: "T004",
                teacher_name: "Vikas Nair",
                grade: 9,
                subject: "Social Studies",
                activity_type: "Lesson Plan",
                created_at: new Date("2026-02-11T13:06:29"),
            },
            {
                teacher_id: "T001",
                teacher_name: "Anita Sharma",
                grade: 8,
                subject: "Mathematics",
                activity_type: "Question Paper",
                created_at: new Date("2026-02-13T09:16:06"),
            },
            {
                teacher_id: "T002",
                teacher_name: "Rahul Verma",
                grade: 8,
                subject: "Science",
                activity_type: "Lesson Plan",
                created_at: new Date("2026-02-15T13:31:36"),
            },
            {
                teacher_id: "T005",
                teacher_name: "Neha Kapoor",
                grade: 9,
                subject: "Mathematics",
                activity_type: "Lesson Plan",
                created_at: new Date("2026-02-16T17:14:47"),
            },
            {
                teacher_id: "T003",
                teacher_name: "Pooja Mehta",
                grade: 6,
                subject: "English",
                activity_type: "Quiz",
                created_at: new Date("2026-02-14T10:05:20"),
            },
            {
                teacher_id: "T002",
                teacher_name: "Rahul Verma",
                grade: 9,
                subject: "Science",
                activity_type: "Question Paper",
                created_at: new Date("2026-02-18T13:31:34"),
            },
        ];

        await Activity.insertMany(data);

        console.log("✅ Manual seed successful");
        process.exit();
    } catch (err) {
        console.error("❌ Seed error:", err);
        process.exit(1);
    }
};

seedData();