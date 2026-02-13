import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Send, Phone, Mail, MapPin, Shield } from "lucide-react";
import { DonateButton, VolunteerButton } from "./common/CTAButtons";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* CTA Section at top of footer */}
      <div className="bg-primary/90 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 font-heading">Ready to Make an Impact?</h3>
              <p className="text-slate-300 font-body">Join us in creating positive change in our communities</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <DonateButton size="md" />
              <VolunteerButton size="md" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary-400 mb-4 font-heading">
              <span className="text-xl font-bold text-white-800 tracking-wide">
                GPTCK<span className="text-secondary"> 92 </span> TRUST
              </span>
            </h3>
            <p className="text-white/80 leading-relaxed font-body">
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
                  className="text-slate-300 hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-300 hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/live"
                  className="text-slate-300 hover:text-secondary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-300 hover:text-secondary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-300 hover:text-secondary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-300 hover:text-secondary transition-colors"
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
            <address className="not-italic text-white/80 space-y-3">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 University Drive, Knowledge City, 12345</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:gptck92trust@gmail.com" className="hover:text-secondary">
                  gptck92trust@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-secondary">
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
                 className="text-white/80 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white/80 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white/80 hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" 
                 className="text-white/80 hover:text-secondary transition-colors" aria-label="Telegram">
                <Send className="w-6 h-6" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" 
                 className="text-white/80 hover:text-secondary transition-colors" aria-label="WhatsApp">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-sm">Registered Nonprofit Organization</span>
            </div>
            <p className="text-center font-body">
              &copy; {new Date().getFullYear()} gptck92trust. All Rights Reserved.
            </p>
            <Link to="/privacy-policy" className="text-sm hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






