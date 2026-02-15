'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "AI/ML Intern",
    company: "ACPL Pvt. Ltd.",
    period: "Jan 2026 - Present",
    description: "Developing AI/ML solutions focused on document processing automation and intelligent chatbot systems for internal operations.",
    achievements: [
      "Built and managed labeled datasets using LabelImg, improving model training accuracy for production deployment.",
      "Trained custom YOLO object detection models on domain-specific datasets to automate POD (Proof of Delivery) document processing.",
      "Developed an internal Ask HR chatbot leveraging Hugging Face models and LangChain framework for context-aware employee assistance.",
      "Implemented secure MySQL database access with role-based permissions, ensuring data privacy and compliance for employee information queries."
    ]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 bg-slate-50 dark:bg-black/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-sm tracking-widest uppercase text-slate-400 dark:text-gray-500 mb-2 block">Career</span>
          <h2 className="text-4xl md:text-6xl font-bold leading-none tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>Experience</h2>
        </motion.div>

        <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 md:ml-6 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-16"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-black" />

              <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-bold mb-1">{exp.company}</h3>
                  <p className="font-mono text-sm text-slate-500 dark:text-gray-400 mb-4">{exp.period}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 w-fit">
                    <Briefcase className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium">{exp.role}</span>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <p className="text-lg text-slate-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-3">
                    {exp.achievements.map((item, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="flex items-start gap-3 text-slate-600 dark:text-gray-400"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
