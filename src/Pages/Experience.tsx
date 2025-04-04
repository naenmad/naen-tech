import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, CalendarDays } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "Jakarta, Indonesia",
      period: "Jan 2022 - Present",
      description: "Lead frontend developer for enterprise SaaS platform using React, TypeScript and GraphQL. Implemented CI/CD pipelines that reduced deployment time by 40%. Mentored junior developers and conducted code reviews.",
      achievements: [
        "Reduced application load time by 60% through code optimization",
        "Implemented responsive design patterns that increased mobile usage by 35%",
        "Developed reusable component library that increased development speed"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions",
      location: "Bogor, Indonesia",
      period: "Mar 2020 - Dec 2021",
      description: "Developed and maintained web applications for clients in finance and e-commerce sectors. Created robust RESTful APIs and implemented responsive UIs using React and Node.js.",
      achievements: [
        "Built authentication system with multi-factor authentication",
        "Integrated payment gateways for e-commerce platforms",
        "Implemented real-time notifications using WebSockets"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Solutions",
      location: "Bandung, Indonesia",
      period: "Jun 2018 - Feb 2020",
      description: "Responsible for implementing responsive designs and interactive UI components for client websites. Worked directly with designers to translate mockups into functional interfaces.",
      achievements: [
        "Developed custom React components for company component library",
        "Improved website accessibility to meet WCAG standards",
        "Reduced bug rate by implementing comprehensive testing strategies"
      ]
    }
  ];

  return (
    <section id="Experience" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-purple-500/5 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 inline-block text-transparent bg-clip-text">
            Professional Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My journey through the tech industry and the impactful roles I've held.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/60 to-transparent transform md:-translate-x-px"></div>
          
          {/* Experience items */}
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 md:mb-24 md:w-1/2 ${
                idx % 2 === 0 ? 'md:pr-12 md:self-end md:ml-auto' : 'md:pl-12'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute top-0 left-0 md:left-auto md:right-0 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-y-1/3 md:translate-x-1/2"></div>
              
              <div className="ml-8 md:ml-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <Briefcase className="w-5 h-5 text-indigo-400 mr-2" />
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                </div>
                
                <div className="text-indigo-300 font-medium mb-2">{exp.company}</div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                    {exp.location}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1 text-gray-500" />
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{exp.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">Key Achievements:</p>
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-2"></div>
                      <p className="text-sm text-gray-400">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;