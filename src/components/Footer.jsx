import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Globe, 
  Phone, 
  MapPin,
  Code,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/naenmad", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/naen", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/madnaen", label: "Twitter" },
    { icon: Mail, href: "mailto:ahmzlkrnn@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { label: "Home", href: "#Home" },
    { label: "About", href: "#About" },
    { label: "Posts", href: "#posts" },
    { label: "Portfolio", href: "#Portfolio" },
    { label: "Contact", href: "#Contact" }
  ];

  return (
    <footer className="relative bg-[#030014] pt-16 pb-8 border-t border-white/10 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">        
        {/* Footer main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Code className="w-6 h-6 mr-2 text-indigo-500" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Ahmad Zulkarnaen
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
            A Software Engineer that aiming to crafting elegant digital solutions with modern technologies
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Bogor, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+62 851-8305-8315</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Globe className="w-4 h-4 text-indigo-400" />
                <a href="https://naen.tech" className="hover:text-white transition-colors">
                  naen.tech
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  API Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Technical Consulting
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter subscription - temporarily disabled */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Newsletter subscription is temporarily unavailable. Check back soon for updates!
            </p>
            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white/50 focus:outline-none cursor-not-allowed"
                  disabled
                />
              </div>
              <button
                type="button"
                disabled
                className="w-full bg-gradient-to-r from-indigo-600/50 to-purple-600/50 py-2.5 rounded-lg text-white/70 font-medium cursor-not-allowed opacity-70"
              >
                Coming Soon
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>
        
        {/* Bottom section with social links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear}{" "}
            <a 
              href="https://naen.tech" 
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Ahmad Zulkarnaen
            </a>
            . All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Made with love */}
        <div className="text-center mt-8 text-xs text-gray-500 flex items-center justify-center gap-1.5">
          Made with 
          <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> 
          in Bogor, Indonesia
        </div>
      </div>
    </footer>
  );
};

export default Footer;