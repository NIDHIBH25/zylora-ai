import OutfitCard from './OutfitCard';
import ChatBox from './ChatBox';
import styles from './OutfitResults.module.css';

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
            {results.outfits.map((outfit, i) => (
              <OutfitCard key={i} outfit={outfit} index={i} />
            ))}
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
