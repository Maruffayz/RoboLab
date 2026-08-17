import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { Menu, X, Moon, Sun } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🤖</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              RoboLearn
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Bosh sahifa
            </Link>
            <Link to="/learn" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Darslar
            </Link>
            <Link to="/simulator" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Simulator
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
                Kirish
              </Link>
              <Link to="/register" className="btn-primary">
                Ro'yxatdan o'tish
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Bosh sahifa
            </Link>
            <Link to="/learn" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Darslar
            </Link>
            <Link to="/simulator" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Simulator
            </Link>
            <Link to="/login" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Kirish
            </Link>
            <Link to="/register" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Ro'yxatdan o'tish
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
