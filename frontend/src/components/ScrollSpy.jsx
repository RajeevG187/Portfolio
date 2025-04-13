import { useEffect, useState } from 'react';

const sections = ['home', 'about', 'experience', 'projects', 'extra'];

export default function ScrollSpySidebar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      const current = sections.find((id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-20 left-4 flex flex-col space-y-4 text-sm z-50">
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          className={`transition-colors duration-200 ${
            activeSection === section ? 'text-[#1DCD9F] font-semibold' : 'text-gray-400'
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </a>
      ))}
    </nav>
  );
}
