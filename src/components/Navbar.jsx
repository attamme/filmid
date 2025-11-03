import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-400">🎬 Filmid</Link>
      <div className="space-x-4">
        <Link to="/login" className="hover:text-blue-400">Login</Link>
        <Link to="/signup" className="hover:text-blue-400">Sign Up</Link>
        <Link to="/profile" className="hover:text-blue-400">Profile</Link>
      </div>
    </nav>
  );
}
