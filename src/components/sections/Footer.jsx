import { personal } from '../../data';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Designed &amp; Built with ❤️ by{' '}
        <strong style={{ color: 'var(--accent)' }}>{personal.name}</strong>
      </p>
      <p className={styles.copy}>
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </p>
    </footer>
  );
}
