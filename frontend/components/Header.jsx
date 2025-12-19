import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { MdMail, MdPhone } from "react-icons/md";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Friends92Logo from "./icons/Logo";
import LoginModal from "./LoginModal";
import { loginAdmin } from "../api/Login.js";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const activeLinkStyle = {
    color: "#16a34a",
    fontWeight: "600",
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsAlumniDropdownOpen(false);
  }, [location]);

  const handleLogin = async (username, password) => {
    try {
      await loginAdmin(username, password);
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoginModalOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isAlumniDropdownOpen, setIsAlumniDropdownOpen] = useState(false);

  const NavLinks = ({ isMobile }) => {
    const navClass = isMobile
      ? "flex flex-col space-y-2"
      : "flex items-center gap-1";

    const linkClass =
      "text-gray-600 hover:text-green-600 transition text-sm px-2 py-1.5 font-medium whitespace-nowrap";

    return (
      <ul className={navClass}>
        <li>
          <NavLink
            to="/about"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/programs"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Programs/Projects
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/success-stories"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Success Stories
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/gallery"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Gallery
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/volunteer"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Volunteer Section
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/events"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Events/News
          </NavLink>
        </li>

        {/* Services Dropdown */}
        <li className={isMobile ? "" : "relative group"}>
          {isMobile ? (
            <div className="flex flex-col space-y-1">
              <NavLink
                to="/services"
                className={linkClass}
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
              >
                Services
              </NavLink>
              <div className="ml-4 flex flex-col space-y-1">
                <NavLink
                  to="/services/skill-development"
                  className="text-gray-500 hover:text-green-600 transition text-sm px-2 py-1 font-medium"
                >
                  Skill Development
                </NavLink>
                <NavLink
                  to="/services/personality-development"
                  className="text-gray-500 hover:text-green-600 transition text-sm px-2 py-1 font-medium"
                >
                  Personality Development
                </NavLink>
                <NavLink
                  to="/placement"
                  className="text-gray-500 hover:text-green-600 transition text-sm px-2 py-1 font-medium"
                >
                  Placement
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              <button
                className="flex items-center text-gray-600 hover:text-green-600 transition text-sm px-2 py-1.5 font-medium whitespace-nowrap"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                Services
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {isServicesDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 bg-white shadow-lg rounded-lg border border-gray-200 py-2 min-w-48 z-50"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <NavLink
                    to="/services/skill-development"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 transition"
                  >
                    Skill Development
                  </NavLink>
                  <NavLink
                    to="/services/personality-development"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 transition"
                  >
                    Personality Development
                  </NavLink>
                  <NavLink
                    to="/placement"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 transition"
                  >
                    Placement
                  </NavLink>
                </div>
              )}
            </>
          )}
        </li>

        {/* Alumni Dropdown */}
        <li className={isMobile ? "" : "relative group"}>
          {isMobile ? (
            <div className="flex flex-col space-y-1">
              <span className={linkClass}>Alumni</span>
              <div className="ml-4 flex flex-col space-y-1">
                <NavLink
                  to="/alumni/register"
                  className="text-gray-500 hover:text-green-600 transition text-sm px-2 py-1 font-medium"
                >
                  Register Alumni
                </NavLink>
                <NavLink
                  to="/alumni/view"
                  className="text-gray-500 hover:text-green-600 transition text-sm px-2 py-1 font-medium"
                >
                  View Alumni
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              <button
                className="flex items-center text-gray-600 hover:text-green-600 transition text-sm px-2 py-1.5 font-medium whitespace-nowrap"
                onMouseEnter={() => setIsAlumniDropdownOpen(true)}
                onMouseLeave={() => setIsAlumniDropdownOpen(false)}
              >
                Alumni
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>
              {isAlumniDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 bg-white shadow-lg rounded-lg border border-gray-200 py-2 min-w-48 z-50"
                  onMouseEnter={() => setIsAlumniDropdownOpen(true)}
                  onMouseLeave={() => setIsAlumniDropdownOpen(false)}
                >
                  <NavLink
                    to="/alumni/register"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 transition"
                  >
                    Register Alumni
                  </NavLink>
                  <NavLink
                    to="/alumni/view"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 transition"
                  >
                    View Alumni
                  </NavLink>
                </div>
              )}
            </>
          )}
        </li>

        <li>
          <NavLink
            to="/trust"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Trust
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Contact us
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <>
      {/* Top Green Bar */}
      <div className="bg-green-600 shadow-sm">
        <div className="w-full px-4 md:px-10 py-2">
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center text-sm text-white">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MdMail className="w-4 h-4" />
                <span>gptck92trust@gmail.com</span>
              </div>
              <div className="w-px h-4 bg-white/40"></div>
              <div className="flex items-center gap-2">
                <MdPhone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaFacebookF className="w-4 h-4 hover:text-gray-200 transition cursor-pointer" />
              <FaInstagram className="w-4 h-4 hover:text-gray-200 transition cursor-pointer" />
              <FaTwitter className="w-4 h-4 hover:text-gray-200 transition cursor-pointer" />
              <FaLinkedinIn className="w-4 h-4 hover:text-gray-200 transition cursor-pointer" />
            </div>
          </div>

          {/* Mobile Layout - Stacked Lines */}
          <div className="md:hidden flex flex-col items-center gap-1.5 text-white text-xs">
            <div className="flex items-center justify-center gap-1.5 w-full">
              <MdMail className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs">gptck92trust@gmail.com</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 w-full">
              <MdPhone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-xs">+91 98765 43210</span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <FaFacebookF className="w-3.5 h-3.5 hover:text-gray-200 transition cursor-pointer" />
              <FaInstagram className="w-3.5 h-3.5 hover:text-gray-200 transition cursor-pointer" />
              <FaTwitter className="w-3.5 h-3.5 hover:text-gray-200 transition cursor-pointer" />
              <FaLinkedinIn className="w-3.5 h-3.5 hover:text-gray-200 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-full py-2.5 px-4 md:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Friends92Logo className="w-9 h-9 text-green-600" />
            <span className="font-bold text-gray-800 text-sm md:text-base">
              GPTCK <span className="text-green-600">92</span> TRUST
            </span>
          </Link>

          {/* Desktop Nav and Donate Button */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <nav className="flex items-center">
              <NavLinks isMobile={false} />
            </nav>
            <NavLink
              to="/donate"
              className="bg-green-600 text-white px-5 py-1.5 rounded-full text-sm hover:bg-green-700 transition flex-shrink-0"
            >
              Donate Now
            </NavLink>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute left-0 w-full px-4 py-3 z-50">
            <NavLinks isMobile={true} />

            <div className="mt-4">
              <NavLink
                to="/donate"
                className="w-full bg-green-600 text-white py-2 rounded-full text-base block text-center hover:bg-green-700 transition"
              >
                Donate Now
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;
