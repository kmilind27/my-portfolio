import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Cloud, Bot, Sprout, Calendar } from 'lucide-react';
import { experience } from '../../data';
import styles from './Experience.module.css';

const expIcons = [<Monitor size={22} />, <Cloud size={22} />, <Bot size={22} />, <Sprout size={22} />];

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef  = useRef();
  const titleRef    = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%' } }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2,
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%' } }
      );
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: isMobile ? 25 : 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="experience" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>Experience &amp; Certifications</h2>
      <p className={styles.subtitle} ref={subtitleRef}>My professional journey and achievements.</p>

      <div className={styles.grid}>
        {experience.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.icon}>{expIcons[i]}</div>
            <div className={styles.expTitle}>{item.title}</div>
            <div className={styles.org}>{item.org}</div>
            <div className={styles.date}><Calendar size={13} /> {item.date}</div>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
