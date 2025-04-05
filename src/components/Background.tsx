import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef<HTMLDivElement[]>([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    let currentScroll = 0;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;

        const initialPos = initialPositions[index];

        // Calculating movement in both X and Y direction
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340; // Horizontal movement
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40; // Vertical movement

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        // Apply transformation with smooth transition
        blob.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref!)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 rounded-full mix-blend-multiply filter blur-[128px] transition-transform duration-500
          bg-purple-500 opacity-40 md:opacity-20"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref!)}
          className="absolute top-0 -right-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-[128px] transition-transform duration-500 hidden sm:block
          bg-cyan-500 opacity-40 md:opacity-20"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref!)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-[128px] transition-transform duration-500
          bg-blue-500 opacity-40 md:opacity-20"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[3] = ref!)}
          className="absolute -bottom-10 right-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-[128px] transition-transform duration-500 hidden sm:block
          bg-blue-500 opacity-20 md:opacity-10"
        ></div>
      </div>
      <div
        className="absolute inset-0 transition-colors duration-500
          bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)]
          bg-[size:24px_24px]"
      ></div>
    </div>
  );
};

export default AnimatedBackground;

