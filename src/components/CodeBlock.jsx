import { useState } from 'react';

// Simple syntax highlighter using regex replacements
function highlight(code) {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    // Escape HTML
    let safe = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Comments
    safe = safe.replace(/(\/\/.*$)/g, '<span class="comment">$1</span>');
    // Strings
    safe = safe.replace(/("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span class="string">$1</span>');
    // Annotations
    safe = safe.replace(/(@\w+)/g, '<span class="annot">$1</span>');
    // Keywords
    const kws = ['val', 'var', 'fun', 'class', 'object', 'data', 'sealed', 'open',
      'override', 'init', 'return', 'if', 'else', 'when', 'for', 'while',
      'null', 'true', 'false', 'this', 'is', 'as', 'by', 'in', 'out',
      'import', 'package', 'interface', 'companion', 'typealias', 'const'];
    kws.forEach(kw => {
      safe = safe.replace(new RegExp(`\\b(${kw})\\b(?![^<]*>)`, 'g'), '<span class="keyword">$1</span>');
    });
    // Types/classes (PascalCase)
    safe = safe.replace(/\b([A-Z][a-zA-Z0-9]+)\b(?![^<]*>)/g, '<span class="type">$1</span>');
    // Numbers
    safe = safe.replace(/\b(\d+)\b(?![^<]*>)/g, '<span class="number">$1</span>');

    return `<span style="display:block">${safe}</span>`;
  }).join('');
}

export function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="code-block overflow-hidden">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
          <span className="text-xs font-mono text-slate-500">{label}</span>
          <button onClick={copy} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  );
}
