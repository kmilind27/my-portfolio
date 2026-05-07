import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, CheckCircle, Send, Terminal, Eye, AlertCircle } from 'lucide-react';
import { personal } from '../../data';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const socialLinks = [
  { icon: <GithubIcon size={24} />, label: 'GitHub', href: personal.github },
  { icon: <LinkedinIcon size={24} />, label: 'LinkedIn', href: personal.linkedin },
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [phoneRevealed, setPhoneRevealed] = useState(false);

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
    setSending(true);
    setError('');

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: `From: ${form.name} (${form.email})\n\nMessage:\n${form.message}`,
        to_name: 'Kumar Milind',
        reply_to: form.email
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      setError('Failed to send. Please email directly.');
    })
    .finally(() => setSending(false));
  };

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.glow} />

      <h2 className={styles.title} ref={titleRef}>Get In Touch</h2>
      <p className={styles.subtitle} ref={subtitleRef}>Let&apos;s build something amazing together.</p>

      <div className={styles.grid}>
        <div className={styles.infoList}>
          <TerminalHeader />
          
          <a href={`mailto:${personal.email}`} className={styles.infoItem}>
            <span className={styles.infoIcon}><Mail size={18} /></span>
            <div>
              <div className={styles.infoLabel}>Email</div>
              <div className={styles.infoValue}>{personal.email}</div>
            </div>
          </a>

          <div className={styles.infoItem}>
            <span className={styles.infoIcon}><Phone size={18} /></span>
            <div>
              <div className={styles.infoLabel}>Phone</div>
              {phoneRevealed ? (
                <div className={styles.infoValue}>+91 62034 67908</div>
              ) : (
                <button className={styles.revealBtn} onClick={() => setPhoneRevealed(true)}>
                  <Eye size={14} /> Reveal number
                </button>
              )}
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoIcon}><MapPin size={18} /></span>
            <div>
              <div className={styles.infoLabel}>Location</div>
              <div className={styles.infoValue}>{personal.location}</div>
            </div>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.socialBtn} target="_blank" rel="noreferrer">
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
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
          <button type="submit" className={styles.submitBtn} disabled={sending || sent}>
            {sent ? <><CheckCircle size={16} /> Message Sent!</> : sending ? <>Sending...</> : <><Send size={16} /> Send Message</>}
          </button>
          {error && <div className={styles.error}><AlertCircle size={14} /> {error}</div>}
        </form>
      </div>
    </section>
  );
}
