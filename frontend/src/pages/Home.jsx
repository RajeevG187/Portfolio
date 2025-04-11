import React from 'react';
import myImage from '../assets/my_image.png';
import github from '../assets/images/github.png';
import linked_in from '../assets/images/linked_in.png';
import leetcodes from '../assets/images/leetcodes.png';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const [showTyped, setShowTyped] = useState(false);

  useEffect(() => {
    setShowTyped(true);
  }, []);

  return (
    <div className="bg-[#151925] text-white">
      {/* Hero Section */}
      <motion.section
        id="home"
        className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left Content */}
        <div className="flex flex-col items-start text-left space-y-4 max-w-xl z-10">
          <h3 className="text-lg text-[#1DCD9F]">Hey! It's Me</h3>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Rajeev Goel</h1>
          <p className="text-xl text-[#169976] flex items-center">
            I am&nbsp;
            <span className="text-[#1DCD9F] font-bold">
              <Typewriter
                words={["an AI Enthusiast", "a Problem Solver", "a Developer", "a Learner"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={40}
                deleteSpeed={30}
                delaySpeed={1000}
              />
            </span>
          </p>
          {/* Social Icons */}
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-[#1DCD9F] font-semibold">Follow me:</span>
            <a href="https://github.com/RajeevG187" target="_blank" rel="noreferrer"><img src={github} className="h-8 w-8" alt="GitHub" /></a>
            <a href="https://www.linkedin.com/in/rajeevgoel187/" target="_blank" rel="noreferrer"><img src={linked_in} className="h-8 w-8" alt="LinkedIn" /></a>
            <a href="https://leetcode.com/u/rajeevgoel187/" target="_blank" rel="noreferrer"><img src={leetcodes} className="h-8 w-8" alt="Leetcode" /></a>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => window.open("https://drive.google.com/drive/folders/1ZC9KQZ37Py74g1NtC23GwX2zqDHPDuBl?usp=drive_link", "_blank")}
              className="border-2 border-white text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#1DCD9F] transition-colors duration-300"
            >
              My Resume
            </button>
            <button
              onClick={() => window.location.href = "/chat"}
              className="border-2 border-white text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#1DCD9F] transition-colors duration-300"
            >
              Chat
            </button>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            className="absolute z-0 max-w-[90%] md:max-w-[400px]"
            src="data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient id=%22b%22 gradientTransform=%22rotate(-45 .5 .5)%22%3E%3Cstop offset=%220%25%22 stop-color=%22%2300cefc%22%2F%3E%3Cstop offset=%22100%25%22 stop-color=%22%233c1d4b%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M921 673.5q-74 173.5-247.5 191t-347 0Q153 847 86.5 673.5T130 370q110-130 240-234.5t281-21Q802 198 898.5 349T921 673.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22url(%23b)%22 d=%22M921 673.5q-74 173.5-247.5 191t-347 0Q153 847 86.5 673.5T130 370q110-130 240-234.5t281-21Q802 198 898.5 349T921 673.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt="Background Shape"
          />
          <img
            src={myImage}
            alt="Rajeev Goel"
            className="relative md:my-25 z-10 rounded-4xl w-50 h-50 md:w-55 md:h-55 object-cover"
          />
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="min-h-screen px-8 py-16 bg-[#151925] text-white">
  <h2 className="text-5xl font-bold mb-12 text-[#1DCD9F] text-center">About Me</h2>

  {/* Summary */}
  <div className="max-w-5xl mx-auto space-y-10 text-lg leading-relaxed">
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Professional Summary</h3>
      <p>
        I possess strong analytical and problem-solving skills with a solid foundation in data-driven approaches.
        My current role as a <strong>Data Analyst Intern at NoQs Digital</strong> and participation in the <strong>Chanakya Fellowship</strong> have refined my ability to translate data into actionable insights.
        I am proficient in Python, C++, and CUDA, and have experience with <strong>PyTorch</strong> and <strong>TensorFlow</strong> for deep learning applications.
      </p>
    </div>

    {/* Education */}
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Education</h3>
      <ul className="space-y-2">
        <li>
          <strong>IIT Bhilai</strong> — B.Tech in Data Science & Artificial Intelligence (CGPA: 9.12)  
          <span className="block text-sm text-gray-300">2022 - Expected Graduation: 2026</span>
        </li>
        <li>
          <strong>Prayag Public School, Allahabad</strong> — Class XII (CBSE): 95.4%  
          <span className="block text-sm text-gray-300">2020 - 2022</span>
        </li>
        <li>
          <strong>Bishop Johnson School and College</strong> — Class X (ICSE): 93.4%  
          <span className="block text-sm text-gray-300">2018 - 2020</span>
        </li>
      </ul>
    </div>

    {/* Experience */}
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Experience</h3>
      <div className="space-y-4">
        <div>
          <strong>NoQs Digital</strong> — Data Analyst Intern (Star Intern Award)  
          <span className="block text-sm text-gray-300">Dec 2024 – Present</span>
          <ul className="list-disc pl-5">
            <li>Automated data extraction tools using Google Sheets & TensorFlow.</li>
            <li>Built dashboards and collaborated with department heads for analytics.</li>
          </ul>
        </div>
        <div>
          <strong>TIH-IoT IIT Bombay (Chanakya Fellowship)</strong> — Project Intern  
          <span className="block text-sm text-gray-300">July 2024 – Aug 2024</span>
          <ul className="list-disc pl-5">
            <li>Developed VAE + 1D-CNN classifier for tool breakage detection.</li>
            <li>Created a full-stack interface for end-user access.</li>
            <li>Tech stack: PyTorch, MERN, Spark, Google Colab.</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Achievements */}
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Achievements</h3>
      <ul className="list-disc pl-5">
        <li>InterIIT Tech Meet 13.0 — Ranked 11th in problem statement by ISRO among 23 IITs.</li>
        <li>Leetcode — Solved 260+ problems across all categories. <a href="https://leetcode.com/u/rajeevgoel187/" target="_blank" rel="noopener noreferrer" className="underline text-[#1DCD9F]">[My Profile]</a></li>
        <li>Prefinalist in SIH(Smart India Hackathon) 2024</li>
      </ul>
    </div>

    {/* Skills */}
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Skills</h3>
      <p><strong>Languages:</strong> Python, C/C++, JavaScript (MERN), TypeScript, LaTeX</p>
      <p><strong>Frameworks & Tools:</strong> PyTorch, TensorFlow/Keras, Pandas, LangChain, LLMs, BeautifulSoup</p>
      <p><strong>Coursework:</strong> DSA, Algorithms, OR, Data Viz, AI, ML, NLP</p>
      <p><strong>Soft Skills:</strong> Leadership, Communication, Analytical Thinking, Time Management</p>
    </div>

    {/* Certifications */}
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Certifications</h3>
      <ul className="list-disc pl-5">
        <li>Competitive Coding Conclave — IIT Madras, 2023</li>
        <li>Docker & Kubernetes — Scaler, 2024</li>
      </ul>
    </div>

    {/* Positions of Responsibility */}
    <div>
      <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Positions of Responsibility</h3>
      <ul className="list-disc pl-5">
        <li>DSAI Representative — Apr 2024 – Present</li>
        <li>Mentor Coordinator — Apr 2024 – Present</li>
        <li>Executive, Student Alumni Cell — Feb 2024 – Jan 2025</li>
      </ul>
    </div>
  </div>
</section>
{/* Projects Section */}
<section id="projects" className="py-16 px-6 bg-[#151925] text-white">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#1DCD9F]">Projects</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {[
      { title: "Breaking the Silence", desc: "Rape analysis project uncovering patterns and regional trends." },
      { title: "Q-learning Route Optimizer", desc: "Optimized grocery delivery using reinforcement learning." },
      { title: "JEE/NEET Test App", desc: "Developed a practice app for national competitive exams." },
      { title: "Sketch2Image UNet", desc: "Custom UNET architecture for converting sketches to images." },
      { title: "Multimodal Pipeline", desc: "Built a pipeline to translate images into speech using ML." },
    ].map((project, idx) => (
      <div key={idx} className="border border-[#1DCD9F] p-6 rounded-2xl hover:bg-[#1DCD9F] hover:text-black transition duration-300">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p>{project.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* Contact Section */}
<section id="contact" className="py-16 bg-[#151925] text-white">
  <div className="flex flex-col items-center text-center space-y-4">
    <h2 className="text-4xl font-bold text-[#1DCD9F]">Contact Me</h2>
    <p className="text-lg text-gray-300">Phone: <span className="text-[#1DCD9F] font-medium">+91 93073 04394</span></p>
    <p className="text-lg text-gray-300">Email: <span className="text-[#1DCD9F] font-medium">rajeevg@iitbhilai.ac.in</span></p>
  </div>
</section>


    </div>
  );
};

export default Home;
