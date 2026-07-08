import styles from './OutfitCard.module.css';

const ACCENT_GRADIENTS = [
  'linear-gradient(135deg, #F2B8C6, #E891AD)',
  'linear-gradient(135deg, #C97B8E, #A85A71)',
  'linear-gradient(135deg, #E8A87C, #C68642)',
];

const OCCASION_BADGES = {
  Casual:  { bg: '#EEF6FF', color: '#3B82F6' },
  Work:    { bg: '#F0FDF4', color: '#16A34A' },
  Party:   { bg: '#FEF3C7', color: '#D97706' },
  Date:    { bg: '#FFF0F3', color: '#E11D48' },
  Festive: { bg: '#F5F0FF', color: '#7C3AED' },
};

const getOccasionImage = (occasion, index) => {
  const normalized = (occasion || '').toLowerCase().trim();
  if (normalized.includes('casual')) return '/outfit_casual.png';
  if (normalized.includes('work') || normalized.includes('office') || normalized.includes('corporate')) return '/outfit_work.png';
  if (normalized.includes('party') || normalized.includes('night') || normalized.includes('club')) return '/outfit_party.png';
  if (normalized.includes('date') || normalized.includes('romantic')) return '/outfit_date.png';
  if (normalized.includes('festive') || normalized.includes('wedding') || normalized.includes('ethnic') || normalized.includes('diwali') || normalized.includes('traditional')) {
    // Distribute between festive and saree depending on index
    return index % 2 === 0 ? '/outfit_festive.png' : '/outfit_saree.png';
  }
  return '/outfit_casual.png'; // fallback
};

export default function OutfitCard({ outfit, index }) {
  const gradient = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];
  const badge = OCCASION_BADGES[outfit.occasion] || { bg: '#FBE4EC', color: '#A85A71' };
  const imageUrl = getOccasionImage(outfit.occasion || '', index);

  return (
    <article className={styles.card} style={{ animationDelay: `${index * 0.15}s` }}>
      {/* Outfit Banner Image */}
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={outfit.name} className={styles.cardImage} />
        <div className={styles.imageOverlay} style={{ background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%), ${gradient}22` }} />
      </div>

      {/* Accent bar */}
      <div className={styles.accentBar} style={{ background: gradient }} />

      <div className={styles.body}>
        {/* Top row */}
        <div className={styles.topRow}>
          <span
            className={styles.badge}
            style={{ background: badge.bg, color: badge.color }}>
            {outfit.occasion}
          </span>
          <span className={styles.outfitNum}>Look {index + 1}</span>
        </div>

        <h2 className={styles.name}>{outfit.name}</h2>

        {/* Reasoning */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎯</span> Why it works for you
          </h3>
          <p className={styles.reasoning}>{outfit.reasoning}</p>
        </section>

        {/* Items */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🛍️</span> What you'll need
          </h3>
          <ul className={styles.itemsList}>
            {outfit.items?.map((item, i) => (
              <li key={i} className={styles.item}>
                <span className={styles.garment}>{item.garment}</span>
                <span className={styles.itemDot}>·</span>
                <span className={styles.itemColor}>{item.color}</span>
                <span className={styles.itemDot}>·</span>
                <span className={styles.itemStyle}>{item.style}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
