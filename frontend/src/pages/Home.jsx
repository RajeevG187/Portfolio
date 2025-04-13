import React from 'react';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import HeroSection from '../components/HeroSection';
import Acheivements from '../components/Acheivements';
import ScrollSpySidebar from '../components/ScrollSpy';

const Home = () => {
  return (
    <div className="bg-[#151925] text-white">
      {/* Hero Section */}
      <HeroSection/>

      {/* About Section */}
      <AboutSection/>

      {/* Experience Section */}
      <ExperienceSection/>

      {/* Projects Section */}
      <ProjectsSection/>

      {/* Acheivements Section */}
      <Acheivements/>

      {/* Contact Section */}
      <ContactSection/>
    </div>
  );
};

export default Home;
