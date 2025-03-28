import React from 'react';
import myImage from '../assets/my_image.png';
import quote from '../assets/quote.png';
import unquote from '../assets/unquote.png';

const Home = () => {
  return (
    <div className="bg-primary1 py-20">
      {/* About Section */}
      <section id="home" className="h-screen flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Welcome to my page</h2>
      </section>

      <section id="about" className="h-screen flex justify-center bg-primary1">
        <div className="relative flex flex-col items-center">

          {/* Gradient Box */}
          <div className="relative w-[160vh] h-[60vh] p-10 my-20 bg-gradient-to-br from-yellow-400 to-white rounded-2xl shadow-lg flex items-center justify-end">

            {/* Circular Image Overlapping */}
            <div className="absolute -left-40 top-1/3 transform -translate-y-1/2 w-[50vh] h-[50vh] rounded-full overflow-hidden bg-primary1 shadow-lg">
              <img src={myImage} alt="Profile" className="w-full h-full object-cover mt-5" />
            </div>

            <div className="max-w-2xl mx-auto text-end">
              {/* Title */}
              <h2 className="text-7xl font-extrabold text-gray-900 mb-10 tracking-wide font-serif">
                About Me
              </h2>

              {/* Quote, Message, and Unquote */}
              <div className="flex items-center justify-start space-x-4 w-[120vh] text-center">
                {/* Opening Quote */}
                <div className="flex items-start h-[30vh] w-[10vh]">
                  <img src={quote} alt="Opening Quote" className="w-30 h-30" />
                </div>

                {/* Message */}
                <p className="text-3xl text-gray-700 font-light leading-relaxed italic max-w-4xl">
                  I have strong analytical and problem-solving skills. My academic and professional experiences, including a
                  Data Analyst internship at NoQs Digital, have equipped me to deliver actionable insights through
                  data-driven approaches. I am proficient in Python, C++, and Cuda, with expertise in frameworks like
                  PyTorch and TensorFlow for Deep Learning based tasks.
                </p>

                {/* Closing Quote */}
                <div className="flex items-end h-[30vh] w-[10vh]">
                  <img src={unquote} alt="Closing Quote" className="w-30 h-30" />
                </div>
              </div>
            </div>



          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Projects</h2>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Contact</h2>
      </section>
    </div>
  );
};

export default Home;
