import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { AlertTriangle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Error = ({ errorCode = "404", errorMessage = "Halaman tidak ditemukan" }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014] text-white p-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] rounded-xl p-10 shadow-2xl border border-white/5"
            data-aos="fade-up"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <AlertTriangle size={60} className="text-yellow-500" />
            </motion.div>
            
            <motion.h1 
              className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4"
              style={{
                color: '#6366f1',
                backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              data-aos="zoom-in"
            >
              {errorCode}
            </motion.h1>
            
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Oops! {errorMessage}
            </motion.h2>
            
            <motion.p 
              className="text-slate-400 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Maaf, halaman yang Anda cari tidak tersedia. Mungkin halaman telah dipindahkan atau dihapus.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link to="/">
                <Button 
                  variant="contained" 
                  className="
                    px-8 py-3 
                    text-white 
                    font-medium 
                    rounded-full
                    bg-gradient-to-r 
                    from-[#6366f1] 
                    to-[#a855f7] 
                    hover:from-[#4f46e5] 
                    hover:to-[#9333ea]
                    shadow-lg
                    hover:shadow-purple-500/20
                    transition-all
                    duration-300
                  "
                  sx={{
                    background: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
                    textTransform: 'none',
                    boxShadow: '0 4px 15px -3px rgba(139, 92, 246, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #4f46e5 10%, #9333ea 93%)',
                      boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Kembali ke Beranda
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Error;