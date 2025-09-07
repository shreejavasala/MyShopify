// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <Link to="/" className="text-xl font-bold text-indigo-400">
            MyShopify
          </Link>

          {/* Links */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Cart
            </Link>
            {user ? (
              <>
                <span className="text-gray-300">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-500 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && (
              <>
                <Link
                  to="/login"
                  className="bg-indigo-600 px-3 py-1 rounded-md text-sm hover:bg-indigo-500 transition-colors duration-200 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 px-3 py-1 rounded-md text-sm hover:bg-indigo-500 transition-colors duration-200 cursor-pointer"
                >
                  Signup
                </Link>
              </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
