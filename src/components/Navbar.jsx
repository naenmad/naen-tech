import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Github, 
  Linkedin, 
  Instagram, 
  Search,
  Code,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchInputRef = useRef(null);
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { 
            href: "#About", 
            label: "About", 
            hasDropdown: true,
            dropdownItems: [
                { href: "#Skills", label: "Skills" },
                { href: "#Experience", label: "Experience" },
                { href: "#Education", label: "Education" },
            ]
        },
        { href: "#Posts", label: "Posts" },
        { href: "#Portfolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    const searchableContent = [
        { 
            section: "Home", 
            content: "Ahmad Zulkarnaen Software Engineer Portfolio Website",
            href: "#Home" 
        },
        { 
            section: "About", 
            content: "About me Software Engineer Frontend Backend Full Stack Developer",
            href: "#About" 
        },
        { 
            section: "Skills", 
            content: "JavaScript React Vue Angular Node.js Express MongoDB SQL HTML CSS Tailwind",
            href: "#Skills" 
        },
        { 
            section: "Experience", 
            content: "Work experience software development programming coding jobs career",
            href: "#Experience" 
        },
        { 
            section: "Education", 
            content: "Education school university courses certifications learning",
            href: "#Education" 
        },
        { 
            section: "Posts", 
            content: "Blog articles writing tech tutorials programming tips",
            href: "#Posts"
        },
        { 
            section: "Portfolio", 
            content: "Projects work showcase applications websites software development",
            href: "#Portfolio" 
        },
        { 
            section: "Contact", 
            content: "Contact information email phone message form",
            href: "#Contact" 
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        if (showSearchBox && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearchBox]);

    useEffect(() => {
        // Always use dark mode
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchTerm = searchInputRef.current.value.trim().toLowerCase();
        
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }
        
        setSearching(true);
        
        // Simulate search delay for better UX
        setTimeout(() => {
            const results = searchableContent.filter(item => 
                item.section.toLowerCase().includes(searchTerm) || 
                item.content.toLowerCase().includes(searchTerm)
            );
            
            setSearchResults(results);
            setSearching(false);
        }, 300);
    };
    
    const navigateToSearchResult = (href) => {
        setShowSearchBox(false);
        setSearchResults([]);
        if (searchInputRef.current) searchInputRef.current.value = '';
        
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
    };

    // Hover animation variants for framer-motion
    const hoverVariants = {
        initial: { width: 0 },
        hover: { width: "100%" },
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-[#030014] opacity-100"
                    : scrolled
                    ? "bg-[#030014]/70 backdrop-blur-xl border-b border-white/10"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 relative group">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="flex items-center text-xl font-bold"
                        >
                            <Code className="w-6 h-6 mr-2 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                            <span className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-300">
                                Ahmad Zulkarnaen
                            </span>
                        </a>
                        <motion.div 
                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                            initial="initial"
                            whileHover="hover"
                            animate={activeSection === "Home" ? "hover" : "initial"}
                            variants={hoverVariants}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => (
                            <div key={item.label} className="relative group">
                                <a
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium flex items-center"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                                : "text-[#e2d3fd] group-hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    {item.hasDropdown && (
                                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                                            activeSection === item.href.substring(1) 
                                                ? "text-purple-500" 
                                                : "text-[#e2d3fd]"} 
                                            group-hover:rotate-180`} 
                                        />
                                    )}
                                </a>
                                <motion.div 
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                                    initial="initial"
                                    whileHover="hover"
                                    animate={activeSection === item.href.substring(1) ? "hover" : "initial"}
                                    variants={hoverVariants}
                                    transition={{ duration: 0.3 }}
                                />
                                
                                {/* Dropdown Menu */}
                                {item.hasDropdown && (
                                    <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md overflow-hidden transition-all duration-300 transform opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
                                        <div className="bg-[#030014]/90 backdrop-blur-xl border border-white/10 shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 divide-y divide-gray-800/50">
                                            {item.dropdownItems.map((dropdownItem) => (
                                                <a
                                                    key={dropdownItem.label}
                                                    href={dropdownItem.href}
                                                    onClick={(e) => scrollToSection(e, dropdownItem.href)}
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600/20 hover:text-white transition-all duration-200"
                                                >
                                                    {dropdownItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Search Button */}
                        <button 
                            onClick={() => setShowSearchBox(!showSearchBox)} 
                            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-[#e2d3fd] hover:text-white" />
                        </button>
                    </div>
    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <button 
                            onClick={() => setShowSearchBox(!showSearchBox)} 
                            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-[#e2d3fd] hover:text-white" />
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isOpen ? "close" : "open"}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Updated Search Box */}
            <AnimatePresence>
                {showSearchBox && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 w-full bg-[#030014]/90 border-t border-b border-white/10 backdrop-blur-xl p-4"
                    >
                        <form onChange={handleSearch} onSubmit={(e) => e.preventDefault()} className="max-w-3xl mx-auto flex gap-2">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder-gray-400"
                            />
                            <button 
                                type="button"
                                onClick={handleSearch}
                                className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center gap-2"
                            >
                                {searching ? (
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <Search className="w-4 h-4" />
                                )}
                                <span>Search</span>
                            </button>
                        </form>
                        
                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-3xl mx-auto mt-4 bg-[#030014]/80 border border-white/10 rounded-lg overflow-hidden"
                            >
                                <div className="p-2">
                                    <div className="text-sm text-gray-400 px-3 py-2">
                                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {searchResults.map((result, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => navigateToSearchResult(result.href)}
                                                className="px-3 py-2 hover:bg-white/5 cursor-pointer transition-colors duration-150 flex items-center"
                                            >
                                                <div className="w-8 h-8 flex items-center justify-center bg-indigo-500/20 rounded-full mr-3">
                                                    <span className="text-indigo-400 text-sm">{result.section.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{result.section}</div>
                                                    <div className="text-sm text-gray-400 truncate">{result.content.substring(0, 40)}...</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        
                        {/* No results message */}
                        {searchInputRef.current?.value && searchResults.length === 0 && !searching && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="max-w-3xl mx-auto mt-4 p-4 border border-white/10 rounded-lg bg-[#030014]/80 text-center"
                            >
                                <AlertCircle className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-400">No results found for "{searchInputRef.current.value}"</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
    
            {/* Mobile Menu Overlay */}
            <motion.div
                className="md:hidden fixed inset-0 bg-[#030014] z-50"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ 
                    opacity: isOpen ? 1 : 0, 
                    x: isOpen ? 0 : "100%"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ top: "64px", display: isOpen ? "block" : "none" }}
            >
                <div className="flex flex-col h-full">
                    <div className="px-4 py-6 space-y-1 flex-1 overflow-y-auto">
                        {navItems.map((item, index) => (
                            <div key={item.label} className="py-1">
                                <a
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease rounded-lg ${
                                        activeSection === item.href.substring(1)
                                            ? "bg-white/5 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white font-semibold"
                                            : "text-[#e2d3fd] hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        className="flex items-center justify-between"
                                    >
                                        <span>{item.label}</span>
                                        {item.hasDropdown && (
                                            <ChevronDown className={`w-5 h-5 ${
                                                activeSection === item.href.substring(1) ? "text-purple-500" : "text-[#e2d3fd]"
                                            }`} />
                                        )}
                                    </motion.div>
                                </a>
                                
                                {/* Mobile Dropdown Items */}
                                {item.hasDropdown && (
                                    <div className="ml-6 mt-1 space-y-1 border-l-2 border-indigo-500/30 pl-4">
                                        {item.dropdownItems.map((dropdownItem) => (
                                            <a
                                                key={dropdownItem.label}
                                                href={dropdownItem.href}
                                                onClick={(e) => scrollToSection(e, dropdownItem.href)}
                                                className="block px-4 py-2 text-base text-[#e2d3fd] hover:text-white transition-colors duration-200"
                                            >
                                                <motion.div
                                                    initial={{ x: 20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                                                >
                                                    {dropdownItem.label}
                                                </motion.div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Social Links in Mobile Menu */}
                    <div className="px-6 py-4 border-t border-white/10">
                        <div className="flex justify-center items-center">
                            <div className="flex space-x-6">
                                <a href="https://github.com/naenmad" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com/in/naen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://instagram.com/madnaen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Progress Indicator */}
            <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                style={{ 
                    width: `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`,
                }}
                initial={{ width: "0%" }}
                transition={{ duration: 0.1 }}
            />
        </nav>
    );
};

export default Navbar;