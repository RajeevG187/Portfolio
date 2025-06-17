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
                        I am a highly motivated and enthusiastic data science and AI practitioner, with a deep interest in solving real-world problems using cutting-edge technology. I am currently pursuing a B.Tech in Data Science & Artificial Intelligence at IIT Bhilai, with a CGPA of 9.24.
                        In my current role as a <strong>Gen AI Intern</strong> at <strong>Assurant</strong>, which is MNC famous for its insurance and risk management services, I have been working on developing AI-driven solutions including chatbots and report generators, for automation of report-making processes and enhancing customer support systems. 
                        I have also been selected for C4GT for making contribution to issue in AI-Assisted-Mental-Health-Screening by RCTS-IIITH.
                        Additionally, my participation in the <strong>Chanakya Fellowship</strong> has further enhanced my skills PyTorch and my knowledge in the field of Deep Learning Hybrid Models.
                        I have recieved A grade in: Algorithms, Data Analytics and Viz., Big Data, Artificial Intelligence, Machine Learning, Computer Networks(TCP/IP), Information Security, Natural Language Processing, Network Science.
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
                            <p>B.Tech in Data Science & Artificial Intelligence (CGPA: 9.24)</p>
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
