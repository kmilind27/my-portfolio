import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { personal } from '../../data';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#home" className={styles.logo}>
        {personal.name.split(' ')[0]}<span style={{ color: 'var(--accent2)' }}>.</span>
      </a>

      <ul className={styles.links}>
        {navItems.map((item) => (
          <li key={item.label}>
            <a href="javascript:void(0)" onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}>{item.label}</a>
          </li>
        ))}
      </ul>

      <div className={styles.ctaBtns}>
        <button className={styles.themeToggle} onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <a href={personal.github} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
          GitHub
        </a>
        <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
