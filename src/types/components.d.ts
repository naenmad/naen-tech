declare module "../components/CardProject" {
  import React from "react";
  
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
  
  const CardProject: React.FC<CardProjectProps>;
  export default CardProject;
}

declare module "../components/TechStackIcon" {
  import React from "react";
  
  export interface TechStackIconProps {
    icon: string;
    language: string;
  }
  
  const TechStackIcon: React.FC<TechStackIconProps>;
  export default TechStackIcon;
}

declare module "../components/Certificate" {
  import React from "react";
  
  export interface CertificateProps {
    ImgSertif: string;
  }
  
  const Certificate: React.FC<CertificateProps>;
  export default Certificate;
}