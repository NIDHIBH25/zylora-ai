import OutfitCard from './OutfitCard';
import ChatBox from './ChatBox';
import styles from './OutfitResults.module.css';

const images = [
  {
    id: 'saree',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    keywords: ['saree', 'sari', 'drape', 'silk saree', 'ethnic saree']
  },
  {
    id: 'kurta',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    keywords: ['kurta', 'kurtis', 'anarkali', 'salwar', 'sharara', 'ethnic suit', 'kurtas']
  },
  {
    id: 'lehenga',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    keywords: ['lehenga', 'choli', 'ghagra', 'ethnic lehenga', 'festive lehenga']
  },
  {
    id: 'athleisure',
    url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&auto=format&fit=crop&q=80',
    keywords: ['athleisure', 'tracksuit', 'joggers', 'activewear', 'sporty', 'sweatpants', 'hoodie', 'sneakers']
  },
  {
    id: 'denim_dress',
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&auto=format&fit=crop&q=80',
    keywords: ['denim dress', 'denim jacket', 'jean jacket', 'denim skirt', 'chambray']
  },
  {
    id: 'jeans_casual',
    url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    keywords: ['jeans', 'denim pants', 'denim trousers', 'casual pants', 'chinos']
  },
  {
    id: 'boho_maxi',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    keywords: ['maxi', 'skirt', 'bohemian', 'boho', 'tier', 'brunch', 'tee', 'maxi skirt']
  },
  {
    id: 'tshirt_casual',
    url: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&auto=format&fit=crop&q=80',
    keywords: ['t-shirt', 'tee', 'tshirt', 'casual top']
  },
  {
    id: 'floral_dress',
    url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
    keywords: ['dress', 'floral', 'summer dress', 'sundress', 'romantic', 'date']
  },
  {
    id: 'blazer_work',
    url: 'https://images.unsplash.com/photo-1548624149-f7b31668831a?w=600&auto=format&fit=crop&q=80',
    keywords: ['blazer', 'suit', 'jacket', 'pantsuit', 'workwear', 'office', 'corporate', 'formal']
  },
  {
    id: 'pants_work',
    url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80',
    keywords: ['trousers', 'pants', 'shirt', 'blouse', 'professional', 'smart casual', 'formal trousers']
  },
  {
    id: 'party_glam',
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80',
    keywords: ['party', 'glam', 'sequin', 'shimmer', 'metallic', 'cocktail', 'club']
  },
  {
    id: 'black_dress',
    url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    keywords: ['black dress', 'lbd', 'night out', 'party dress']
  },
  {
    id: 'coord_set',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    keywords: ['co-ord', 'matching', 'set', 'jumpsuit', 'romper', 'two-piece']
  },
  {
    id: 'warm_casual',
    url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
    keywords: ['sweater', 'cardigan', 'knit', 'jacket', 'winter', 'warm', 'pullover']
  }
];

const negativeKeywords = {
  saree: ['jeans', 'denim', 't-shirt', 'tee', 'shorts', 'athleisure', 'sneakers', 'blazer', 'trousers', 'pantsuit', 'joggers', 'hoodie', 'sporty', 'jacket', 'cardigan', 'sweater'],
  kurta: ['saree', 'jeans', 'blazer', 'pantsuit', 'athleisure', 'sneakers', 'shorts'],
  lehenga: ['saree', 'jeans', 'blazer', 'pantsuit', 'athleisure', 'sneakers', 'shorts'],
  athleisure: ['saree', 'kurta', 'lehenga', 'blazer', 'pantsuit', 'dress', 'skirt', 'blouse'],
  denim_dress: ['saree', 'kurta', 'lehenga', 'blazer', 'pantsuit', 'trousers'],
  jeans_casual: ['saree', 'kurta', 'lehenga', 'dress', 'skirt'],
  boho_maxi: ['saree', 'kurta', 'lehenga', 'blazer', 'pantsuit', 'jeans', 'trousers'],
  blazer_work: ['saree', 'kurta', 'lehenga', 'jeans', 'shorts', 'athleisure', 'sneakers'],
  party_glam: ['office', 'workwear', 'saree', 'kurta'],
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
