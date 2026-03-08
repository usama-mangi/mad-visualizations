import { motion } from 'framer-motion';

// ── Animated diagram for Topic 1 ──────────────────────────────────────────────
export function AndroidArchDiagram({ accent }) {
  const layers = [
    { label: 'System & User Apps', color: '#3b82f6', desc: 'Your app lives here' },
    { label: 'Java API Framework', color: '#6366f1', desc: 'Activity, View, Location managers' },
    { label: 'ART + Native Libraries', color: '#8b5cf6', desc: 'Android Runtime, OpenGL, SQLite' },
    { label: 'Hardware Abstraction Layer', color: '#a855f7', desc: 'Camera, Audio, Bluetooth HAL' },
    { label: 'Linux Kernel', color: '#c026d3', desc: 'Drivers, Memory, Networking' },
  ];

  return (
    <div className="space-y-2">
      {layers.map((l, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className="rounded-lg p-3 flex items-center justify-between"
          style={{ background: `${l.color}22`, border: `1px solid ${l.color}55` }}>
          <span className="font-semibold text-sm" style={{ color: l.color }}>{l.label}</span>
          <span className="text-xs text-slate-500">{l.desc}</span>
        </motion.div>
      ))}
      <div className="text-center text-xs text-slate-600 mt-2">↑ Higher abstraction  |  Lower level ↓</div>
    </div>
  );
}

// ── App Dev Process Flow ───────────────────────────────────────────────────────
export function AppDevProcess({ accent }) {
  const phases = [
    { icon: '🎯', title: 'Strategy', items: ['Identify users', 'Research competition', 'Select platform'] },
    { icon: '📋', title: 'Analysis', items: ['Use cases', 'Requirements', 'Roadmap'] },
    { icon: '🎨', title: 'UI/UX Design', items: ['Wireframes', 'Mockups', 'Prototype'] },
    { icon: '💻', title: 'Development', items: ['Architecture', 'Frontend', 'APIs'] },
    { icon: '🧪', title: 'Testing', items: ['Debug', 'QA', 'Fix issues'] },
    { icon: '🚀', title: 'Deployment', items: ['Sign APK', 'App store', 'Metadata'] },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {phases.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl p-3 text-center"
          style={{ background: '#1a1a2e', border: `1px solid ${accent}33` }}>
          <div className="text-2xl mb-1">{p.icon}</div>
          <div className="text-xs font-bold text-white mb-2">{p.title}</div>
          {p.items.map((item, j) => (
            <div key={j} className="text-xs text-slate-500">{item}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// ── Compose 3 Phases Diagram ──────────────────────────────────────────────────
export function ComposePhaseDiagram({ accent }) {
  const phases = [
    {
      num: '1', title: 'Composition', color: '#3b82f6',
      desc: '@Composable functions run, build UI tree describing what to show',
      icon: '🌳',
    },
    {
      num: '2', title: 'Layout', color: '#8b5cf6',
      desc: 'Each element is measured and placed at 2D coordinates',
      icon: '📐',
    },
    {
      num: '3', title: 'Drawing', color: '#ec4899',
      desc: 'Elements rendered onto the Canvas as pixels',
      icon: '🖌️',
    },
  ];

  return (
    <div className="space-y-3">
      {phases.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="flex items-start gap-4 p-4 rounded-xl"
          style={{ background: `${p.color}15`, border: `1px solid ${p.color}44` }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-lg shrink-0"
            style={{ background: p.color, color: '#fff' }}>
            {p.num}
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>{p.icon}</span> {p.title}
            </div>
            <p className="text-sm text-slate-400 mt-0.5">{p.desc}</p>
          </div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-center text-sm text-slate-500 py-2 rounded-lg"
        style={{ background: '#1a1a2e' }}>
        ↻ Recomposition: only re-runs affected @Composables when state changes
      </motion.div>
    </div>
  );
}

// ── State Hoisting Diagram ────────────────────────────────────────────────────
export function StateHoistingDiagram({ accent }) {
  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl text-center" style={{ background: '#1a2030', border: '1px solid #3b82f633' }}>
        <div className="text-sm font-bold text-blue-400 mb-1">📦 Parent Composable</div>
        <div className="text-xs font-mono text-slate-400 bg-black/30 rounded p-2">
          var text by remember {'{'} mutableStateOf("") {'}'}
        </div>
        <div className="mt-2 flex justify-center gap-6 text-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="text-emerald-400 font-semibold">state (value)</span>
            <span className="text-2xl">↓</span>
            <span className="text-slate-500">flows DOWN</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-pink-400 font-semibold">event (onValueChange)</span>
            <span className="text-2xl">↑</span>
            <span className="text-slate-500">flows UP</span>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl text-center" style={{ background: '#1a201a', border: '1px solid #10b98133' }}>
        <div className="text-sm font-bold text-emerald-400 mb-1">🧩 Child Composable (Stateless)</div>
        <div className="text-xs font-mono text-slate-400 bg-black/30 rounded p-2">
          fun Input(value: String, onValueChange: (String) -{'>'} Unit)
        </div>
        <div className="text-xs text-slate-500 mt-2">No internal state — pure function of inputs</div>
      </div>
      <div className="text-xs text-slate-500 text-center p-2 rounded-lg" style={{ background: '#1a1a2e' }}>
        ✅ Benefits: testable, reusable, predictable, previewable
      </div>
    </div>
  );
}

// ── Navigation Flow Diagram ───────────────────────────────────────────────────
export function NavigationFlowDiagram({ accent }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {['Home Screen', 'Detail Screen', 'Profile Screen'].map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl text-center text-xs font-semibold"
            style={{ background: `${accent}22`, border: `2px solid ${accent}66`, color: accent }}>
            📱 {s}
          </motion.div>
        ))}
      </div>
      <div className="p-4 rounded-xl space-y-2" style={{ background: '#1a1a2e', border: '1px solid #2d2d4e' }}>
        <div className="text-xs font-bold text-slate-300">NavHost (Container)</div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded" style={{ background: `${accent}33`, color: accent }}>NavController</span>
          <span className="text-slate-600">tracks back stack &amp; current destination</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>navigate("detail/42")</span>
          <span>→</span>
          <span>popBackStack()</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-lg" style={{ background: '#1a2030', border: '1px solid #3b82f633' }}>
          <div className="font-bold text-blue-400 mb-1">Explicit Intent</div>
          <div className="text-slate-500">Intent(this, Target::class.java)</div>
          <div className="text-slate-600 mt-1">Exact destination</div>
        </div>
        <div className="p-3 rounded-lg" style={{ background: '#1a201a', border: '1px solid #10b98133' }}>
          <div className="font-bold text-emerald-400 mb-1">Implicit Intent</div>
          <div className="text-slate-500">Intent(ACTION_VIEW)</div>
          <div className="text-slate-600 mt-1">OS finds handler</div>
        </div>
      </div>
    </div>
  );
}

// ── Null Safety Diagram ───────────────────────────────────────────────────────
export function NullSafetyDiagram({ accent }) {
  const examples = [
    { op: 'name?.length', label: 'Safe Call ?.' , desc: 'Returns null instead of crash', color: '#10b981' },
    { op: 'name ?: "default"', label: 'Elvis ?:', desc: 'Fallback if null', color: '#3b82f6' },
    { op: 'name!!', label: 'Non-null Assert !!', desc: 'Force — throws if null', color: '#ef4444' },
    { op: 'val x = v as? Int', label: 'Safe Cast as?', desc: 'Returns null if fails', color: '#f59e0b' },
  ];
  return (
    <div className="grid grid-cols-1 gap-2">
      {examples.map((e, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ background: `${e.color}15`, border: `1px solid ${e.color}44` }}>
          <code className="text-sm font-mono shrink-0" style={{ color: e.color }}>{e.op}</code>
          <div>
            <div className="text-xs font-bold text-white">{e.label}</div>
            <div className="text-xs text-slate-500">{e.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
