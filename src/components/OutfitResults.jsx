import OutfitCard from './OutfitCard';
import ChatBox from './ChatBox';
import styles from './OutfitResults.module.css';

const images = [
  { id: 'casual', url: '/outfit_casual.png', keywords: ['casual', 'athleisure', 'denim', 'jeans', 't-shirt', 'tee', 'sneakers', 'errands', 'shorts', 'loungewear', 'flat', 'sporty', 'joggers', 'sweatpants', 'hoodie', 'brunch', 'everyday', 'daily', 'walk', 'simple'] },
  { id: 'work', url: '/outfit_work.png', keywords: ['work', 'office', 'corporate', 'blazer', 'trousers', 'formal', 'shirt', 'pantsuit', 'meeting', 'interview', 'smart casual', 'pencil', 'trousers', 'blouse', 'tuck', 'professional'] },
  { id: 'party', url: '/outfit_party.png', keywords: ['party', 'night', 'club', 'glam', 'sequin', 'shimmer', 'metallic', 'cocktail', 'concert', 'dance', 'heels', 'glitter', 'sparkle', 'bling', 'bold'] },
  { id: 'date', url: '/outfit_date.png', keywords: ['date', 'romantic', 'dinner', 'maxi', 'skirt', 'dress', 'floral', 'chic', 'bohemian', 'boho', 'brunch', 'midi', 'cowl', 'sweetheart', 'ruffle', 'wrap dress'] },
  { id: 'festive', url: '/outfit_festive.png', keywords: ['festive', 'traditional', 'wedding', 'ethnic', 'diwali', 'kurta', 'lehenga', 'anarkali', 'sharara', 'jhumkas', 'dupatta', 'salwar', 'kurtis', 'embroidery', 'juti', 'festivals'] },
  { id: 'saree', url: '/outfit_saree.png', keywords: ['saree', 'sari', 'drape', 'ethnic', 'silk', 'traditional', 'wedding', 'festive', 'temple', 'pallu', 'blouse'] }
];

const negativeKeywords = {
  saree: ['jeans', 'denim', 't-shirt', 'tee', 'shorts', 'athleisure', 'sneakers', 'blazer', 'trousers', 'pantsuit', 'joggers', 'hoodie', 'sporty'],
  festive: ['jeans', 'denim', 't-shirt', 'tee', 'shorts', 'athleisure', 'sneakers', 'blazer', 'trousers', 'pantsuit', 'joggers', 'hoodie', 'sporty'],
  work: ['saree', 'sari', 'lehenga', 'anarkali', 'sharara', 'traditional', 'wedding', 'festive'],
  party: ['corporate', 'office', 'interview', 'workwear'],
};

function getMatchScore(outfit, img) {
  const name = (outfit.name || '').toLowerCase();
  const occasion = (outfit.occasion || '').toLowerCase();
  const reasoning = (outfit.reasoning || '').toLowerCase();
  const itemsText = (outfit.items || []).map(i => `${i.garment} ${i.color} ${i.style}`).join(' ').toLowerCase();
  const fullText = `${name} ${occasion} ${reasoning} ${itemsText}`;
  
  let score = 0;
  
  // Check positive keywords
  for (const keyword of img.keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    const matches = fullText.match(regex);
    if (matches) {
      score += matches.length;
    }
  }
  
  // Check negative keywords
  const negs = negativeKeywords[img.id];
  if (negs) {
    for (const keyword of negs) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      if (regex.test(fullText)) {
        score -= 10;
      }
    }
  }
  
  return score;
}

function assignImages(outfits) {
  if (!outfits || outfits.length === 0) return [];
  
  const n = images.length;
  const m = outfits.length;
  
  const scores = outfits.map(outfit => {
    return images.map(img => getMatchScore(outfit, img));
  });
  
  let bestScore = -1000;
  let bestAssignment = Array.from({ length: m }, (_, i) => i % n);
  
  if (m === 3) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        for (let k = 0; k < n; k++) {
          if (i === k || j === k) continue;
          
          const currentScore = scores[0][i] + scores[1][j] + scores[2][k];
          if (currentScore > bestScore) {
            bestScore = currentScore;
            bestAssignment = [i, j, k];
          }
        }
      }
    }
    return bestAssignment.map(idx => images[idx].url);
  }
  
  // Greedy fallback if length is not 3
  const used = new Set();
  const result = [];
  for (let i = 0; i < m; i++) {
    let bestIdx = 0;
    let maxS = -1000;
    for (let j = 0; j < n; j++) {
      if (used.has(j)) continue;
      const s = scores[i][j];
      if (s > maxS) {
        maxS = s;
        bestIdx = j;
      }
    }
    result.push(images[bestIdx].url);
    used.add(bestIdx);
  }
  return result;
}

export default function OutfitResults({ results, intakeData, error, onStartOver }) {
  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.errorBox}>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button className="btn-primary" onClick={onStartOver} style={{ marginTop: 20 }}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className="logoContainer">
            <img src="/logo.png" alt="Zylora Logo" className="logoImg" />
            <span className="logoText">
              <span className="logoZ">Z</span>ylora<span className="logoAI"> AI</span>
            </span>
          </div>
          <button id="start-over-btn" className={styles.startOverBtn} onClick={onStartOver}>
            ← Start Over
          </button>
        </div>

        {/* Page title */}
        <div className={styles.pageTitle}>
          <h1 className={styles.title}>Your Style Picks ✨</h1>
          <p className={styles.subtitle}>
            Personalised for <strong>{intakeData?.occasion}</strong> · {intakeData?.bodyType} build · {intakeData?.skinTone} skin · {intakeData?.budget}
          </p>
        </div>

        {/* Styling tip banner */}
        {results?.stylingTip && (
          <div className={styles.tipBanner}>
            <span className={styles.tipIcon}>💡</span>
            <div>
              <span className={styles.tipLabel}>Zylora's Styling Tip</span>
              <p className={styles.tipText}>{results.stylingTip}</p>
            </div>
          </div>
        )}

        {/* Outfit cards */}
        {results?.outfits?.length > 0 ? (
          <div className={styles.outfitGrid}>
            {(() => {
              const assignedImages = assignImages(results.outfits);
              return results.outfits.map((outfit, i) => (
                <OutfitCard key={i} outfit={outfit} index={i} imageUrl={assignedImages[i]} />
              ));
            })()}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No outfits were generated. Please try again.</p>
            <button className="btn-primary" onClick={onStartOver}>Try Again</button>
          </div>
        )}

        {/* Chat */}
        {results && (
          <ChatBox intakeData={intakeData} />
        )}
      </div>
    </div>
  );
}
