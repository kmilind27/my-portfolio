import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  'Languages': [
    { name: 'Java', icon: 'openjdk', exp: '4 yrs', color: '#437291' },
    { name: 'JavaScript', icon: 'javascript', exp: '3 yrs', color: '#F7DF1E' },
    { name: 'Python', icon: 'python', exp: '2 yrs', color: '#3776AB' },
    { name: 'C++', icon: 'cplusplus', exp: '2 yrs', color: '#00599C' },
  ],
  'Frameworks': [
    { name: 'Spring Boot', icon: 'springboot', exp: 'Production', color: '#6DB33F' },
    { name: 'React', icon: 'react', exp: 'Production', color: '#61DAFB' },
    { name: 'Node.js', icon: 'nodedotjs', exp: '2 yrs', color: '#339933' },
  ],
  'DevOps & Tools': [
    { name: 'Docker', icon: 'docker', exp: 'Production', color: '#2496ED' },
    { name: 'Git', icon: 'git', exp: '4 yrs', color: '#F05032' },
    { name: 'MySQL', icon: 'mysql', exp: '3 yrs', color: '#4479A1' },
    { name: 'RabbitMQ', icon: 'rabbitmq', exp: 'Production', color: '#FF6600' },
  ],
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

      gsap.utils.toArray(`.${styles.card}`).forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: isMobile ? 25 : 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: card, start: 'top 90%' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="skills" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>Skills</h2>
      <p className={styles.subtitle} ref={subtitleRef}>Technologies I work with daily.</p>

      {Object.entries(skillsData).map(([category, skills]) => (
        <div key={category} className={styles.category}>
          <div className={styles.categoryLabel}>{category}</div>
          <div className={styles.grid}>
            {skills.map((skill) => (
              <TiltCard key={skill.name} className={styles.card}>
                <img 
                  src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.slice(1)}`} 
                  alt={skill.name}
                  className={styles.icon}
                />
                <div className={styles.name}>{skill.name}</div>
                <div className={styles.exp}>{skill.exp}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
