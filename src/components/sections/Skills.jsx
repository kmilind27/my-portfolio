import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Zap, Code2, Cpu, Database, Leaf, Atom, Link, Container, Rabbit, HardDrive, GitBranch } from 'lucide-react';
import { skills } from '../../data';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const skillIcons = {
  'Java': <Coffee size={22} />,
  'JavaScript': <Zap size={22} />,
  'Python': <Code2 size={22} />,
  'C++': <Cpu size={22} />,
  'SQL': <Database size={22} />,
  'Spring Boot': <Leaf size={22} />,
  'React': <Atom size={22} />,
  'REST APIs': <Link size={22} />,
  'Docker': <Container size={22} />,
  'RabbitMQ': <Rabbit size={22} />,
  'MySQL': <HardDrive size={22} />,
  'Git': <GitBranch size={22} />,
};

function TiltCard({ children, className }) {
  const ref = useRef();
  const glowRef = useRef();

  const onMove = (e) => {
    const card = ref.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    gsap.to(card, { rotateY: x * 18, rotateX: -y * 18, scale: 1.06, duration: 0.35, ease: 'power2.out', transformPerspective: 600 });
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(145,94,255,0.25), transparent 70%)`;
    }
  };

  const onLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    if (glowRef.current) glowRef.current.style.background = 'none';
  };

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={glowRef} className={styles.cardGlow} />
      {children}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef();
  const titleRef   = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Title reveal
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%' } }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%' } }
      );

      // Per-card scroll + bar animation
      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: isMobile ? 25 : 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: card, start: 'top 90%' } }
        );
        const fill = card.querySelector(`.${styles.fill}`);
        if (fill) {
          gsap.fromTo(fill, { width: '0%' },
            { width: fill.dataset.level + '%', duration: 1.3, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 90%' } }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="skills" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>Skills</h2>
      <p className={styles.subtitle} ref={subtitleRef}>Technologies I work with daily.</p>

      <div className={styles.grid}>
        {skills.map((skill) => (
          <TiltCard key={skill.name} className={styles.card}>
            <div className={styles.icon}>{skillIcons[skill.name] ?? skill.icon}</div>
            <div className={styles.name}>{skill.name}</div>
            <div className={styles.bar}>
              <div className={styles.fill} data-level={skill.level} style={{ width: 0 }} />
            </div>
            <div className={styles.percent}>{skill.level}%</div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
