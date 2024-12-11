import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/auth/slice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.user.name);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    persistor.purge();
    dispatch(logout());
    toast.success("Çıkış başarıyla yapıldı!");
  };
  return (
    <nav
      className={`fixed w-full p-4 z-50 bg-gradient-to-br from-purple-700/80 to-blue-600/80 backdrop-blur-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-white text-xl font-bold mr-4">
            Logo
          </NavLink>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="text-white hover:text-purple-200">
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/contacts"
                className="text-white hover:text-purple-200"
              >
                Contacts
              </NavLink>
            )}
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-white">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="text-white hover:text-purple-200"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="bg-white hover:bg-gray-100 text-purple-600 py-2 px-4 rounded"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            className="block text-white hover:text-purple-200 py-2"
          >
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/contacts"
              className="block text-white hover:text-purple-200 py-2"
            >
              Contacts
            </NavLink>
          )}
          {isLoggedIn ? (
            <>
              <span className="block text-white py-2">Welcome, {username}</span>
              <NavLink
                to="/logout"
                className="block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-2"
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="block text-white hover:text-purple-200 py-2"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="block bg-white hover:bg-gray-100 text-purple-600 py-2 px-4 rounded mt-2"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
