import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export function Quiz({ questions, accent }) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState([]);

  const q = questions[qIdx];

  function choose(optIdx) {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = optIdx === q.answer;
    if (correct) setScore((s) => s + 1);
    setHistory((h) => [...h, { correct, question: q.q }]);
  }

  function next() {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
    }
  }

  function restart() {
    setQIdx(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setHistory([]);
  }

  const pct = Math.round((score / questions.length) * 100);

  if (done) {
    return (
      <div className="text-center space-y-4">
        <div className="text-5xl font-black" style={{ color: pct >= 60 ? '#10b981' : '#ef4444' }}>
          {pct}%
        </div>
        <p className="text-lg text-white font-semibold">
          {score}/{questions.length} correct
        </p>
        <p className="text-slate-400 text-sm">
          {pct >= 80 ? '🌟 Excellent! You\'re ready for the exam.' :
           pct >= 60 ? '📖 Good effort! Review the wrong answers.' :
           '💪 Keep studying! Review the material again.'}
        </p>
        <div className="space-y-2 text-left mt-4">
          {history.map((h, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg text-sm"
              style={{ background: h.correct ? '#064e3b' : '#450a0a', border: `1px solid ${h.correct ? '#10b981' : '#ef4444'}33` }}>
              {h.correct ? <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" /> : <XCircle size={14} className="mt-0.5 shrink-0 text-red-400" />}
              <span className="text-slate-300">{h.question}</span>
            </div>
          ))}
        </div>
        <button onClick={restart}
          className="w-full py-3 rounded-xl font-semibold mt-4 transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}aa)` }}>
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex justify-between text-sm text-slate-400">
        <span>Question {qIdx + 1} of {questions.length}</span>
        <span style={{ color: accent }}>Score: {score}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill"
          style={{ width: `${((qIdx) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${accent}, ${accent}99)` }} />
      </div>

      {/* Question */}
      <div className="p-5 rounded-xl" style={{ background: '#1a1a2e', border: `1px solid ${accent}33` }}>
        <p className="text-white font-semibold text-base leading-relaxed">{q.q}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (selected !== null) {
            if (i === q.answer) cls += ' quiz-correct';
            else if (i === selected && i !== q.answer) cls += ' quiz-wrong';
          }
          return (
            <div key={i} onClick={() => choose(i)}
              className={`${cls} p-4 rounded-xl border text-sm font-medium`}
              style={{ border: '1px solid #2d2d4e', background: '#12121f', color: '#e2e8f0' }}>
              <span className="text-slate-500 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl text-sm leading-relaxed"
            style={{ background: '#1a2030', border: '1px solid #2d3748', color: '#94a3b8' }}>
            <span className="font-semibold text-slate-300">💡 </span>{q.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {selected !== null && (
        <button onClick={next}
          className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}aa)` }}>
          {qIdx + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
