import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import WeeklyChart from "../components/WeeklyChart";

const Dashboard = () => {
    const [overview, setOverview] = useState(null);
    const [weekly, setWeekly] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [overviewRes, weeklyRes] = await Promise.all([
                api.get("/insights/overview"),
                api.get("/insights/weekly"),
            ]);

            setOverview(overviewRes.data);
            setWeekly(weeklyRes.data);
        } catch (err) {
            console.error("Dashboard error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getCount = (type) => {
        if (!overview?.totals) return 0;
        const item = overview.totals.find((t) => t._id === type);
        return item?.count || 0;
    };

    const activeTeachers =
        overview?.activeTeachers?.[0]?.count || 0;

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-24 bg-gray-200 rounded-2xl animate-pulse"
                        />
                    ))}
                </div>

                <div className="h-[320px] bg-gray-200 rounded-2xl animate-pulse" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Insights
                </h1>
                <span className="text-sm text-gray-400">
                    Real-time overview
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Active Teachers"
                    value={activeTeachers}
                    color="text-purple-600"
                />
                <StatCard
                    title="Lessons Created"
                    value={getCount("Lesson Plan")}
                    color="text-green-600"
                />
                <StatCard
                    title="Assessments Made"
                    value={getCount("Question Paper")}
                    color="text-orange-600"
                />
                <StatCard
                    title="Quizzes Conducted"
                    value={getCount("Quiz")}
                    color="text-pink-600"
                />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border">
                <WeeklyChart data={weekly} />
            </div>
        </div>
    );
};

export default Dashboard;