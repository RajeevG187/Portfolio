import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaGraduationCap } from 'react-icons/fa';
import { Code, Brain, Globe, Settings, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const AboutSection = () => {
    return (
        <section id="about" className="min-h-screen px-8 py-16 bg-[#151925] text-white">
            <h2 className="text-5xl font-bold mb-12 text-[#1DCD9F] text-center">About Me</h2>

            <div className="max-w-5xl mx-auto space-y-12 text-lg leading-relaxed">
                {/* Summary */}
                <div>
                    <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-4">Professional Summary</h3>
                    <p>
                        I am a highly motivated and enthusiastic data science and AI practitioner, with a deep interest in solving real-world problems using cutting-edge technology. I am currently pursuing a B.Tech in Data Science & Artificial Intelligence at IIT Bhilai, with a CGPA of 9.12.
                        In my current role as a <strong>Data Analyst Intern at NoQs Digital</strong>, I have honed my analytical and problem-solving skills, leveraging data to provide actionable insights that help drive business decisions.
                        Additionally, my participation in the <strong>Chanakya Fellowship</strong> has further enhanced my skills in leadership and critical thinking.
                        I am proficient in Python, C++, TypeScript, and JavaScript (MERN), with experience in popular frameworks such as <strong>PyTorch</strong>, <strong>TensorFlow</strong>, <strong>LangChain</strong>, and more.
                    </p>
                </div>

                {/* Education Timeline */}
                <div>
                    <h3 className="text-3xl font-semibold text-[#1DCD9F] mb-8 text-center">Education</h3>
                    <VerticalTimeline lineColor="#1DCD9F">
                        <VerticalTimelineElement
                            className="vertical-timeline-element--education"
                            contentStyle={{ background: '#209f7d', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid #209f7d' }}
                            date="2022 - 2026"
                            iconStyle={{ background: '#1DCD9F', color: '#fff' }}
                            icon={<FaGraduationCap />}
                        >
                            <h4 className="vertical-timeline-element-title font-bold">IIT Bhilai</h4>
                            <p>B.Tech in Data Science & Artificial Intelligence (CGPA: 9.12)</p>
                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--education"
                            contentStyle={{ background: '#209f7d', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid #209f7d' }}
                            date="2020 - 2022"
                            iconStyle={{ background: '#1DCD9F', color: '#fff' }}
                            icon={<FaGraduationCap />}
                        >
                            <h4 className="vertical-timeline-element-title font-bold">Prayag Public School, Allahabad</h4>
                            <p>Class XII (CBSE): 95.4%</p>
                        </VerticalTimelineElement>

                        <VerticalTimelineElement
                            className="vertical-timeline-element--education"
                            contentStyle={{ background: '#209f7d', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid #209f7d' }}
                            date="2018 - 2020"
                            iconStyle={{ background: '#1DCD9F', color: '#fff' }}
                            icon={<FaGraduationCap />}
                        >
                            <h4 className="vertical-timeline-element-title font-bold">Bishop Johnson School and College</h4>
                            <p>Class X (ICSE): 93.4%</p>
                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
