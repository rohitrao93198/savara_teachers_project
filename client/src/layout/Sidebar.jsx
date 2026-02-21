import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const { pathname } = useLocation();

    const itemClass = (path) =>
        `block px-4 py-2 rounded-lg ${pathname === path
            ? "bg-purple-100 text-purple-600"
            : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <div className="w-64 h-screen bg-white border-r p-4">
            <h1 className="text-2xl font-bold text-purple-600 mb-8">SAVRA</h1>

            <nav className="space-y-2">
                <Link to="/" className={itemClass("/")}>
                    Dashboard
                </Link>

                <Link to="/teachers" className={itemClass("/teachers")}>
                    Teachers
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;