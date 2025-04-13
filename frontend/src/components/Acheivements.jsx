import React from 'react';
import isro from '../assets/images/isro.png';
import leetcode from '../assets/images/leetcode.png';
import sih from '../assets/images/sih.png';
import coding from '../assets/images/coding_cert.png';
import scalar from '../assets/images/scalar.png';
import { Code, Brain, Globe, Settings, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const Acheivements = () => {
    const [showAll, setShowAll] = useState(false);

    const skills = {
        Languages: ["Python", "C/C++", "JavaScript (MERN)", "LaTeX"],
        "ML & DL": ["PyTorch", "TensorFlow/Keras", "Scikit-learn", "Transformers", "LangChain", "GANS", "LLMs", "RAG"],
        "Web Development": ["React", "Node.js", "Express", "MongoDB", "FastAPI"],
        "Tools & Platforms": ["Git/GitHub", "Docker","PowerBI",  "Google Colab", "Linux", "VS Code", "LangSmith"],
        "Coursework": ["Data Structures", "Algorithms", "AI", "ML", "NLP"],
        "Soft Skills": ["Leadership", "Communication", "Analytical Thinking", "Time Management", "Teamwork"]
    };

    const icons = {
        Languages: <Code />,
        "ML & DL": <Brain />,
        "Web Development": <Globe />,
        "Tools & Platforms": <Settings />,
        Coursework: <Code />,
        "Soft Skills": <Users />
    };

    const certifications = [
        {
            title: "Competitive Coding Conclave — IIT Madras, 2023",
            image: coding,
            link: "https://drive.google.com/file/d/1i4kIjD2VTKJhepoN00dCgu0lh1uAZfxF/view"
        },
        {
            title: "Docker & Kubernetes — Scaler, 2024",
            image: scalar,
            link: "https://drive.google.com/file/d/1xwP5NT8AfKPskhpbr1eRQWIN6NEPU1HX/view"
        }
    ];

    const roles = [
        {
            title: "DSAI Representative",
            duration: "Apr 2024 – Apr 2025",
            description: "Representing the Data Science & AI department, coordinating events, and acting as a student liaison."
        },
        {
            title: "Mentor Coordinator",
            duration: "Apr 2024 – Apr 2025",
            description: "Organizing and overseeing mentor-mentee activities to support academic and personal growth of juniors."
        },
        {
            title: "Executive, Student Alumni Cell",
            duration: "Feb 2024 – Jan 2025",
            description: "Helping bridge students and alumni by coordinating meets, emails, and building long-term connections."
        }
    ];

    const [[index, direction], setIndex] = useState([0, 0]);

    const paginate = (newDirection) => {
        const newIndex =
            (index + newDirection + roles.length) % roles.length;
        setIndex([newIndex, newDirection]);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0
        })
    };

    return (
        <section id="extra" className="min-h-screen px-8 py-16 bg-[#151925] text-white">

            <div className="max-w-5xl mx-auto space-y-12 text-lg leading-relaxed">
                {/* Achievements */}
                <div>
                    <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Achievement 1 */}
                        <div className="bg-[#1E1E2F] p-6 rounded-lg shadow-md flex flex-col items-center">
                            <img src={isro} alt="InterIIT Tech Meet" className="w-32 h-32 object-cover mb-4 rounded-full" />
                            <h4 className="text-xl font-semibold text-[#1DCD9F] mb-2">InterIIT Tech Meet 13.0</h4>
                            <p className="text-white text-center">Ranked 11th in problem statement by ISRO among 23 IITs.</p>
                        </div>

                        {/* Achievement 2 */}
                        <div className="bg-[#1E1E2F] p-6 rounded-lg shadow-md flex flex-col items-center">
                            <img src={leetcode} alt="Leetcode" className="w-32 h-32 object-cover mb-4 rounded-full" />
                            <h4 className="text-xl font-semibold text-[#1DCD9F] mb-2">Leetcode</h4>
                            <p className="text-white text-center">Solved 260+ problems across all categories. <a href="https://leetcode.com/u/rajeevgoel187/" target="_blank" rel="noopener noreferrer" className="underline text-[#1DCD9F]">[My Profile]</a></p>
                        </div>

                        {/* Achievement 3 */}
                        <div className="bg-[#1E1E2F] p-6 rounded-lg shadow-md flex flex-col items-center">
                            <img src={sih} alt="Smart India Hackathon" className="w-32 h-32 object-cover mb-4 rounded-full" />
                            <h4 className="text-xl font-semibold text-[#1DCD9F] mb-2">Smart India Hackathon (SIH) 2024</h4>
                            <p className="text-white text-center">Prefinalist in SIH 2024.</p>
                        </div>
                    </div>
                </div>


                {/* Skills */}
                <div>
                    <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-8">Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
                        {Object.entries(skills).map(([category, items], idx) => (
                            <div key={idx} className="bg-[#1E1E2F] p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-3 mb-3 text-[#1DCD9F]">
                                    {icons[category]}
                                    <h4 className="text-xl font-semibold">{category}</h4>
                                </div>
                                <ul className="list-disc list-inside space-y-1">
                                    {(showAll ? items : items.slice(0, 3)).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            className="text-[#1DCD9F] hover:underline"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Show Less ▲" : "See More ▼"}
                        </button>
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-8">Certifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {certifications.map((cert, idx) => (
                            <a
                                key={idx}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#1E1E2F] rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
                            >
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 text-white">
                                    <h4 className="text-lg font-semibold text-[#1DCD9F] hover:underline">
                                        {cert.title}
                                    </h4>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Positions of Responsibility */}
                <div className="relative max-w-xl mx-auto py-10">
                    <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-8 text-center">
                        Positions of Responsibility
                    </h3>

                    <div className="relative overflow-hidden rounded-2xl shadow-md bg-[#1e2333] p-6">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                            >
                                <h4 className="text-xl font-bold text-white">{roles[index].title}</h4>
                                <p className="text-sm text-gray-400 mb-2">{roles[index].duration}</p>
                                <p className="text-base text-gray-200">{roles[index].description}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-between mt-6 px-4">
                        <button onClick={() => paginate(-1)} className="hover:text-[#1DCD9F] transition-all">
                            <ChevronLeft size={28} />
                        </button>
                        <button onClick={() => paginate(1)} className="hover:text-[#1DCD9F] transition-all">
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Acheivements