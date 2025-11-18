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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const projectsDropdownRef = useRef(null);
  const alumniDropdownRef = useRef(null);
  const manageDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const activeLinkStyle = {
    color: "#16a34a",
    fontWeight: "600",
  };

  /* Close menus when route changes */
  useEffect(() => {
    setIsProjectsDropdownOpen(false);
    setIsManageDropdownOpen(false);
    setIsAlumniDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  /* Close dropdown when clicking outside */
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
      const data = await loginAdmin(username, password);
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoginModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  /* NAV LINKS COMPONENT */
  const NavLinks = ({ isMobile }) => {
    const navClass = isMobile
      ? "flex flex-col space-y-4"
      : "hidden md:flex items-center space-x-8";

    const linkClass =
      "text-gray-600 hover:text-green-600 transition-colors duration-300 text-lg";

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
            className={`${linkClass} flex items-center space-x-1`}
          >
            <span>Alumni</span>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isAlumniDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isAlumniDropdownOpen && (
            <div
              className={`${
                isMobile ? "relative mt-2" : "absolute top-full left-0 mt-2"
              } bg-white shadow-lg rounded-md py-2 w-48 z-20`}
            >
              <button
                onClick={() => setShowModal(true)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100"
              >
                Register
              </button>
              <Link
                to="/alumni/view"
                className="block px-4 py-2 text-gray-700 hover:bg-green-100"
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
            className={`${linkClass} flex items-center space-x-1`}
          >
            <span>Projects</span>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isProjectsDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProjectsDropdownOpen && (
            <div
              className={`${
                isMobile ? "relative mt-2" : "absolute top-full left-0 mt-2"
              } bg-white shadow-lg rounded-md py-2 w-48 z-20`}
            >
              <Link
                to="/projects/live"
                className="block px-4 py-2 text-gray-700 hover:bg-green-100"
              >
                Live Projects
              </Link>
              <Link
                to="/projects/completed"
                className="block px-4 py-2 text-gray-700 hover:bg-green-100"
              >
                Completed Projects
              </Link>
            </div>
          )}
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

        {/* Manage Dropdown */}
        {isLoggedIn && (
          <li className="relative" ref={manageDropdownRef}>
            <button
              onClick={() => {
                setIsManageDropdownOpen((prev) => !prev);
                setIsProjectsDropdownOpen(false);
                setIsAlumniDropdownOpen(false);
              }}
              className={`${linkClass} flex items-center space-x-1`}
            >
              <span>Manage</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isManageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isManageDropdownOpen && (
              <div
                className={`${
                  isMobile ? "relative mt-2" : "absolute top-full left-0 mt-2"
                } bg-white shadow-lg rounded-md py-2 w-48 z-20`}
              >
                <Link
                  to="/admin/banner"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                >
                  Banner
                </Link>
                <Link
                  to="/admin/services"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                >
                  Services
                </Link>
                <Link
                  to="/admin/gallery"
                  className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                >
                  Gallery
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
      {/* ---------------------- PREMIUM GREEN TOP BAR ---------------------- */}
      <div className="bg-green-600 shadow-sm">
        <div className="w-full px-4 md:px-10 py-2">
          {/* Desktop */}
          <div className="hidden md:flex justify-between items-center text-sm text-white">
            {/* Email + Phone */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MdMail className="w-4 h-4 text-white" />
                <span>friends92foundation@gmail.com</span>
              </div>

              <div className="w-px h-4 bg-white/40"></div>

              <div className="flex items-center gap-2">
                <MdPhone className="w-4 h-4 text-white" />
                <span>+91 98765 43210</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <FaFacebookF className="w-4 h-4 text-white hover:text-gray-200" />
              <FaInstagram className="w-4 h-4 text-white hover:text-gray-200" />
              <FaTwitter className="w-4 h-4 text-white hover:text-gray-200" />
              <FaLinkedinIn className="w-4 h-4 text-white hover:text-gray-200" />
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col items-center text-white space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <MdMail className="w-4 h-4 text-white" />
              <span className="text-sm">friends92foundation@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <MdPhone className="w-4 h-4 text-white" />
              <span className="text-sm">+91 98765 43210</span>
            </div>

            <div className="flex justify-center gap-5">
              <FaFacebookF className="w-4 h-4 text-white hover:text-gray-200" />
              <FaInstagram className="w-4 h-4 text-white hover:text-gray-200" />
              <FaTwitter className="w-4 h-4 text-white hover:text-gray-200" />
              <FaLinkedinIn className="w-4 h-4 text-white hover:text-gray-200" />
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------ */}

      {/* MAIN NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="w-full py-3">
          <div className="flex items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2"
            >
              <Friends92Logo className="w-10 h-10 text-green-600" />
              <span
                className="font-bold text-gray-800 tracking-wide
                  text-base md:text-xl"
              >
                FRIENDS<span className="text-green-600"> 92 </span> FOUNDATION
              </span>
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLinks isMobile={false} />
            </nav>

            {/* Desktop Login */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 shadow-sm flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-green-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-300 shadow-sm flex items-center gap-1"
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div
            className="
    md:hidden 
    bg-white 
    shadow-lg 
    absolute 
    top-full 
    left-0 
    w-full 
    px-8 
    pt-4 
    pb-8
    max-h-[85vh] 
    overflow-y-auto
    z-50
  "
          >
            <NavLinks isMobile={true} />

            <div className="mt-6">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block text-center w-full bg-red-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="block text-center w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 shadow-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      {/* Login Modal */}
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
