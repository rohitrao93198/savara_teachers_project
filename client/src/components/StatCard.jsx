const StatCard = ({ title, value, color }) => {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className={`text-3xl font-bold mt-2 ${color || ""}`}>
                {value ?? 0}
            </h2>
            <p className="text-xs text-gray-400 mt-1">This week</p>
        </div>
    );
};

export default StatCard;