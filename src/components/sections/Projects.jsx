import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Clock } from 'lucide-react';
import { projects } from '../../data';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

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
          <TiltCard key={project.title} className={`${styles.card} ${project.featured ? styles.featured : ''}`}>
            <div className={styles.header} style={{ background: project.gradient }}>
              <div className={styles.blob} />
            </div>
            <div className={styles.body}>
              {project.featured && <div className={styles.featuredBadge}>Featured</div>}
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.outcome}>{project.outcome}</p>
              <p className={styles.desc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.links}>
                {project.demo ? (
                  <a href={project.demo} className={styles.linkDemo} target="_blank" rel="noreferrer">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                ) : (
                  <div className={styles.inProgress}>
                    <Clock size={14} /> In Progress
                  </div>
                )}
                <a href={project.github} className={styles.linkGithub} target="_blank" rel="noreferrer">
                  <GithubIcon size={14} /> GitHub
                </a>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
