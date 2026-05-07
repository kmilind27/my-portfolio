import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Rocket, Mail, Download, ChevronDown } from 'lucide-react';
import { personal } from '../../data';
import styles from './Hero.module.css';

function MagneticBtn({ children, className, href, target, rel }) {
  const ref = useRef();
  const onMove = (e) => {
    const el = ref.current;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) * 0.3;
    const y = (e.clientY - top  - height / 2) * 0.3;
    gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  return <a ref={ref} href={href} target={target} rel={rel} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</a>;
}

const ROLES = ['Spring Boot Engineer', 'React Developer', 'Microservices Architect'];

function TypedRole() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIdx((roleIdx + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, roleIdx, isDeleting]);

  return (
    <span>
      {text}
      <span className={styles.cursor}>|</span>
    </span>
  );
}

export default function Hero() {
  const tagRef  = useRef();
  const nameRef = useRef();
  const roleRef = useRef();
  const descRef = useRef();
  const btnsRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(tagRef.current,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(nameRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(roleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }, []);

  return (
    <section className={styles.section} id="home">
      <div className={`${styles.glow} ${styles.glowLeft}`} />
      <div className={`${styles.glow} ${styles.glowRight}`} />

      <div className={styles.content}>
        <div ref={tagRef} className={styles.openToWork}>
          <span className={styles.dot}></span>
          Available for opportunities
        </div>

        <h1 ref={nameRef} className={styles.name}>
          Hi, I&apos;m <span className={styles.nameAccent}>{personal.name}</span>
        </h1>

        <p ref={roleRef} className={styles.role}>
          <TypedRole />
        </p>

        <p ref={descRef} className={styles.desc}>
          {personal.tagline} I build scalable backends, intuitive frontends, and everything in between.
        </p>

        <div ref={btnsRef} className={styles.btns}>
          <MagneticBtn href="#projects" className={styles.btnPrimary}><Rocket size={15} /> View Projects</MagneticBtn>
          <MagneticBtn href="#contact"  className={styles.btnOutline}><Mail size={15} /> Get In Touch</MagneticBtn>
          <MagneticBtn href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.btnOutline}><Download size={15} /> Resume</MagneticBtn>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <ChevronDown size={18} className={styles.scrollIcon} />
      </div>
    </section>
  );
}
