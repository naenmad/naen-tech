import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

const Education = () => {
  const educations = [
    {
      degree: "Science",
      institution: "SMA Negeri 10 Bogor",
      location: "Bogor, Indonesia",
      period: "2020 - 2023",
      description: "Learning about Science. Graduated with honors.",
      highlights: [
        "GPA: 91/100",
      ]
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Singaperbangsa Karawang",
      location: "Karawang, Indonesia",
      period: "2023 - Now",
      description: "Focused on software engineering and web development.",
      highlights: [
        "GPA: 3.8/4.0",
        "Active member of campus programming club"
      ]
    },
  ];

  return (
    <section id="Education" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-indigo-900/10 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-1/3 bg-purple-900/5 rounded-full blur-[100px] translate-y-1/4"></div>
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
            Education
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic background and learning journey.
          </p>
        </motion.div>

        {/* Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educations.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <GraduationCap className="w-6 h-6 text-indigo-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
              </div>
              
              <div className="text-indigo-300 font-medium mb-2">{edu.institution}</div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  {edu.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  {edu.period}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{edu.description}</p>
              
              <div className="space-y-2">
                {edu.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-2"></div>
                    <p className="text-sm text-gray-400">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;