import React from 'react'

const ProjectsSection = () => {
    return (
        <section id="projects" className="py-16 px-6 bg-[#151925] text-white">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#1DCD9F]">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {[
                    {
                        title: "Sketch2Image UNet",
                        desc: "Custom UNET architecture for converting sketches to images.",
                        github: "https://github.com/VDNT11NULL/S2I"
                    },
                    {
                        title: "Automatic-Image-Captioning-and-Speech-Synthesis-for-Blind-People",
                        desc: "Built a pipeline to translate images into speech using ML.",
                        github: "https://github.com/RajeevG187/Automatic-Image-Captioning-and-Speech-Synthesis-for-Blind-People"
                    },
                    {
                        title: "EXAM BOOSTER - JEE/NEET Test App",
                        desc: "Developed a practice app for national competitive exams.",
                        github: "https://github.com/EXAM-BOOSTER"
                    },
                    {
                        title: "Breaking the Silence",
                        desc: "Rape analysis project uncovering patterns and regional trends.",
                        github: "https://github.com/RajeevG187/Breaking-The-Scilence"
                    },
                    {
                        title: "Q-learning Route Optimizer",
                        desc: "Optimized grocery delivery using reinforcement learning.",
                        github: "https://github.com/RajeevG187/Grocery-Delivery-Route-Optimizer-Using-Q-Learning"
                    },
                ].map((project, idx) => (
                    <div key={idx} className="group border border-[#1DCD9F] p-6 rounded-2xl hover:bg-[#1DCD9F] hover:text-black transition duration-300 flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="flex-grow">{project.desc}</p>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center text-[#1DCD9F] group-hover:text-black transition-colors"
                        >
                            View on GitHub
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProjectsSection