import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about, education } from '../../data';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
      gsap.fromTo(`.${styles.textBlock}`,
        { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.8, scrollTrigger: { trigger: `.${styles.textBlock}`, start: 'top 85%' } }
      );
      gsap.fromTo(`.${styles.eduCard}`,
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.2, scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="about" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>About Me</h2>
      <p className={styles.subtitle} ref={subtitleRef}>A little about who I am and where I&apos;ve been.</p>

      <div className={styles.grid}>
        <div className={styles.textBlock}>
          <p>{about}</p>
          <p>
            When I&apos;m not coding, I enjoy exploring new technologies, contributing to open-source
            projects, and staying updated with the latest trends in AI and cloud computing.
          </p>
          <div className={styles.divider} />
          <div className={styles.stats}>
            {[
              ['10+', 'Projects Built', 'across 3 domains'],
              ['3+', 'Certifications', 'cloud & full-stack'],
              ['3+', 'Years Coding', 'production experience']
            ].map(([num, label, sublabel]) => (
              <div key={label} className={styles.statItem}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
                <div className={styles.statSublabel}>{sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={styles.eduHeading}>🎓 Education</h3>
          <div className={styles.timeline}>
            {education.map((edu, i) => (
              <div key={i} className={styles.eduCard}>
                <div className={styles.dot} />
                <div>
                  <div className={styles.year}>{edu.year}</div>
                  <div className={styles.degree}>{edu.degree}</div>
                  <div className={styles.school}>{edu.school}</div>
                  <div className={styles.grade}>{edu.grade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
