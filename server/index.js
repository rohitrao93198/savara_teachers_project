import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import insightsRoutes from "./routes/insights.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";

const app = express();

// ✅ CORS setup
const allowedOrigins = [
    "http://localhost:5173", // dev
    "https://sparkly-dusk-042f5e.netlify.app", // Netlify frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin like mobile apps or curl
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

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