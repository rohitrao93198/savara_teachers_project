import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import insightsRoutes from "./routes/insights.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";

const app = express();

// ✅ CORS setup
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://savara-teachers-project.vercel.app"
        ],
        credentials: true, // allow cookies or authorization headers
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/insights", insightsRoutes);
app.use("/api/teachers", teacherRoutes);

app.get("/", (req, res) => {
    res.send("Savra Insights API running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});