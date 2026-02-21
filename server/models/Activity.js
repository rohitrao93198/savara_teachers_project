import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        teacher_id: {
            type: String,
            required: true,
            index: true,
        },
        teacher_name: {
            type: String,
            required: true,
        },
        activity_type: {
            type: String,
            enum: ["Lesson Plan", "Quiz", "Question Paper"],
            required: true,
            index: true,
        },
        subject: {
            type: String,
        },
        grade: {
            type: Number,
        },
        created_at: {
            type: Date,
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

activitySchema.index(
    { teacher_id: 1, activity_type: 1, created_at: 1 },
    { unique: false }
);

export default mongoose.model("Activity", activitySchema);