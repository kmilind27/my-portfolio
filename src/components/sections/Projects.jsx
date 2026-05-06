import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, GitFork } from 'lucide-react';
import { projects } from '../../data';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, className }) {
  const ref = useRef();
  const onMove = (e) => {
    const card = ref.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, scale: 1.03, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
  };
  return <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

export default function Projects() {
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
          { opacity: 0, y: isMobile ? 30 : 60 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>Projects</h2>
      <p className={styles.subtitle} ref={subtitleRef}>Things I&apos;ve built with passion and purpose.</p>

      <div className={styles.grid}>
        {projects.map((project) => (
          <TiltCard key={project.title} className={styles.card}>
            <div className={styles.header} style={{ background: project.gradient }}>
              <span className={styles.emoji}>{project.emoji}</span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.desc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.links}>
                <a href={project.demo} className={styles.linkDemo} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a href={project.github} className={styles.linkGithub} target="_blank" rel="noreferrer">
                  <GitFork size={14} /> GitHub
                </a>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
