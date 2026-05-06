import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import './index.css';

const Background3D = lazy(() => import('./components/3d/Background3D'));

import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); cursor.remove(); };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <div className="grain" />
      <div className="content">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
