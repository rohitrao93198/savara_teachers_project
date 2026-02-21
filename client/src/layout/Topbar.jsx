const Topbar = () => {
    return (
        <div className="h-16 bg-white border-b flex items-center justify-end px-6">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-semibold">
                    SR
                </div>
                <span className="font-medium text-gray-700">School Admin</span>
            </div>
        </div>
    );
};

export default Topbar;