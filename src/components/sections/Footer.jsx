import { personal } from '../../data';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Designed &amp; Built with ❤️ by{' '}
        <strong style={{ color: 'var(--accent)' }}>{personal.name}</strong>
        &nbsp;·&nbsp;
        <a href={personal.github}  target="_blank" rel="noreferrer" className={styles.link}>GitHub</a>
        &nbsp;·&nbsp;
        <a href={personal.linkedin} target="_blank" rel="noreferrer" className={styles.link}>LinkedIn</a>
      </p>
      <p className={styles.copy}>
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </p>
    </footer>
  );
}
