import styles from './LoadingSpinner.module.css';

const MESSAGES = [
  'Curating your looks…',
  'Analysing your style profile…',
  'Consulting the fashion archives…',
  'Putting together your outfits…',
];

export default function LoadingSpinner() {
  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.spinner} />
        <h2 className={styles.title}>Zylora is styling you</h2>
        <p className={styles.msg}>{msg}</p>
        <div className={styles.skeletons}>
          {[0, 1, 2].map(i => (
            <div key={i} className={styles.skeletonCard} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className={`skeleton ${styles.skLine}`} style={{ width: '60%', height: 20 }} />
              <div className={`skeleton ${styles.skLine}`} style={{ width: '90%', height: 14, marginTop: 10 }} />
              <div className={`skeleton ${styles.skLine}`} style={{ width: '80%', height: 14, marginTop: 6 }} />
              <div className={`skeleton ${styles.skLine}`} style={{ width: '40%', height: 14, marginTop: 16 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
