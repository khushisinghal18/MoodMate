import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-purple-700 flex items-center">
        {/* 🖼️ Image logo */}
        <img src="/logo.png" alt="MoodMate Logo" className="h-10 w-10 mr-2 rounded-full" />
        MoodMate
      </div>
      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <Link to="/recommendations" className="hover:text-purple-600">Recommendations</Link>
        <Link to="/favorites" className="hover:text-purple-600">Favorites</Link>
        <Link to="/about" className="hover:text-purple-600">About</Link>
      </div>
    </nav>
  );
}

