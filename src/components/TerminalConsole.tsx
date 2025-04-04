import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

// ASCII Art constant
const MADNAEN_ASCII = `
███╗   ███╗ █████╗ ██████╗ ███╗   ██╗ █████╗ ███████╗███╗   ██╗
████╗ ████║██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔════╝████╗  ██║
██╔████╔██║███████║██║  ██║██╔██╗ ██║███████║█████╗  ██╔██╗ ██║
██║╚██╔╝██║██╔══██║██║  ██║██║╚██╗██║██╔══██║██╔══╝  ██║╚██╗██║
██║ ╚═╝ ██║██║  ██║██████╔╝██║ ╚████║██║  ██║███████╗██║ ╚████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝                                       
`;

// Define TypeScript interfaces
interface OutputItem {
  type: 'system' | 'command' | 'error' | 'link' | 'ascii' | 'matrix';
  content: string;
  href?: string;
}

interface ThemeStyle {
  background: string;
  text: string;
  commandText: string;
  systemText: string;
  errorText: string;
  linkText: string;
  headerBg: string;
  border: string;
}

interface Command {
  description: string;
  hidden?: boolean;
  action: (args: string[]) => OutputItem[];
}

interface CommandsMap {
  [key: string]: Command;
}

interface MatrixEffectProps {
  onExit: () => void;
}

// MatrixEffect component with proper TypeScript definitions
const MatrixEffect: React.FC<MatrixEffectProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // An array of drops - one per column
    const drops: number[] = Array(Math.floor(columns)).fill(0).map(() => Math.random() * -100);
    
    // Draw function
    const draw = () => {
      // Black with opacity for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Generate random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomize drop restart locations
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drops down
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Press any key to exit
    const handleKeyDown = () => {
      onExit();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExit]);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute bottom-5 text-white text-opacity-70 text-center text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
        Press any key to exit
      </div>
    </div>
  );
};

// Main Terminal component
const TerminalConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<string>('default');
  const [output, setOutput] = useState<OutputItem[]>([
    { type: 'system', content: 'Welcome to Ahmad Zulkarnaen\'s terminal 👋' },
    { type: 'system', content: 'Type "help" to see available commands.' },
  ]);
  const [isMatrixActive, setIsMatrixActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  
  // Theme definitions
  const themeStyles: Record<string, ThemeStyle> = {
    default: {
      background: 'bg-black/95',
      text: 'text-white',
      commandText: 'text-green-400',
      systemText: 'text-gray-300',
      errorText: 'text-red-400',
      linkText: 'text-[#a855f7]',
      headerBg: 'bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20',
      border: 'border-[#6366f1]/30',
    },
    dark: {
      background: 'bg-gray-900/95',
      text: 'text-gray-200',
      commandText: 'text-blue-400',
      systemText: 'text-gray-400',
      errorText: 'text-red-500',
      linkText: 'text-blue-400',
      headerBg: 'bg-gray-800',
      border: 'border-gray-700',
    },
    light: {
      background: 'bg-gray-100/95',
      text: 'text-gray-800',
      commandText: 'text-green-600',
      systemText: 'text-gray-700',
      errorText: 'text-red-600',
      linkText: 'text-purple-600',
      headerBg: 'bg-white',
      border: 'border-gray-300',
    },
    retro: {
      background: 'bg-amber-950/95',
      text: 'text-amber-200',
      commandText: 'text-amber-400',
      systemText: 'text-amber-300',
      errorText: 'text-red-500',
      linkText: 'text-amber-500',
      headerBg: 'bg-amber-900',
      border: 'border-amber-800',
    },
    hacker: {
      background: 'bg-black/95',
      text: 'text-green-500',
      commandText: 'text-green-400',
      systemText: 'text-green-600',
      errorText: 'text-red-500',
      linkText: 'text-green-300',
      headerBg: 'bg-black',
      border: 'border-green-900',
    },
  };
  
  // Get current theme styles
  const currentStyles = themeStyles[currentTheme] || themeStyles.default;

  // Command definitions
  const commands: CommandsMap = {
    help: {
      description: 'Show available commands',
      action: (args: string[]): OutputItem[] => {
        // Get all visible commands first
        const visibleCommands = Object.keys(commands)
          .filter(cmd => !commands[cmd].hidden);
        
        // Return properly formatted output items
        return [
          { type: 'system' as const, content: 'Available commands:' },
          ...visibleCommands.map(cmd => (
            { type: 'system' as const, content: `• ${cmd} - ${commands[cmd].description}` }
          )),
          { type: 'system' as const, content: '• Fun commands: matrix, madnaen' }
        ];
      }
    },
    about: {
      description: 'Show information about me',
      action: () => [
        { type: 'system', content: 'Ahmad Zulkarnaen' },
        { type: 'system', content: 'Software Engineer & Web Developer' },
        { type: 'system', content: 'A Computer Science student interested in Software Engineering.' }
      ]
    },
    skills: {
      description: 'List my technical skills',
      action: () => [
        { type: 'system', content: 'Technical Skills:' },
        { type: 'system', content: '• Frontend: React.js, Next.js, TailwindCSS' },
        { type: 'system', content: '• Backend: Node.js, Express, MongoDB' },
        { type: 'system', content: '• Mobile: React Native, Flutter' },
      ]
    },
    projects: {
      description: 'View my projects',
      action: () => [
        { type: 'system', content: 'Projects:' },
        { type: 'system', content: '• Portfolio Website - Personal portfolio built with React and TailwindCSS' },
        { type: 'system', content: '• E-Commerce Platform - Online store with payment integration' },
        { type: 'link', content: 'Type "goto projects" to see all projects', href: '#Portofolio' }
      ]
    },
    contact: {
      description: 'Show contact information',
      action: () => [
        { type: 'system', content: 'Contact Information:' },
        { type: 'system', content: '• Email: ahmad@example.com' },
        { type: 'system', content: '• GitHub: naenmad' },
        { type: 'system', content: '• LinkedIn: naen' },
        { type: 'link', content: 'Type "goto contact" to visit contact form', href: '#Contact' }
      ]
    },
    clear: {
      description: 'Clear the terminal',
      action: () => []
    },
    date: {
      description: 'Show current date and time',
      action: () => [
        { type: 'system', content: `Current date: ${new Date().toLocaleString()}` }
      ]
    },
    goto: {
      description: 'Navigate to a section (e.g., goto about)',
      action: (args) => {
        const section = args[0]?.toLowerCase();
        const validSections = ['home', 'about', 'posts', 'projects', 'portfolio', 'contact'];
        
        if (!section || !validSections.includes(section)) {
          return [{ type: 'error', content: `Invalid section. Valid options: ${validSections.join(', ')}` }];
        }
        
        const sectionMap: Record<string, string> = {
          'projects': 'Portfolio',
          'portfolio': 'Portfolio'
        };
        
        const targetId = sectionMap[section] || section.charAt(0).toUpperCase() + section.slice(1);
        
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
        
        return [{ type: 'system', content: `Navigating to ${section}...` }];
      }
    },
    education: {
      description: 'View my educational background',
      action: () => [
        { type: 'system', content: 'Education:' },
        { type: 'system', content: '• Computer Science - University of Singaperbangsa Karawang (2023 - Now)' },
        { type: 'system', content: '• Relevant coursework: Data Structures, Algorithms, Web Development' }
      ]
    },
    experience: {
      description: 'Show my work experience',
      action: () => [
        { type: 'system', content: 'Work Experience:' },
        { type: 'system', content: '• Software Engineer Intern - Google (2023-2024)' },
        { type: 'system', content: '• Software Engineer - Freelance (2022-Present)' }
      ]
    },
    cv: {
      description: 'View or download my cv',
      action: () => [
        { type: 'system', content: 'Resume Options:' },
        { type: 'link', content: 'View Resume Online', href: '/cv.pdf' },
        { type: 'link', content: 'Download Resume (PDF)', href: '/cv.pdf?download=true' }
      ]
    },
    social: {
      description: 'View my social media profiles',
      action: () => [
        { type: 'system', content: 'Social Media:' },
        { type: 'link', content: '• GitHub: github.com/naenmad', href: 'https://github.com/naenmad' },
        { type: 'link', content: '• LinkedIn: linkedin.com/in/naen', href: 'https://linkedin.com/in/naen' },
        { type: 'link', content: '• Instagram: instagram.com/madnaen', href: 'https://instagram.com/madnaen' }
      ]
    },
    tools: {
      description: 'Show development tools I use',
      action: () => [
        { type: 'system', content: 'Development Tools:' },
        { type: 'system', content: '• Code Editor: VS Code and Intellij Idea' },
        { type: 'system', content: '• Design: Figma' },
        { type: 'system', content: '• Version Control: Git, GitHub' },
        { type: 'system', content: '• DevOps: Docker, GitHub Actions' }
      ]
    },
    stack: {
      description: 'Show my preferred tech stack',
      action: () => [
        { type: 'system', content: 'My Preferred Tech Stack:' },
        { type: 'system', content: '• Frontend: React.js, Next.js, TailwindCSS' },
        { type: 'system', content: '• Backend: Node.js, Express, GraphQL' },
        { type: 'system', content: '• Database: MongoDB, PostgreSQL' },
        { type: 'system', content: '• Deployment: Vercel, AWS' }
      ]
    },
    theme: {
      description: 'Change terminal color theme',
      action: (args) => {
        const theme = args[0]?.toLowerCase();
        const validThemes = Object.keys(themeStyles);
        
        if (!theme || !validThemes.includes(theme)) {
          return [{ type: 'error', content: `Invalid theme. Options: ${validThemes.join(', ')}` }];
        }
        
        setCurrentTheme(theme);
        
        return [{ type: 'system', content: `Theme changed to ${theme}!` }];
      }
    },
    languages: {
      description: 'Show programming languages I know',
      action: () => [
        { type: 'system', content: 'Programming Languages:' },
        { type: 'system', content: '• JavaScript/TypeScript - Advanced' },
        { type: 'system', content: '• Python - Intermediate' },
        { type: 'system', content: '• Java - Intermediate' },
        { type: 'system', content: '• C/C++ - Basic' }
      ]
    },
    secretzul: {
      description: 'Access secret area',
      hidden: true,
      action: () => {
        const easterEggUrls = ['/zulganteng', '/zultampan'];
        const randomUrl = easterEggUrls[Math.floor(Math.random() * easterEggUrls.length)];
        
        setTimeout(() => {
          window.location.href = randomUrl;
        }, 1500);
        
        return [
          { type: 'system', content: 'Accessing secret area...' },
          { type: 'system', content: 'Authentication successful!' },
          { type: 'system', content: 'Redirecting to classified content...' }
        ];
      }
    },
    naenganteng: {
      description: 'Another hidden gem',
      hidden: true,
      action: () => {
        setTimeout(() => {
          window.location.href = '/zulganteng';
        }, 1500);
        
        return [
          { type: 'system', content: 'Initiating special protocol...' },
          { type: 'system', content: 'Access granted!' }
        ];
      }
    },
    easteregg: {
      description: 'Find the Easter egg',
      hidden: true,
      action: () => {
        setTimeout(() => {
          window.location.href = '/zultampan';
        }, 1500);
        
        return [
          { type: 'system', content: 'You found me!' },
          { type: 'system', content: 'Loading secret page...' }
        ];
      }
    },
    secret: {
      description: 'What secrets?',
      action: () => [
        { type: 'system', content: 'Hmm, there might be hidden commands...' },
        { type: 'system', content: 'Try combining words like "naen", "secret", "zul", or "easteregg"' },
        { type: 'system', content: '🤫 But keep it a secret!' }
      ]
    },
    matrix: {
      description: 'Activate Matrix effect',
      action: () => {
        setTimeout(() => {
          setIsMatrixActive(true);
        }, 100);
        
        return [{ type: 'matrix', content: 'Initializing Matrix effect...' }];
      }
    },
    madnaen: {
      description: 'Display ASCII art',
      action: () => {
        return [{ type: 'ascii', content: MADNAEN_ASCII }];
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newOutput: OutputItem[] = [...output, { type: 'command', content: `> ${input}` }];
    
    const [command, ...args] = input.trim().toLowerCase().split(' ');
    
    if (command in commands) {
      const commandOutput = commands[command].action(args);
      setOutput(command === 'clear' ? [] : [...newOutput, ...commandOutput]);
    } else {
      setOutput([
        ...newOutput, 
        { type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }
      ]);
    }
    
    setInput('');
  };

  // Add tab completion
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const partialCommand = input.trim().toLowerCase();
      
      if (!partialCommand) return;
      
      const matchingCommands = Object.keys(commands).filter(cmd => 
        cmd.startsWith(partialCommand)
      );
      
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      } else if (matchingCommands.length > 1) {
        setOutput([
          ...output,
          { type: 'system', content: `Matching commands: ${matchingCommands.join(', ')}` }
        ]);
      }
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    const hasMatrixOutput = output.some(item => item.type === 'matrix');
    if (hasMatrixOutput && !isMatrixActive) {
      setIsMatrixActive(true);
    }
  }, [output, isMatrixActive]);

  const handleExitMatrix = () => {
    setIsMatrixActive(false);
    setOutput(prev => [
      ...prev.filter(item => item.type !== 'matrix'),
      { type: 'system', content: 'Matrix simulation terminated. Welcome back to reality!' }
    ]);
  };

  return (
    <>
      {isMatrixActive && <MatrixEffect onExit={handleExitMatrix} />}
      
      {/* Terminal toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
        aria-label="Toggle terminal"
      >
        <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
      
      {/* Terminal window */}
      <div 
        className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-in-out transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className={`${currentStyles.background} border-t ${currentStyles.border} backdrop-blur-xl ${currentStyles.text} max-h-[60vh] max-w-4xl mx-auto rounded-t-xl overflow-hidden shadow-2xl shadow-purple-500/20`}>
          {/* Terminal header */}
          <div className={`flex items-center justify-between px-4 py-2 ${currentStyles.headerBg} border-b border-white/10`}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-mono">naen@portfolio: ~</div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Terminal content */}
          <div 
            ref={terminalRef}
            className="p-4 font-mono text-sm overflow-y-auto h-[calc(60vh-40px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {output.map((line, index) => (
              <div key={index} className={`mb-1 ${
                line.type === 'error' ? currentStyles.errorText : 
                line.type === 'command' ? currentStyles.commandText : 
                line.type === 'ascii' ? "" : // No color class for ASCII
                currentStyles.systemText
              }`}>
                {line.type === 'link' ? (
                  <a href={line.href} className={`${currentStyles.linkText} hover:underline`}>
                    {line.content}
                  </a>
                ) : line.type === 'ascii' ? (
                  <pre className={`${currentStyles.commandText} text-xs sm:text-sm whitespace-pre font-mono`}>
                    {line.content}
                  </pre>
                ) : (
                  line.content
                )}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className={currentStyles.commandText + " mr-2"}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent border-none outline-none ${currentStyles.text} caret-green-400`}
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TerminalConsole;