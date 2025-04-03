import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Layout, Globe, Database, Terminal } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Layout,
      skills: ["React.js", "Next.js", "JavaScript/TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Material UI", "Redux", "Responsive Design"]
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: ["Node.js", "Express.js", "REST API", "GraphQL", "MongoDB", "Firebase", "Authentication", "Authorization"]
    },
    {
      title: "Mobile Development",
      icon: Globe,
      skills: ["React Native", "Expo", "Android Studio", "iOS Development", "App Store Deployment"]
    },
    {
      title: "Database",
      icon: Database,
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase Firestore", "Redis"]
    },
    {
      title: "DevOps & Tools",
      icon: Terminal,
      skills: ["Git", "GitHub Actions", "CI/CD", "Docker", "Vercel", "AWS", "Performance Optimization", "Testing"]
    },
  ];

  return (
    <section id="Skills" className="relative py-20 bg-[#030014] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-3/4 h-1/2 bg-indigo-900/5 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-purple-900/10 rounded-full blur-[100px] translate-y-1/4"></div>
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
            Technical Skills
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The technologies, tools, and frameworks I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <category.icon className="w-6 h-6 text-indigo-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;