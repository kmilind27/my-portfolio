import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, CheckCircle, Send, Terminal } from 'lucide-react';
import { personal } from '../../data';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { icon: <Mail size={18} />,  label: 'Email',    value: personal.email,   href: `mailto:${personal.email}` },
  { icon: <Phone size={18} />, label: 'Phone',    value: '+91 62034 67908', href: `tel:${personal.phone}` },
  { icon: <MapPin size={18} />, label: 'Location', value: personal.location, href: null },
];

const TYPING_LINES = [
  '> Initializing contact protocol...',
  '> Connection established.',
  '> Ready to collaborate.',
];

function TerminalHeader() {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let lineIdx = 0, charIdx = 0;
    const interval = setInterval(() => {
      const current = TYPING_LINES[lineIdx];
      if (charIdx <= current.length) {
        setLines(prev => {
          const next = [...prev];
          next[lineIdx] = current.slice(0, charIdx);
          return next;
        });
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
        if (lineIdx >= TYPING_LINES.length) clearInterval(interval);
      }
    }, 35);
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => { clearInterval(interval); clearInterval(blink); };
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }} />
        <span className={styles.dot} style={{ background: '#febc2e' }} />
        <span className={styles.dot} style={{ background: '#28c840' }} />
        <span className={styles.terminalTitle}><Terminal size={12} /> contact.sh</span>
      </div>
      <div className={styles.terminalBody}>
        {lines.map((line, i) => (
          <div key={i} className={styles.terminalLine}>
            <span className={styles.terminalText}>{line}</span>
            {i === lines.length - 1 && <span className={styles.cursor} style={{ opacity: cursor ? 1 : 0 }}>▋</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  const sectionRef  = useRef();
  const titleRef    = useRef();
  const subtitleRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

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
      gsap.fromTo(`.${styles.infoList}`,
        { opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.7, scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 88%' } }
      );
      gsap.fromTo(`.${styles.form}`,
        { opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.7, scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 88%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>Get In Touch</h2>
      <p className={styles.subtitle} ref={subtitleRef}>Let&apos;s build something amazing together.</p>

      <div className={styles.grid}>
        <div className={styles.infoList}>
          <TerminalHeader />
          {contactLinks.map((item) => (
            item.href
              ? <a key={item.label} href={item.href} className={styles.infoItem} target="_blank" rel="noreferrer">
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div>
                    <div className={styles.infoLabel}>{item.label}</div>
                    <div className={styles.infoValue}>{item.value}</div>
                  </div>
                </a>
              : <div key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div>
                    <div className={styles.infoLabel}>{item.label}</div>
                    <div className={styles.infoValue}>{item.value}</div>
                  </div>
                </div>
          ))}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" lang="en">Your Name</label>
            <input id="name" type="text" placeholder="John Doe" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" lang="en">Email Address</label>
            <input id="email" type="email" placeholder="john@example.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" lang="en">Message</label>
            <textarea id="message" placeholder="Tell me about your project..." value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <button type="submit" className={styles.submitBtn}>
            {sent ? <><CheckCircle size={16} /> Message Sent!</> : <><Send size={16} /> Send Message</>}
          </button>
        </form>
      </div>
    </section>
  );
}
