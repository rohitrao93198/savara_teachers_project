import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#ec4899", "#f97316"];

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [selected, setSelected] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const res = await api.get("/teachers");
            setTeachers(res.data);

            if (res.data.length) {
                setSelected(res.data[0]._id);
                fetchTeacherStats(res.data[0]._id);
            }
        } catch (err) {
            console.error("Teacher list error", err);
        }
    };

    const fetchTeacherStats = async (teacherId) => {
        try {
            setLoading(true);
            const res = await api.get(`/teachers/${teacherId}`);
            setData(res.data);
        } catch (err) {
            console.error("Teacher stats error", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const id = e.target.value;
        setSelected(id);
        fetchTeacherStats(id);
    };

    const getCount = (type) => {
        if (!data?.stats) return 0;
        const item = data.stats.find((s) => s._id === type);
        return item?.count || 0;
    };

    const teacherName =
        teachers.find((t) => t._id === selected)?.teacher_name || "Teacher";

    const chartData = [
        { name: "Lesson Plan", value: getCount("Lesson Plan") },
        { name: "Quiz", value: getCount("Quiz") },
        { name: "Question Paper", value: getCount("Question Paper") },
    ];

    const subjectData = Object.values(
        (data?.recent || []).reduce((acc, item) => {
            const key = item.subject || "Unknown";

            if (!acc[key]) {
                acc[key] = { name: key, value: 0 };
            }

            acc[key].value += 1;
            return acc;
        }, {})
    );

    const gradeData = Object.values(
        (data?.recent || []).reduce((acc, item) => {
            const key = item.grade ?? "Unknown";

            if (!acc[key]) {
                acc[key] = { name: `Grade ${key}`, value: 0 };
            }

            acc[key].value += 1;
            return acc;
        }, {})
    );

    const subjectsList = [
        ...new Set((data?.recent || []).map((r) => r.subject).filter(Boolean)),
    ];

    return (
        <div className="space-y-6">
            {/* header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Per Teacher Analysis</h1>

                <select
                    value={selected}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 bg-white"
                >
                    {teachers.map((t) => (
                        <option key={t._id} value={t._id}>
                            {t.teacher_name || t._id}
                        </option>
                    ))}
                </select>
            </div>

            {/* teacher info */}
            <div>
                <p className="text-gray-500">{teacherName}</p>
                <p className="text-sm text-gray-400">
                    Subjects: {subjectsList.join(", ") || "—"}
                </p>
            </div>

            {loading ? (
                <p>Loading teacher data...</p>
            ) : (
                <>
                    {/* ✅ stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            title="Lessons Created"
                            value={getCount("Lesson Plan")}
                            color="text-green-600"
                        />
                        <StatCard
                            title="Quizzes Conducted"
                            value={getCount("Quiz")}
                            color="text-pink-600"
                        />
                        <StatCard
                            title="Assessments Made"
                            value={getCount("Question Paper")}
                            color="text-orange-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border">
                            <h3 className="font-semibold mb-4">Activity Breakdown</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 🥧 Pie Chart */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border">
                            <h3 className="font-semibold mb-4">Activity Share</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ✅ Subject & Grade charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border">
                            <h3 className="font-semibold mb-4">Subject Distribution</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={subjectData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border">
                            <h3 className="font-semibold mb-4">Grade Distribution</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={gradeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border">
                        <h3 className="font-semibold mb-3">Recent Activity</h3>

                        {!data?.recent?.length ? (
                            <p className="text-gray-400">No recent activity</p>
                        ) : (
                            <div className="space-y-2">
                                {data.recent.slice(0, 5).map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex justify-between text-sm border-b pb-2"
                                    >
                                        <span>{item.activity_type}</span>
                                        <span className="text-gray-400">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Teachers;