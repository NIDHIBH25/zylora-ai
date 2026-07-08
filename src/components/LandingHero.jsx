import { useState, useEffect } from 'react';
import styles from './LandingHero.module.css';

const GALLERY = [
  { src: '/outfit_festive.png', label: 'Festive',  color: '#E8B86D' },
  { src: '/outfit_saree.png',   label: 'Ethnic',   color: '#C0392B' },
  { src: '/outfit_work.png',    label: 'Work',     color: '#2980B9' },
  { src: '/outfit_casual.png',  label: 'Casual',   color: '#E67E22' },
  { src: '/outfit_party.png',   label: 'Party',    color: '#8E44AD' },
  { src: '/outfit_date.png',    label: 'Date',     color: '#E91E8C' },
];

const FEATURES = [
  { icon: '✨', title: 'AI-Powered Styling', desc: 'Claude analyses your profile to build complete outfits that truly fit you' },
  { icon: '👗', title: 'Personalised Looks', desc: '3 full outfits tailored to your body type, skin tone & occasion' },
  { icon: '💬', title: 'Chat & Refine', desc: 'Ask follow-up questions — "make it cheaper" or "suggest shoes"' },
];

const STATS = [
  { value: '6+', label: 'Occasions Covered' },
  { value: 'AI', label: 'Claude-Powered' },
  { value: '₹0', label: 'Always Free' },
];

export default function LandingHero({ onGetStyled }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % GALLERY.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className={styles.wrapper}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className="logoContainer">
          <img src="/logo.png" alt="Zylora Logo" className="logoImg" />
          <span className="logoText">
            <span className="logoZ">Z</span>ylora<span className="logoAI"> AI</span>
          </span>
        </div>
        <button id="nav-get-styled-btn" className={styles.navCta} onClick={onGetStyled}>
          Get Styled Free →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.pill}>🌸 AI Fashion Stylist · Wear Elegance</div>
          <h1 className={styles.heroTitle}>
            Look <em>stunning</em>,<br />
            every single day.
          </h1>
          <p className={styles.heroSub}>
            Tell Zylora your body type, skin tone &amp; occasion — get 3 personalised, complete outfit suggestions powered by AI. Then chat to refine till it's perfect.
          </p>

          {/* Stats row */}
          <div className={styles.statsRow}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <button id="get-styled-btn" className={styles.ctaBtn} onClick={onGetStyled}>
              ✨ Get Styled Free
            </button>
            <span className={styles.ctaNote}>No sign-up · Takes 60 seconds</span>
          </div>
        </div>

        {/* ── HERO GALLERY STACK ── */}
        <div className={styles.heroRight}>
          <div className={styles.galleryStack}>
            {GALLERY.map((g, i) => {
              const offset = (i - activeSlide + GALLERY.length) % GALLERY.length;
              return (
                <div
                  key={i}
                  className={styles.stackCard}
                  data-offset={offset}
                  style={{ '--accent': g.color }}
                  onClick={() => setActiveSlide(i)}
                >
                  <img src={g.src} alt={g.label} className={styles.stackImg} />
                  <span className={styles.stackLabel}>{g.label}</span>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {GALLERY.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`}
                style={i === activeSlide ? { background: GALLERY[i].color } : {}}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── COLORFUL OUTFIT GRID ── */}
      <section className={styles.outfitSection}>
        <div className="section">
          <p className={styles.sectionTag}>✨ Styles We Cover</p>
          <h2 className={styles.sectionTitle}>Every Look, Every Occasion</h2>
          <div className={styles.outfitGrid}>
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className={styles.outfitTile}
                style={{ '--accent': g.color, animationDelay: `${i * 0.1}s` }}
              >
                <img src={g.src} alt={g.label} className={styles.outfitImg} />
                <div className={styles.outfitOverlay}>
                  <span className={styles.outfitLabel}>{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.features}>
        <div className="section">
          <p className={styles.sectionTag}>🎯 How It Works</p>
          <h2 className={styles.sectionTitle}>Your style, powered by AI</h2>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} className={styles.featureCard} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaInner}>
          <img src="/logo.png" alt="Zylora" className={styles.bottomLogo} />
          <h2 className={styles.bottomCtaTitle}>Ready for your style moment?</h2>
          <p className={styles.bottomCtaSub}>Join thousands finding their perfect look with Zylora AI</p>
          <button className={styles.ctaBtn} onClick={onGetStyled}>Start My Style Quiz →</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <img src="/logo.png" alt="Zylora AI" className={styles.footerLogo} />
        <p>© 2025 Zylora AI — Wear Elegance · Powered by Claude</p>
      </footer>
    </main>
  );
}
