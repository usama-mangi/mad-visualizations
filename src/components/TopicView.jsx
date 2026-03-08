import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardDeck } from './Flashcard';
import { Quiz } from './Quiz';
import { CodeBlock } from './CodeBlock';
import {
  AndroidArchDiagram, AppDevProcess,
  ComposePhaseDiagram, StateHoistingDiagram,
  NavigationFlowDiagram, NullSafetyDiagram,
} from './Diagrams';
import { BookOpen, Layers, HelpCircle, CheckCircle } from 'lucide-react';

const TABS = [
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
];

const MEGA_TABS = [
  { id: 'learn', label: 'About', icon: BookOpen },
  { id: 'flashcards', label: 'Key Facts', icon: Layers },
  { id: 'quiz', label: '20-Q Quiz', icon: HelpCircle },
];

function getDiagram(topicId, conceptTitle, accent) {
  if (topicId === 1) {
    if (conceptTitle.includes('Architecture')) return <AndroidArchDiagram accent={accent} />;
    if (conceptTitle.includes('Process')) return <AppDevProcess accent={accent} />;
  }
  if (topicId === 4 && conceptTitle.includes('Phase')) return <ComposePhaseDiagram accent={accent} />;
  if (topicId === 5 && conceptTitle.includes('Hoist')) return <StateHoistingDiagram accent={accent} />;
  if (topicId === 6 && (conceptTitle.includes('Flow') || conceptTitle.includes('Navigation'))) return <NavigationFlowDiagram accent={accent} />;
  if (topicId === 2 && conceptTitle.includes('Null')) return <NullSafetyDiagram accent={accent} />;
  return null;
}

export function TopicView({ topic, onComplete, completed }) {
  const [activeTab, setActiveTab] = useState('learn');
  const [expandedConcept, setExpandedConcept] = useState(0);

  const { accent } = topic;
  const tabs = topic.id === 99 ? MEGA_TABS : TABS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${accent}22, transparent)`, border: `1px solid ${accent}44` }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-4xl mb-2">{topic.emoji}</div>
            <h2 className="text-2xl font-black text-white">{topic.title}</h2>
            {topic.description && (
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{topic.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {topic.subtopics.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          {completed && topic.id !== 99 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: '#064e3b', color: '#10b981', border: '1px solid #10b98144' }}>
              <CheckCircle size={13} /> Done
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#12121f' }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: activeTab === id ? accent : 'transparent',
              color: activeTab === id ? '#fff' : '#64748b',
            }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-3">
            {topic.concepts.map((concept, i) => {
              const isOpen = expandedConcept === i;
              const diagram = getDiagram(topic.id, concept.title, accent);
              return (
                <div key={i} className="rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${isOpen ? accent + '66' : '#2d2d4e'}`, background: '#12121f' }}>
                  <button onClick={() => setExpandedConcept(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between p-4 text-left transition-all hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: isOpen ? accent : `${accent}33`, color: isOpen ? '#fff' : accent }}>
                        {i + 1}
                      </div>
                      <span className="font-semibold text-white text-sm">{concept.title}</span>
                    </div>
                    <span className="text-slate-500 text-lg">{isOpen ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-3">
                          {concept.body && (
                            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{concept.body}</p>
                          )}
                          {concept.code && <CodeBlock code={concept.code} label="Kotlin" />}
                          {diagram && (
                            <div className="mt-3">
                              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Diagram</div>
                              {diagram}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {!completed && topic.id !== 99 && (
              <button onClick={onComplete}
                className="w-full py-3 rounded-xl font-bold transition-all hover:opacity-90 mt-4"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}>
                ✅ Mark Topic as Complete
              </button>
            )}
          </motion.div>
        )}

        {activeTab === 'flashcards' && (
          <motion.div key="fc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <FlashcardDeck cards={topic.flashcards} accent={accent} />
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Quiz questions={topic.quiz} accent={accent} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
