import React from 'react';
import myImage from '../assets/my_image.png';
import github from '../assets/images/github.png';
import linked_in from '../assets/images/linked_in.png';
import leetcodes from '../assets/images/leetcodes.png';
import { motion } from 'framer-motion';
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
    return (
        <motion.section
            id="home"
            className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center px-6 py-10 md:py-0 bg-[#151925]overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Left Content */}
            <div className="flex flex-col items-start text-left space-y-4 max-w-xl z-10 md:pr-10">
                <h3 className="text-lg text-[#1DCD9F]">Hey! It's Me</h3>
                <h1 className="text-4xl sm:text-5xl font-bold text-white">Rajeev Goel</h1>
                <p className="text-xl text-[#169976] flex items-center">
                    I am&nbsp;
                    <span className="text-[#1DCD9F] font-bold">
                        <Typewriter
                            words={["an AI Enthusiast", "a Problem Solver", "a Developer", "a Learner"]}
                            loop
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
                    <a href="https://github.com/RajeevG187" target="_blank" rel="noreferrer">
                        <img src={github} className="h-7 w-7 md:h-8 md:w-8" alt="GitHub" />
                    </a>
                    <a href="https://www.linkedin.com/in/rajeevgoel187/" target="_blank" rel="noreferrer">
                        <img src={linked_in} className="h-7 w-7 md:h-8 md:w-8" alt="LinkedIn" />
                    </a>
                    <a href="https://leetcode.com/u/rajeevgoel187/" target="_blank" rel="noreferrer">
                        <img src={leetcodes} className="h-7 w-7 md:h-8 md:w-8" alt="Leetcode" />
                    </a>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        onClick={() => window.open("https://drive.google.com/drive/folders/1ZC9KQZ37Py74g1NtC23GwX2zqDHPDuBl?usp=drive_link", "_blank")}
                        className="cursor-pointer border-2 border-white text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#1DCD9F] transition-colors duration-300"
                    >
                        My Resume
                    </button>
                    <button
                        onClick={() => window.location.href = "/chat"}
                        className="cursor-pointer border-2 border-white text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#1DCD9F] transition-colors duration-300"
                    >
                        Chat
                    </button>
                </div>
            </div>

            {/* Right Content (Image) */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
                {/* Background Blob */}
                <img
                    className="absolute z-0 w-[280px] md:w-[400px] lg:w-[450px]"
                    src="data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3ClinearGradient id=%22b%22 gradientTransform=%22rotate(-45 .5 .5)%22%3E%3Cstop offset=%220%25%22 stop-color=%22%2300cefc%22%2F%3E%3Cstop offset=%22100%25%22 stop-color=%22%233c1d4b%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M921 673.5q-74 173.5-247.5 191t-347 0Q153 847 86.5 673.5T130 370q110-130 240-234.5t281-21Q802 198 898.5 349T921 673.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22url(%23b)%22 d=%22M921 673.5q-74 173.5-247.5 191t-347 0Q153 847 86.5 673.5T130 370q110-130 240-234.5t281-21Q802 198 898.5 349T921 673.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                    alt="Background Shape"
                />

                {/* Main Image */}
                <img
                    src={myImage}
                    alt="Rajeev Goel"
                    className="relative z-10 w-45 h-45 md:w-72 md:h-72 rounded-3xl object-cover"
                />
            </div>
        </motion.section>
    );
};

export default HeroSection;
