import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allTopics } from './data/topics-extra';
import { notebookQuiz } from './data/topics-extra';
import { TopicView } from './components/TopicView';
import { GraduationCap, Menu, X, CheckCircle } from 'lucide-react';
import './index.css';

const STORAGE_KEY = 'mad_study_progress';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

export default function App() {
  const [activeTopic, setActiveTopic] = useState(allTopics[0]);
  const [completed, setCompleted] = useState(loadProgress);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  function markComplete(topicId) {
    setCompleted((c) => ({ ...c, [topicId]: true }));
  }

  const totalDone = Object.keys(completed).length;
  const pct = Math.round((totalDone / allTopics.length) * 100);

  const allNav = [...allTopics, notebookQuiz];

  return (
    <div className="min-h-screen flex" style={{ background: '#0f0f1a' }}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed md:relative z-30 h-screen overflow-y-auto flex-shrink-0"
            style={{ width: 260, background: '#0a0a14', borderRight: '1px solid #1e1e2e' }}>

            {/* Brand */}
            <div className="p-5 border-b" style={{ borderColor: '#1e1e2e' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <GraduationCap size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">MAD Study</div>
                  <div className="text-xs text-slate-500">CSC-455 Midterm</div>
                </div>
              </div>
              {/* Overall progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Overall Progress</span>
                  <span className="text-indigo-400">{pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs text-slate-600 mt-1">{totalDone}/{allTopics.length} topics done</div>
              </div>
            </div>

            {/* Topic List */}
            <nav className="p-3 space-y-1">
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 pb-1 pt-1">Topics</div>
              {allTopics.map((topic) => {
                const isActive = activeTopic.id === topic.id;
                const isDone = completed[topic.id];
                return (
                  <button key={topic.id}
                    onClick={() => { setActiveTopic(topic); if (window.innerWidth < 768) setSidebarOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: isActive ? `${topic.accent}22` : 'transparent',
                      border: `1px solid ${isActive ? topic.accent + '55' : 'transparent'}`,
                    }}>
                    <span className="text-xl">{topic.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: isActive ? topic.accent : '#94a3b8' }}>
                        {topic.title}
                      </div>
                      <div className="text-xs text-slate-600">Topic {topic.id}</div>
                    </div>
                    {isDone && <CheckCircle size={14} className="shrink-0 text-emerald-500" />}
                  </button>
                );
              })}
              {/* Mega Quiz */}
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2 pb-1 pt-3">Exam Prep</div>
              <button
                onClick={() => { setActiveTopic(notebookQuiz); if (window.innerWidth < 768) setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: activeTopic.id === 99 ? '#f59e0b22' : 'transparent',
                  border: `1px solid ${activeTopic.id === 99 ? '#f59e0b55' : 'transparent'}`,
                }}>
                <span className="text-xl">{notebookQuiz.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: activeTopic.id === 99 ? '#f59e0b' : '#94a3b8' }}>
                    {notebookQuiz.title}
                  </div>
                  <div className="text-xs text-slate-600">20 questions from notebook</div>
                </div>
              </button>
            </nav>

            {/* Exam tip */}
            <div className="p-4 m-3 rounded-xl text-xs" style={{ background: '#1a1a2e', border: '1px solid #2d2d4e' }}>
              <div className="font-bold text-indigo-400 mb-1">💡 Exam Tip</div>
              <p className="text-slate-500 leading-relaxed">Use flashcards for definitions and quiz to test yourself. Aim for 80%+ on each quiz before moving on.</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3"
          style={{ background: '#0f0f1aee', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e1e2e' }}>
          <button onClick={() => setSidebarOpen((o) => !o)}
            className="p-2 rounded-lg transition-colors hover:bg-white/5">
            {sidebarOpen ? <X size={18} className="text-slate-400" /> : <Menu size={18} className="text-slate-400" />}
          </button>
          <div>
            <div className="text-sm font-bold text-white">{activeTopic.emoji} {activeTopic.title}</div>
            <div className="text-xs text-slate-500">{activeTopic.id === 99 ? 'Notebook Mega Quiz' : `Topic ${activeTopic.id} of ${allTopics.length}`}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {activeTopic.id > 1 && activeTopic.id !== 99 && (
              <button
                onClick={() => setActiveTopic(allTopics[activeTopic.id - 2])}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
                style={{ background: '#1a1a2e' }}>
                ← Prev
              </button>
            )}
            {activeTopic.id < allTopics.length && activeTopic.id !== 99 && (
              <button
                onClick={() => setActiveTopic(allTopics[activeTopic.id])}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: activeTopic.accent, color: '#fff' }}>
                Next →
              </button>
            )}
            {activeTopic.id !== 99 && (
              <button
                onClick={() => setActiveTopic(notebookQuiz)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: '#f59e0b22', border: '1px solid #f59e0b55', color: '#f59e0b' }}>
                🏆 Mega Quiz
              </button>
            )}
          </div>
        </div>

        {/* Topic content */}
        <div className="p-4 md:p-6 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTopic.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}>
              <TopicView
                topic={activeTopic}
                completed={!!completed[activeTopic.id]}
                onComplete={() => markComplete(activeTopic.id)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
