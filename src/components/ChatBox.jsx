import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../utils/api';
import styles from './ChatBox.module.css';

const SUGGESTIONS = [
  'Make this more budget-friendly',
  'Suggest shoes for these outfits',
  'What jewellery should I pair?',
  'More casual alternatives?',
];

export default function ChatBox({ intakeData }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm Zylora 👋 I've just styled you for your ${intakeData?.occasion?.toLowerCase()} occasion. Ask me anything — budget adjustments, accessories, colour swaps, or anything else!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = async (text) => {
    const msg = text.trim();
    if (!msg || isTyping) return;

    const userMsg = { role: 'user', content: msg };
    const history = messages.filter(m => m.role !== 'system');

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const reply = await sendChatMessage(msg, history, intakeData);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const handleSuggestion = (s) => {
    send(s);
  };

  return (
    <section className={styles.wrapper} id="chat-section">
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <span className={styles.chatAvatar}>✨</span>
          <div>
            <p className={styles.chatName}>Zylora AI Stylist</p>
            <p className={styles.chatStatus}>Ask anything about your looks</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
            {m.role === 'assistant' && <span className={styles.msgAvatar}>✨</span>}
            <div className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
              {m.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.msg} ${styles.aiMsg}`}>
            <span className={styles.msgAvatar}>✨</span>
            <div className={`${styles.bubble} ${styles.aiBubble} ${styles.typingBubble}`}>
              <span className={styles.dot} style={{ animationDelay: '0s' }} />
              <span className={styles.dot} style={{ animationDelay: '0.18s' }} />
              <span className={styles.dot} style={{ animationDelay: '0.36s' }} />
            </div>
          </div>
        )}

        {error && <p className={styles.errorMsg}>⚠ {error}</p>}
        <div ref={endRef} />
      </div>

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} id={`suggestion-${i}`} className={styles.suggestionChip} onClick={() => handleSuggestion(s)} disabled={isTyping}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className={styles.inputRow}>
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Ask Zylora anything…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isTyping}
        />
        <button id="chat-send-btn" type="submit" className={styles.sendBtn} disabled={!input.trim() || isTyping}>
          →
        </button>
      </form>
    </section>
  );
}
