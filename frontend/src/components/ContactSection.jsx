import React from 'react'

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-[#151925] text-white">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-4xl font-bold text-[#1DCD9F]">Contact Me</h2>
          <p className="text-lg text-gray-300">Phone: <span className="text-[#1DCD9F] font-medium">+91 93073 04394</span></p>
          <p className="text-lg text-gray-300">Email: <span className="text-[#1DCD9F] font-medium">rajeevg@iitbhilai.ac.in</span></p>
        </div>
      </section>
  )
}

export default ContactSection