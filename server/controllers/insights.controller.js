import Activity from "../models/Activity.js";

export const getOverview = async (req, res) => {
    try {
        const result = await Activity.aggregate([
            {
                $facet: {
                    totals: [
                        {
                            $group: {
                                _id: "$activity_type",
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    activeTeachers: [
                        {
                            $group: { _id: "$teacher_id" },
                        },
                        { $count: "count" },
                    ],
                },
            },
        ]);

        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getWeeklyTrend = async (req, res) => {
    try {
        const data = await Activity.aggregate([
            {
                $group: {
                    _id: {
                        day: { $dayOfWeek: "$created_at" },
                        type: "$activity_type",
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id.day": 1 } },
        ]);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};