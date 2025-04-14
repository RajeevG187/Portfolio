import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <nav className="w-full bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Header */}
        <a href="/">
          <h1 className="text-3xl font-bold text-emerald-500">My Portfolio</h1>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-xl font-semibold">
          <li><a href="/" className="cursor-pointer hover:text-gray-400">Home</a></li>
          {!isChatPage && (
            <>
              <li><ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">About</ScrollLink></li>
              <li><ScrollLink to="experience" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">Experience</ScrollLink></li>
              <li><ScrollLink to="projects" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">Projects</ScrollLink></li>
              <li><ScrollLink to="extra" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">Extras</ScrollLink></li>
            </>
          )}
          <li><a href="/chat" className="cursor-pointer hover:text-emerald-500">Chat</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden ml-4" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-800 text-white space-y-4 p-4">
          <li><a href="/" className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Home</a></li>
          {!isChatPage && (
            <>
              <li><ScrollLink to="about" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>About</ScrollLink></li>
              <li><ScrollLink to="experience" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Experience</ScrollLink></li>
              <li><ScrollLink to="projects" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Projects</ScrollLink></li>
              <li><ScrollLink to="extra" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Extras</ScrollLink></li>
            </>
          )}
          <li><a href="/chat" className="block cursor-pointer text-emerald-500" onClick={() => setMenuOpen(false)}>Chat</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
