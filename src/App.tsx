import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import EasterEgg from './Pages/EasterEgg';
import Error from "./Pages/Error";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./Pages/Portfolio";
import Posts from './Pages/Posts';
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetails";
import PostDetails from "./components/PostDetails";
import TerminalConsole from './components/TerminalConsole';
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import Skills from './Pages/Skills';
import Experience from './Pages/Experience';
import Education from './Pages/Education';

// Define props type for LandingPage
interface LandingPageProps {
  showWelcome: boolean;
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}

const LandingPage: React.FC<LandingPageProps> = ({ showWelcome, setShowWelcome }) => {
  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <WelcomeScreen setShowWelcome={setShowWelcome} />
      ) : (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Posts />
          <Portfolio />
          <ContactPage />
          <Footer />
          <TerminalConsole />
        </>
      )}
    </AnimatePresence>
  );
};

const ProjectPageLayout: React.FC = () => (
  <>
    <Navbar />
    <ProjectDetails />
    <Footer />
  </>
);

const PostsPageLayout: React.FC = () => (
  <>
    <Navbar />
    <AnimatedBackground />
    <PostDetails />
    <Footer />
    <TerminalConsole />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  
  const routes = [
    {
      path: "/",
      element: <LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />
    },
    {
      path: "/project/:id",
      element: <ProjectPageLayout />
    },
    {
      path: "/post/:id",
      element: <PostsPageLayout />
    },
    {
      path: "*",
      element: <Error />
    },
    {
      path: "/404",
      element: <Error errorCode="404" errorMessage="Halaman tidak ditemukan" />
    },
    {
      path: "/500",
      element: <Error errorCode="500" errorMessage="Kesalahan server" />
    },
    {
      path: "/easteregg",
      element: <EasterEgg />
    },
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  });

  return <RouterProvider router={router} />;
}

export default App;