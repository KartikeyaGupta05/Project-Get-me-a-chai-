// components/Footer.js
import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-800 via-black to-gray-700 text-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
        {/* Brand and Social Media Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-3">Get me a Chai</h2>
          <p className="mb-4">Connecting creators with supporters, one chai at a time.</p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaInstagram size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaLinkedin size={30} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaGithub size={30} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-3">Subscribe to our Newsletter</h3>
          <p className="mb-3 text-center md:text-left">Stay updated with the latest news and features!</p>
          <form className="flex w-full max-w-sm space-x-3">
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md text-gray-700 focus:outline-none"
              placeholder="Your Email"
            />
            <button className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Area */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-sm">
         Copyright &copy; {currentYear} Get me a Chai. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
