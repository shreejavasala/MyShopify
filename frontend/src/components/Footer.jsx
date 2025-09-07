// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Logo & Company Info */}
        <div className="flex flex-col items-start">
          <Link to="/" className="text-indigo-400 text-2xl font-bold mb-2">
            MyShopify
          </Link>
          <p className="text-gray-400 text-sm">
            Your one-stop online shop for electronics, fashion, home essentials, and more.
          </p>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="hover:text-indigo-400"><FaFacebook /></a>
            <a href="#" className="hover:text-indigo-400"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-400"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-400"><FaLinkedin /></a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-2">Navigation</h3>
          <Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm mb-1">Home</Link>
          <Link to="/items" className="text-gray-400 hover:text-indigo-400 text-sm mb-1">Shop Items</Link>
          <Link>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-gray-400 hover:text-indigo-400 text-sm mb-1">Back to Top</button>
          </Link>
          <Link to="/cart" className="text-gray-400 hover:text-indigo-400 text-sm mb-1">Back to Cart</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-2">Legal</h3>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-indigo-400 text-sm mb-1">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-gray-400 hover:text-indigo-400 text-sm mb-1">Terms of Use</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm mb-1">Email: support@myshopify.com</p>
          <p className="text-gray-400 text-sm mb-1">Phone: +91 12345 67890</p>
          <p className="text-gray-400 text-sm">Address: 123 Main St, City, Country</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-gray-400 text-xs text-center py-2">
        &copy; {new Date().getFullYear()} MyShopify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
