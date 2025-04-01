import { 
  BrowserRouter,
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
import ProjectDetails from "./components/ProjectDetail";
import TerminalConsole from './components/TerminalConsole';
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Posts />
          <Portfolio />
          <ContactPage />
          <Footer />
          <TerminalConsole />
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  
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
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  });

  return (
    <RouterProvider 
      router={router} 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }}
    />
  );
}

export default App;