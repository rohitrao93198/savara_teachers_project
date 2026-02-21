import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

const dayMap = {
    1: "Sun",
    2: "Mon",
    3: "Tue",
    4: "Wed",
    5: "Thu",
    6: "Fri",
    7: "Sat",
};

const weekOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyChart = ({ data = [] }) => {
    const formattedMap = data.reduce((acc, item) => {
        const day = dayMap[item._id.day];

        if (!acc[day]) {
            acc[day] = {
                day,
                Quiz: 0,
                "Lesson Plan": 0,
                "Question Paper": 0,
            };
        }

        acc[day][item._id.type] = item.count;
        return acc;
    }, {});

    const formatted = weekOrder.map((day) => ({
        day,
        Quiz: formattedMap[day]?.Quiz || 0,
        "Lesson Plan": formattedMap[day]?.["Lesson Plan"] || 0,
        "Question Paper": formattedMap[day]?.["Question Paper"] || 0,
    }));

    const hasData = formatted.some(
        (d) => d.Quiz || d["Lesson Plan"] || d["Question Paper"]
    );

    if (!hasData) {
        return (
            <div className="bg-white rounded-2xl p-5 shadow-sm border h-[320px] flex items-center justify-center text-gray-400">
                No weekly activity
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            return (
                <div className="bg-white border rounded-lg shadow-md px-3 py-2">
                    <p className="text-sm font-semibold mb-1">{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} className="text-sm" style={{ color: p.color }}>
                            {p.name}: {p.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border h-[320px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Weekly Activity</h3>
                <span className="text-xs text-gray-400">Last 7 days</span>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={formatted}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} />

                    <Tooltip content={<CustomTooltip />} />

                    <Legend wrapperStyle={{ fontSize: "12px" }} />

                    <Line
                        type="monotone"
                        dataKey="Quiz"
                        stroke="#ec4899"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Lesson Plan"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Question Paper"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyChart;