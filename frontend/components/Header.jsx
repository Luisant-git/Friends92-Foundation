import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, LogIn, LogOut, Menu, X } from "lucide-react";
import { MdMail, MdPhone } from "react-icons/md";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Friends92Logo from "./icons/Logo";
import LoginModal from "./LoginModal";
import AlumniRegister from "../pages/AluminiRegister";
import { loginAdmin } from "../api/login";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isAlumniDropdownOpen, setIsAlumniDropdownOpen] = useState(false);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const projectsDropdownRef = useRef(null);
  const alumniDropdownRef = useRef(null);
  const manageDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync login state with localStorage on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const activeLinkStyle = {
    color: "#16a34a",
    fontWeight: "600",
  };

  useEffect(() => {
    setIsProjectsDropdownOpen(false);
    setIsManageDropdownOpen(false);
    setIsAlumniDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target) &&
        manageDropdownRef.current &&
        !manageDropdownRef.current.contains(event.target) &&
        alumniDropdownRef.current &&
        !alumniDropdownRef.current.contains(event.target)
      ) {
        setIsProjectsDropdownOpen(false);
        setIsManageDropdownOpen(false);
        setIsAlumniDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async (username, password) => {
    try {
      await loginAdmin(username, password);
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoginModalOpen(false);

      // Force a re-render by toggling mobile menu closed
      setIsMobileMenuOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    setIsManageDropdownOpen(false);
    navigate("/");
  };

  const NavLinks = ({ isMobile }) => {
    const navClass = isMobile
      ? "flex flex-col space-y-2"
      : "hidden md:flex items-center gap-2";

    const linkClass =
      "text-gray-600 hover:text-green-600 transition text-base px-2 py-1.5 font-medium";

    return (
      <ul className={navClass}>
        <li>
          <NavLink
            to="/"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            About
          </NavLink>
        </li>

        {/* Alumni Dropdown */}
        <li className="relative" ref={alumniDropdownRef}>
          <button
            onClick={() => {
              setIsAlumniDropdownOpen((prev) => !prev);
              setIsProjectsDropdownOpen(false);
              setIsManageDropdownOpen(false);
            }}
            className={`${linkClass} flex items-center gap-1`}
          >
            <span>Alumni</span>
            <ChevronDown
              className={`w-4 h-4 transition ${
                isAlumniDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isAlumniDropdownOpen && (
            <div
              className={`${
                isMobile ? "relative mt-1" : "absolute left-0 top-full mt-1"
              } bg-white shadow-md rounded-md py-1 w-48 z-20`}
            >
              <button
                onClick={() => setShowModal(true)}
                className="block w-full text-left px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
              >
                Register
              </button>
              <Link
                to="/alumni/view"
                className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
              >
                View
              </Link>
            </div>
          )}
        </li>

        {/* Projects Dropdown */}
        <li className="relative" ref={projectsDropdownRef}>
          <button
            onClick={() => {
              setIsProjectsDropdownOpen((prev) => !prev);
              setIsAlumniDropdownOpen(false);
              setIsManageDropdownOpen(false);
            }}
            className={`${linkClass} flex items-center gap-1`}
          >
            <span>Projects</span>
            <ChevronDown
              className={`w-4 h-4 transition ${
                isProjectsDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProjectsDropdownOpen && (
            <div
              className={`${
                isMobile ? "relative mt-1" : "absolute left-0 top-full mt-1"
              } bg-white shadow-md rounded-md py-1 w-48 z-20`}
            >
              <Link
                to="/projects/live"
                className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
              >
                Live Projects
              </Link>
              <Link
                to="/projects/completed"
                className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
              >
                Completed Projects
              </Link>
            </div>
          )}
        </li>

        <li>
          <NavLink
            to="/placement"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Placement
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/services"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Services
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
            to="/team"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Team
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={linkClass}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            Contact
          </NavLink>
        </li>

        {/* Manage for Admin */}
        {isLoggedIn && (
          <li className="relative" ref={manageDropdownRef}>
            <button
              onClick={() => {
                setIsManageDropdownOpen((prev) => !prev);
                setIsProjectsDropdownOpen(false);
                setIsAlumniDropdownOpen(false);
              }}
              className={`${linkClass} flex items-center gap-1`}
            >
              <span>Manage</span>
              <ChevronDown
                className={`w-4 h-4 transition ${
                  isManageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isManageDropdownOpen && (
              <div
                className={`${
                  isMobile ? "relative mt-1" : "absolute left-0 top-full mt-1"
                } bg-white shadow-md rounded-md py-1 w-48 z-20`}
              >
                <Link
                  to="/admin/banner"
                  className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
                >
                  Banner
                </Link>
                <Link
                  to="/admin/services"
                  className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
                >
                  Services
                </Link>
                <Link
                  to="/admin/gallery"
                  className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
                >
                  Gallery
                </Link>
                <Link
                  to="/admin/placement"
                  className="block px-4 py-2 hover:bg-green-100 text-gray-700 text-sm"
                >
                  Placement
                </Link>
              </div>
            )}
          </li>
        )}
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
                <span>friends92foundation@gmail.com</span>
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
              <span className="text-xs">friends92foundation@gmail.com</span>
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
        <div className="w-full py-2.5 px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Friends92Logo className="w-9 h-9 text-green-600" />
            <span className="font-bold text-gray-800 text-sm md:text-base">
              FRIENDS <span className="text-green-600">92</span> FOUNDATION
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <NavLinks isMobile={false} />
          </nav>

          {/* Desktop Login */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-1"
              >
                <LogIn className="w-4 h-4" /> Login
              </button>
            )}
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
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded-full text-base"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full bg-green-600 text-white py-2 rounded-full text-base"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {showModal && (
        <AlumniRegister
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Header;
