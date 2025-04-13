import React from 'react'
import noqs from '../assets/images/noqs.png'
import tih from '../assets/images/tih.png'
import model from '../assets/images/cropped.PNG'

const ExperienceSection = () => {
    return (
        <section id="experience" className="py-16 px-8 bg-[#151925] text-white">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#1DCD9F]">Experience</h2>
  <div className="max-w-6xl mx-auto space-y-12">

    {/* Experience Card 2 */}
<div className="flex flex-col md:flex-row gap-8 border border-[#1DCD9F] p-6 rounded-2xl items-center">
  {/* Text Content */}
  <div className="flex-1">
    <h3 className="text-2xl font-bold text-[#1DCD9F] mb-2">TIH-IoT, IIT Bombay</h3>
    <p className="text-gray-300 mb-1">
      Project Intern <span className="text-sm text-[#1DCD9F]">(Chanakya Fellowship)</span>
    </p>
    <p className="text-sm text-gray-400 mb-4">Dec 2024 – Present</p>
    <ul className="list-disc pl-5 space-y-2 text-gray-200">
      <li>
        Designed a VAE + 1D-CNN classification model{" "}
        <span className="text-sm text-[#1DCD9F]">
          <a href={model} target="_blank" rel="noopener noreferrer">(Architecture)</a>
        </span>{" "}
        for tool condition monitoring
      </li>
      <li>Worked with PyTorch and communication protocols like MQTT</li>
    </ul>
  </div>

  {/* Image */}
  <div className="w-full md:w-1/3 flex-shrink-0">
    <div className="relative w-full aspect-video">
      <img
        src={tih}
        alt="TIH IoT Project"
        className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
      />
    </div>
  </div>
</div>

{/* Experience Card 1 */}
<div className="flex flex-col md:flex-row gap-8 border border-[#1DCD9F] p-6 rounded-2xl items-center">
  {/* Text Content */}
  <div className="flex-1">
    <h3 className="text-2xl font-bold text-[#1DCD9F] mb-2">NoQs Digital</h3>
    <p className="text-gray-300 mb-1">
      Data Analyst Intern{" "}
      <span className="text-sm text-[#1DCD9F]">
        <a href="https://drive.google.com/file/d/1AWiBOUUN-NarYamaGn-LQZHlys-pVqcX/view" target="_blank" rel="noopener noreferrer">
          (Star Intern Award)
        </a>
      </span>
    </p>
    <p className="text-sm text-gray-400 mb-4">July 2024 – Aug 2024</p>
    <ul className="list-disc pl-5 space-y-2 text-gray-200">
      <li>Automated data extraction tools using Google Sheets</li>
      <li>Built interactive dashboards using PowerBI and collaborated with department heads</li>
      <li>Leveraged Python, Google Apps Script</li>
    </ul>
  </div>

  {/* Image */}
  <div className="w-full md:w-1/3 flex-shrink-0">
    <div className="relative w-full aspect-video">
      <img
        src={noqs}
        alt="NoQs Digital Internship"
        className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
      />
    </div>
  </div>
</div>

  </div>
</section>

    )
}

export default ExperienceSection