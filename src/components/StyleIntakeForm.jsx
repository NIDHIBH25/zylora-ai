import { useState } from 'react';
import styles from './StyleIntakeForm.module.css';

const GENDERS    = ['Women', 'Men', 'Non-binary'];
const BODY_TYPES = ['Petite', 'Athletic', 'Curvy', 'Tall', 'Plus'];
const SKIN_TONES = [
  { label: 'Fair',   color: '#FDDCCA' },
  { label: 'Light',  color: '#F5C5A3' },
  { label: 'Medium', color: '#E8A87C' },
  { label: 'Tan',    color: '#C68642' },
  { label: 'Deep',   color: '#7B4A2E' },
];
const OCCASIONS = [
  { key: 'Casual',   icon: '👕', desc: 'Everyday errands & hangouts' },
  { key: 'Work',     icon: '💼', desc: 'Office & professional settings' },
  { key: 'Party',    icon: '🎉', desc: 'Night out & celebrations' },
  { key: 'Date',     icon: '💕', desc: 'Romantic evenings' },
  { key: 'Festive',  icon: '✨', desc: 'Weddings, Diwali & special events' },
];
const BUDGETS = ['Under ₹2,000', '₹2,000–₹5,000', '₹5,000–₹10,000', 'Above ₹10,000'];

export default function StyleIntakeForm({ onSubmit, onBack }) {
  const [form, setForm] = useState({
    gender: '', bodyType: '', skinTone: '', occasion: '',
    budget: '', stylePreferences: '',
  });
  const [touched, setTouched] = useState(false);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const isComplete = form.gender && form.bodyType && form.skinTone && form.occasion && form.budget;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isComplete) return;
    onSubmit(form);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={onBack} id="back-btn">← Back</button>
          <div className="logoContainer">
            <img src="/logo.png" alt="Zylora Logo" className="logoImg" />
            <span className="logoText">
              <span className="logoZ">Z</span>ylora<span className="logoAI"> AI</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} id="style-intake-form">
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Tell us about your style</h1>
            <p className={styles.subtitle}>
              Answer a few quick questions so Zylora can build looks that are truly yours.
            </p>
          </div>

          {/* Gender */}
          <Field label="Gender Preference" required touched={touched} filled={!!form.gender}>
            <div className={styles.toggleRow}>
              {GENDERS.map(g => (
                <button id={`gender-${g.toLowerCase().replace('-','')}`}
                  type="button" key={g}
                  className={`${styles.toggleBtn} ${form.gender === g ? styles.active : ''}`}
                  onClick={() => set('gender', g)}>
                  {g}
                </button>
              ))}
            </div>
          </Field>

          {/* Body Type */}
          <Field label="Body Type" required touched={touched} filled={!!form.bodyType}>
            <div className={styles.toggleRow}>
              {BODY_TYPES.map(b => (
                <button id={`body-${b.toLowerCase()}`}
                  type="button" key={b}
                  className={`${styles.toggleBtn} ${form.bodyType === b ? styles.active : ''}`}
                  onClick={() => set('bodyType', b)}>
                  {b}
                </button>
              ))}
            </div>
          </Field>

          {/* Skin Tone */}
          <Field label="Skin Tone" required touched={touched} filled={!!form.skinTone}>
            <div className={styles.swatchRow}>
              {SKIN_TONES.map(s => (
                <button id={`skin-${s.label.toLowerCase()}`}
                  type="button" key={s.label}
                  title={s.label}
                  className={`${styles.swatchBtn} ${form.skinTone === s.label ? styles.swatchActive : ''}`}
                  onClick={() => set('skinTone', s.label)}>
                  <span className={styles.swatchCircle} style={{ background: s.color }} />
                  <span className={styles.swatchLabel}>{s.label}</span>
                </button>
              ))}
            </div>
          </Field>

          {/* Occasion */}
          <Field label="Occasion" required touched={touched} filled={!!form.occasion}>
            <div className={styles.occasionGrid}>
              {OCCASIONS.map(o => (
                <button id={`occasion-${o.key.toLowerCase()}`}
                  type="button" key={o.key}
                  className={`${styles.occasionCard} ${form.occasion === o.key ? styles.occasionActive : ''}`}
                  onClick={() => set('occasion', o.key)}>
                  <span className={styles.occasionIcon}>{o.icon}</span>
                  <span className={styles.occasionKey}>{o.key}</span>
                  <span className={styles.occasionDesc}>{o.desc}</span>
                </button>
              ))}
            </div>
          </Field>

          {/* Budget */}
          <Field label="Budget Range" required touched={touched} filled={!!form.budget}>
            <div className={styles.toggleRow}>
              {BUDGETS.map(b => (
                <button id={`budget-${b.replace(/[₹,\s–]/g,'').toLowerCase()}`}
                  type="button" key={b}
                  className={`${styles.toggleBtn} ${form.budget === b ? styles.active : ''}`}
                  onClick={() => set('budget', b)}>
                  {b}
                </button>
              ))}
            </div>
          </Field>

          {/* Style Preferences */}
          <Field label="Style Preferences" sublabel="(Optional — describe your vibe or any brands you love)">
            <textarea
              id="style-preferences-input"
              className={styles.textarea}
              rows={3}
              placeholder="e.g. I love earthy tones and flowy silhouettes. Prefer Indian wear for festive occasions…"
              value={form.stylePreferences}
              onChange={e => set('stylePreferences', e.target.value)}
            />
          </Field>

          {touched && !isComplete && (
            <p className={styles.validationMsg}>⚠ Please fill in all required fields above.</p>
          )}

          <button id="submit-style-form" type="submit" className={styles.submitBtn}>
            ✨ Generate My Outfits
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, sublabel, required, touched, filled, children }) {
  const showError = required && touched && !filled;
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
        {required && <span className={styles.req}>*</span>}
        {showError && <span className={styles.fieldError}>Required</span>}
      </label>
      {children}
    </div>
  );
}
