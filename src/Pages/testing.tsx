import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AnimatedBackground from '../components/Background';

const TestAOS = () => {
    const [aosElements, setAosElements] = useState<{
        id: number;
        animation: string;
        willChange: string;
        element: string;
        classes: string;
    }[]>([]);

    useEffect(() => {
        // Inisialisasi AOS dengan throttling lebih rendah untuk performa lebih baik
        AOS.init({
            offset: 120,
            delay: 0,
            duration: 1000,
            easing: 'ease',
            once: false,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });

        // Function untuk mengecek will-change property
        const checkWillChange = () => {
            // Mengambil semua elemen dengan data-aos
            const elements = document.querySelectorAll('[data-aos]');
            
            console.log(`Ditemukan ${elements.length} elemen dengan data-aos`);
            
            const elementsData = Array.from(elements).map((element, index) => {
                // Mengambil computed style
                const computedStyle = window.getComputedStyle(element);
                const willChange = computedStyle.getPropertyValue('will-change');
                
                return {
                    id: index + 1,
                    animation: element.getAttribute('data-aos') || '',
                    willChange: willChange,
                    element: element.tagName,
                    classes: element.className
                };
            });
            
            setAosElements(elementsData);
        };

        // Jalankan pengecekan setelah AOS diinisialisasi dan pada scroll
        setTimeout(checkWillChange, 500);
        
        window.addEventListener('scroll', () => {
            setTimeout(checkWillChange, 100);
        });
        
        return () => {
            window.removeEventListener('scroll', checkWillChange);
        };
    }, []);

    const animationTypes = [
        'fade-up', 'fade-down', 'fade-left', 'fade-right',
        'fade-up-right', 'fade-up-left', 'fade-down-right', 'fade-down-left',
        'zoom-in', 'zoom-in-up', 'zoom-in-down', 'zoom-in-left', 'zoom-in-right',
        'zoom-out', 'zoom-out-up', 'zoom-out-down', 'zoom-out-left', 'zoom-out-right',
        'flip-up', 'flip-down', 'flip-left', 'flip-right'
    ];

    return (
        <>
            <style>
                {`
                    [data-aos] {
                        will-change: transform, opacity !important;
                    }
                    
                    .debug-border [data-aos] {
                        border: 2px dashed red;
                    }
                    
                    .test-panel {
                        background-color: rgba(3, 0, 20, 0.8);
                        backdrop-filter: blur(10px);
                        position: relative;
                        z-index: 10;
                    }
                    
                    .test-card {
                        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 0.75rem;
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .test-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background: linear-gradient(90deg, #6366f1, #a855f7);
                        transform: scaleX(0);
                        transform-origin: left;
                        transition: transform 0.6s ease;
                    }
                    
                    .test-card:hover::before {
                        transform: scaleX(1);
                    }
                `}
            </style>

            {/* Background Animation */}
            <AnimatedBackground />
            
            {/* Test Control Panel */}
            <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 test-panel max-w-sm max-h-[400px] overflow-auto">
                <h3 className="text-lg font-semibold text-white mb-2">AOS Debug Panel</h3>
                <label className="flex items-center text-sm text-gray-300 mb-4">
                    <input 
                        type="checkbox" 
                        className="mr-2" 
                        onChange={(e) => {
                            document.body.classList.toggle('debug-border', e.target.checked);
                        }}
                    />
                    Show debug borders
                </label>
                
                <div className="text-xs text-gray-400 mb-2">
                    {aosElements.length} elements with AOS found
                </div>
                
                {aosElements.length > 0 && (
                    <div className="text-xs text-gray-300 bg-black/30 p-2 rounded-md max-h-[200px] overflow-auto">
                        {aosElements.map(item => (
                            <div key={item.id} className="mb-2 pb-2 border-b border-gray-800">
                                <div><span className="text-purple-400">Animation:</span> {item.animation}</div>
                                <div><span className="text-purple-400">Will-change:</span> {item.willChange || 'none'}</div>
                                <div><span className="text-purple-400">Element:</span> {item.element}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Test Content */}
            <div className="min-h-screen py-20 px-6 relative z-10">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12" data-aos="fade-down">
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4">
                            AOS Animation Testing
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            This page tests various Animate On Scroll animations and monitors the will-change property
                            to optimize performance.
                        </p>
                    </div>
                    
                    {/* Animation Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {animationTypes.map((animation, index) => (
                            <div 
                                key={animation}
                                className="test-card p-6"
                                data-aos={animation}
                                data-aos-duration={1000}
                                data-aos-delay={index * 50 % 300}
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {animation}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Animation delay: {index * 50 % 300}ms
                                </p>
                                <div className="mt-4 text-xs bg-black/30 p-2 rounded">
                                    <code>data-aos="{animation}"</code>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Scroll Trigger Test */}
                    <div className="my-32 text-center" data-aos="zoom-in">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Scroll down to see more animations
                        </h2>
                        <div className="animate-bounce text-purple-500">
                            ↓
                        </div>
                    </div>
                    
                    {/* Animation Sequence */}
                    <div className="max-w-4xl mx-auto space-y-12 my-20">
                        <div className="bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 p-8 rounded-lg" data-aos="fade-right">
                            <h3 className="text-2xl font-bold text-white mb-4">Sequence Animation 1</h3>
                            <p className="text-gray-300">Testing fade-right animation with default settings.</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-[#a855f7]/10 to-[#6366f1]/10 p-8 rounded-lg" data-aos="fade-left" data-aos-delay="200">
                            <h3 className="text-2xl font-bold text-white mb-4">Sequence Animation 2</h3>
                            <p className="text-gray-300">Testing fade-left animation with 200ms delay.</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 p-8 rounded-lg" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-2xl font-bold text-white mb-4">Sequence Animation 3</h3>
                            <p className="text-gray-300">Testing fade-up animation with 400ms delay.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestAOS;