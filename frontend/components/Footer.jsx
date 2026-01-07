import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Send, Phone, Mail, MapPin, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              <span className="text-xl font-bold text-white-800 tracking-wide">
                GPTCK<span className="text-green-600"> 92 </span> TRUST
              </span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Fostering a community of learners and innovators, dedicated to
              excellence in education and research for a better future.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/live"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Return & Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <address className="not-italic text-slate-300 space-y-3">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 University Drive, Knowledge City, 12345</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:gptck92trust@gmail.com" className="hover:text-sky-400">
                  gptck92trust@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-sky-400">
                  +91 98765 43210
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-300 hover:text-blue-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-300 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-300 hover:text-red-500 transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-300 hover:text-sky-400 transition-colors" aria-label="Telegram">
                <Send className="w-6 h-6" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
                 className="text-slate-300 hover:text-green-500 transition-colors" aria-label="WhatsApp">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm">Registered Nonprofit Organization</span>
            </div>
            <p className="text-center">
              &copy; {new Date().getFullYear()} gptck92trust. All Rights Reserved.
            </p>
            <Link to="/privacy-policy" className="text-sm hover:text-sky-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
