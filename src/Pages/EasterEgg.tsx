import React, { useState, useEffect } from 'react';
import { Terminal, Award, Gift, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EasterEgg = () => {
  const [text, setText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const fullText = "CONGRATULATIONS! You've discovered the secret page!";
  
  useEffect(() => {
    // Typewriter effect
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowContent(true), 500);
    }
  }, [text]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto bg-gray-900/70 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-b border-green-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-green-300">naen@secret: ~/easter-egg</div>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Terminal Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <Terminal className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">{text}</h1>
          </div>
          
          {showContent && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 bg-black/40 rounded border border-green-500/30">
                <p className="mb-4">You've found the secret Easter Egg! As a reward, here are some fun facts about me:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span> 
                    <span>I once debugged code at 3 AM while sleepwalking (or so my roommate claims)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> 
                    <span>My first website was a Pokémon fan page built with HTML tables and marquee tags</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> 
                    <span>I have a collection of vintage keyboards that I refuse to part with</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span> 
                    <span>My caffeine consumption directly correlates with my git commit frequency</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <div className="w-full max-w-md p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 text-center">
                  <Award className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                  <h2 className="text-xl text-purple-300 mb-2">Secret Achievement Unlocked!</h2>
                  <p className="text-purple-100">Master Explorer: Found the hidden Easter Egg!</p>
                  
                  <div className="mt-6 flex justify-center space-x-4">
                    <a 
                      href="https://github.com/naenmad" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-500/30 hover:bg-purple-500/50 rounded border border-purple-500/50 transition-colors"
                    >
                      <Gift className="w-4 h-4 inline mr-2" />
                      Follow on GitHub
                    </a>
                    <Link 
                      to="/"
                      className="px-4 py-2 bg-green-500/30 hover:bg-green-500/50 rounded border border-green-500/50 transition-colors"
                    >
                      Return Home
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-center text-gray-500 mt-8">
                <p>Type <code className="text-green-400">secret</code> in the terminal for more hidden content!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;