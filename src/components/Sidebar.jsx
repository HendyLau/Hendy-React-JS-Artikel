// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="block hover:text-blue-500">Dashboard</Link></li>
        <li><Link to="/articles" className="block hover:text-blue-500">Articles</Link></li>
        <li><Link to="/videos" className="block hover:text-blue-500">Videos</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
