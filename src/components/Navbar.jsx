import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="MoodMate Logo"
              className="h-10 w-10 rounded-full mr-2"
            />
            <span className="text-xl font-bold text-purple-700">MoodMate</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="text-purple-700 focus:outline-none"
            >
              ☰
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <Link to="/recommendations" className="hover:text-purple-600">Recommendations</Link>
            <Link to="/favorites" className="hover:text-purple-600">Favorites</Link>
            <Link to="/about" className="hover:text-purple-600">About</Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-2">
            <Link to="/" className="block text-purple-700 font-medium">Home</Link>
            <Link to="/recommendations" className="block text-purple-700 font-medium">Recommendations</Link>
            <Link to="/favorites" className="block text-purple-700 font-medium">Favorites</Link>
            <Link to="/about" className="block text-purple-700 font-medium">About</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
