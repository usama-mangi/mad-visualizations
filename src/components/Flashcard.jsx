import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, RotateCcw } from 'lucide-react';

export function FlashcardDeck({ cards, accent }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState(new Set());

  const card = cards[idx];
  const masteredCount = mastered.size;

  function next() {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % cards.length), 150);
  }
  function prev() {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i - 1 + cards.length) % cards.length), 150);
  }
  function toggleMastered() {
    setMastered((m) => {
      const s = new Set(m);
      s.has(idx) ? s.delete(idx) : s.add(idx);
      return s;
    });
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{idx + 1} / {cards.length}</span>
        <span style={{ color: accent }}>{masteredCount} mastered</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((idx + 1) / cards.length) * 100}%`, background: `linear-gradient(90deg, ${accent}, ${accent}99)` }} />
      </div>

      {/* Card */}
      <div
        className="card-flip w-full cursor-pointer select-none"
        style={{ height: 220 }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="card-face flex flex-col items-center justify-center p-6 text-center"
            style={{ background: '#1a1a2e', border: `2px solid ${accent}33` }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Question</div>
            <p className="text-lg font-medium text-white leading-relaxed">{card.q}</p>
            <div className="mt-4 text-xs text-slate-500">Click to reveal answer</div>
          </div>
          {/* Back */}
          <div className="card-face card-back flex flex-col items-center justify-center p-6 text-center"
            style={{ background: '#0d1f1a', border: `2px solid ${accent}` }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Answer</div>
            <p className="text-base text-white leading-relaxed">{card.a}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={prev}
          className="flex-1 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{ background: '#1a1a2e', border: '1px solid #2d2d4e', color: '#94a3b8' }}>
          ← Prev
        </button>
        <button onClick={toggleMastered}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ background: mastered.has(idx) ? `${accent}22` : '#1a1a2e', border: `1px solid ${mastered.has(idx) ? accent : '#2d2d4e'}`, color: mastered.has(idx) ? accent : '#94a3b8' }}>
          {mastered.has(idx) ? <CheckCircle size={14} /> : <Circle size={14} />}
          {mastered.has(idx) ? 'Mastered' : 'Mark'}
        </button>
        <button onClick={next}
          className="flex-1 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{ background: '#1a1a2e', border: '1px solid #2d2d4e', color: '#94a3b8' }}>
          Next →
        </button>
      </div>

      {masteredCount === cards.length && (
        <div className="text-center py-3 rounded-xl text-sm font-semibold" style={{ background: `${accent}22`, color: accent }}>
          🎉 All cards mastered! Great work!
        </div>
      )}
    </div>
  );
}
