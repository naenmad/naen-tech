import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User, Briefcase, Mail, ArrowRight, Loader } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Tipe Props untuk Komponen
interface TypewriterEffectProps {
  text: string;
}

interface IconButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

interface LoadingProgressProps {
  progress: number;
}

interface WelcomeScreenProps {
  onLoadingComplete?: () => void;
  setShowWelcome?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Komponen TypewriterEffect
const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Komponen BackgroundEffect
const BackgroundEffect: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
    <div className="absolute top-0 left-0 w-full h-full">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            opacity: Math.random(),
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

// Komponen IconButton
const IconButton: React.FC<IconButtonProps> = ({ Icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group hover:scale-110 transition-transform duration-300 flex flex-col items-center"
    aria-label={label}
  >
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
    <span className="text-xs text-white/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
  </a>
);

// Komponen LoadingProgress
const LoadingProgress: React.FC<LoadingProgressProps> = ({ progress }) => (
  <div className="w-full max-w-xs bg-black/30 h-1 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  </div>
);

// Komponen WelcomeScreen
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoadingComplete, setShowWelcome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  // Function to handle both callbacks
  const completeLoading = () => {
    if (onLoadingComplete) onLoadingComplete();
    if (setShowWelcome) setShowWelcome(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    // Show skip button after 1 second
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        completeLoading();
      }, 1000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(skipTimer);
      clearInterval(interval);
    };
  }, [onLoadingComplete, setShowWelcome]);

  const handleSkip = () => {
    setProgress(100);
    setIsLoading(false);
    setTimeout(() => {
      completeLoading();
    }, 800);
  };

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[
                  { Icon: Code2, label: "Code", href: "#projects" },
                  { Icon: User, label: "About", href: "#about" },
                  { Icon: Github, label: "GitHub", href: "https://github.com/naenmad" },
                  { Icon: Briefcase, label: "Projects", href: "#portfolio" },
                  { Icon: Mail, label: "Contact", href: "#contact" },
                ].map((item, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton {...item} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div className="text-center mb-6 sm:mb-8 md:mb-12" variants={childVariants}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span
                      data-aos="fade-right"
                      data-aos-delay="200"
                      className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    >
                      Welcome
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="400"
                      className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    >
                      To
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="600"
                      className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    >
                      My
                    </span>
                  </div>
                  <div>
                    <span
                      data-aos="fade-up"
                      data-aos-delay="800"
                      className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      Personal
                    </span>{" "}
                    <span
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                className="text-center mb-8"
                data-aos="fade-up"
                data-aos-delay="1100"
              >
                <p className="text-white/70 max-w-xl mx-auto">
                  A Software Engineer aiming to craft elegant digital solutions with modern technologies.
                </p>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="text-center mb-12"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="https://naen.tech"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      <TypewriterEffect text="naen.tech" />
                    </span>
                  </div>
                </a>
              </motion.div>

              {/* Loading Progress */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <LoadingProgress progress={progress} />
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs text-white/50">Loading experience... {progress}%</span>
                </div>
              </motion.div>

              {/* Skip Button */}
              {showSkip && (
                <motion.button
                  onClick={handleSkip}
                  className="absolute bottom-6 right-6 text-white/50 hover:text-white flex items-center gap-1 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Skip <ArrowRight className="w-3 h-3" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;