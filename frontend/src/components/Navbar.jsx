import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto flex items-center justify-between">
    {/* Logo/Header */}
    <h1 className="text-3xl font-bold">My Portfolio</h1>

    {/* Desktop Navigation */}
    <ul className="hidden md:flex space-x-8 text-xl font-semibold">
      <li><a href="/" className="cursor-pointer hover:text-gray-400">Home</a></li>
      <li><ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">About</ScrollLink></li>
      <li><ScrollLink to="projects" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">Projects</ScrollLink></li>
      <li><ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-gray-400">Contact</ScrollLink></li>
      <li><a href="/chat" className="cursor-pointer hover:text-gray-400">Chat</a></li>
    </ul>

    {/* Mobile Menu Button */}
    <button className="md:hidden ml-4" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-800 text-white space-y-4 p-4">
          <li><ScrollLink to="home" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Home</ScrollLink></li>
          <li><ScrollLink to="about" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>About</ScrollLink></li>
          <li><ScrollLink to="projects" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Projects</ScrollLink></li>
          <li><ScrollLink to="contact" smooth={true} duration={500} className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Contact</ScrollLink></li>
          <li><a href="/chat" className="block cursor-pointer" onClick={() => setMenuOpen(false)}>Chat</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
