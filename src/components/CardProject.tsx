import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

export interface CardProjectProps {
  id: string;
  Img: string;
  Title: string;
  Description: string;
  Link: string;
  Github?: string;
  Features?: string[];
  TechStack: string[];
}

const CardProject: React.FC<CardProjectProps> = ({
  id,
  Img,
  Title,
  Description,
  Link,
  Github,
  Features = [],
  TechStack = []
}) => {
  const navigate = useNavigate();

  const handleLiveDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!Link) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = () => {
    if (!id) {
      alert("Project details are not available");
    } else {
      navigate(`/project/${id}`);
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative bg-[#030014] rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 border border-white/10 hover:border-white/20 h-full">
        <div className="flex flex-col h-full">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-50 z-10"></div>
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="p-5 flex-grow flex flex-col justify-between">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all duration-300">
              {Title}
            </h3>

            <div className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">{Description}</div>

            <div className="pt-4 flex items-center justify-between">
              {/* Tautan Live Demo */}
              {Link ? (
                <a
                  href={Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}

              {/* Tautan Detail Proyek */}
              {id ? (
                <button
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          {/* Efek Hover */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;