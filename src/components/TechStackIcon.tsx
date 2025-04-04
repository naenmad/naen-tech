import React from 'react';

// Tambahkan interface untuk props
interface TechStackIconProps {
  icon: string;     // Nama properti disesuaikan dengan yang digunakan di Portfolio.tsx
  language: string; // Nama properti disesuaikan dengan yang digunakan di Portfolio.tsx
}

const TechStackIcon: React.FC<TechStackIconProps> = ({ icon, language }) => {
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
        <img 
          src={`/images/tech/${icon}`} // Tambahkan path folder untuk menghindari masalah path relatif
          alt={`${language} icon`} 
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
        {language}
      </span>
    </div>
  );
};

export default TechStackIcon;