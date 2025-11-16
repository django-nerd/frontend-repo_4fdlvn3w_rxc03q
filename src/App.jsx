import { useEffect, useMemo, useRef, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Spinner({ size = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin ${size} text-white`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  )
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col p-3 bg-white/60 rounded border border-gray-200">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-gray-800">{value}</span>
    </div>
  )
}

export default function App() {
  const [title, setTitle] = useState('Untitled Document')
  const [text, setText] = useState('Write something and let AI help you…')
  const [loading, setLoading] = useState({ summarize: false, analyze: false, rewrite: false, titles: false })
  const [stats, setStats] = useState(null)
  const [summary, setSummary] = useState('')
  const [mode, setMode] = useState('simplify')
  const [titleIdeas, setTitleIdeas] = useState([])
  const [maxSentences, setMaxSentences] = useState(3)

  const canRun = text.trim().length > 0

  const callApi = async (path, body) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  }

  const handleAnalyze = async () => {
    if (!canRun) return
    setLoading(l => ({ ...l, analyze: true }))
    try {
      const data = await callApi('/api/analyze', { text })
      setStats(data.stats)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(l => ({ ...l, analyze: false }))
    }
  }

  const handleSummarize = async () => {
    if (!canRun) return
    setLoading(l => ({ ...l, summarize: true }))
    try {
      const data = await callApi('/api/summarize', { text, max_sentences: maxSentences })
      setSummary(data.summary)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(l => ({ ...l, summarize: false }))
    }
  }

  const handleRewrite = async () => {
    if (!canRun) return
    setLoading(l => ({ ...l, rewrite: true }))
    try {
      const data = await callApi('/api/rewrite', { text, mode })
      setText(data.result)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(l => ({ ...l, rewrite: false }))
    }
  }

  const handleTitleIdeas = async () => {
    setLoading(l => ({ ...l, titles: true }))
    try {
      const data = await callApi('/api/titles', { text })
      setTitleIdeas(data.titles)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(l => ({ ...l, titles: false }))
    }
  }

  useEffect(() => {
    // Auto analyze when text changes with debounce
    const t = setTimeout(() => {
      if (text.trim()) handleAnalyze()
    }, 500)
    return () => clearTimeout(t)
  }, [text])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-indigo-600 text-white grid place-items-center font-bold">AI</div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-1 text-xl md:text-2xl font-semibold bg-transparent outline-none placeholder:text-gray-400"
            placeholder="Untitled Document"
          />
          <div className="flex items-center gap-2">
            <button onClick={handleTitleIdeas} className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-50">
              {loading.titles ? <div className="flex items-center gap-2"><Spinner /><span>Ideas</span></div> : 'Title Ideas'}
            </button>
            <a href="/test" className="px-3 py-1.5 rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300">Check Backend</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Editor */}
        <section className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-3 border-b bg-gray-50 flex flex-wrap items-center gap-2">
            <select value={mode} onChange={e => setMode(e.target.value)} className="px-3 py-1.5 rounded border text-sm">
              <option value="simplify">Simplify</option>
              <option value="expand">Expand</option>
              <option value="tone_formal">Tone: Formal</option>
              <option value="tone_casual">Tone: Casual</option>
            </select>
            <button onClick={handleRewrite} disabled={!canRun || loading.rewrite} className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-50">
              {loading.rewrite ? <div className="flex items-center gap-2"><Spinner /><span>Rewriting…</span></div> : 'Rewrite' }
            </button>
            <div className="h-6 w-px bg-gray-300 mx-1" />
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Summary length</label>
              <input type="range" min={1} max={7} value={maxSentences} onChange={e => setMaxSentences(Number(e.target.value))} />
              <span className="text-sm w-6 text-center">{maxSentences}</span>
            </div>
            <button onClick={handleSummarize} disabled={!canRun || loading.summarize} className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50">
              {loading.summarize ? <div className="flex items-center gap-2"><Spinner /><span>Summarizing…</span></div> : 'Summarize'}
            </button>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full min-h-[55vh] p-4 outline-none resize-none text-gray-800"
            placeholder="Start typing here…"
          />

          {summary && (
            <div className="border-t bg-indigo-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-indigo-900">AI Summary</h3>
                <button className="text-xs text-indigo-700 hover:underline" onClick={() => setSummary('')}>Clear</button>
              </div>
              <p className="text-indigo-900/90 leading-relaxed whitespace-pre-wrap">{summary}</p>
            </div>
          )}
        </section>

        {/* Insights */}
        <aside className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Document Insights</h3>
              <button onClick={handleAnalyze} className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Refresh</button>
            </div>
            {stats ? (
              <div className="grid grid-cols-2 gap-2">
                <Stat label="Words" value={stats.words} />
                <Stat label="Sentences" value={stats.sentences} />
                <Stat label="Characters" value={stats.characters} />
                <Stat label="Syllables" value={stats.syllables} />
                <Stat label="Flesch" value={stats.flesch_reading_ease} />
                <Stat label="Grade" value={stats.flesch_kincaid_grade} />
                <Stat label="Read time" value={`${stats.reading_time_minutes}m`} />
              </div>
            ) : (
              <p className="text-sm text-gray-500">Type to see live stats.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Title Ideas</h3>
            <div className="flex flex-wrap gap-2">
              {titleIdeas.length === 0 ? (
                <button onClick={handleTitleIdeas} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">Generate</button>
              ) : (
                titleIdeas.map((t, i) => (
                  <button key={i} onClick={() => setTitle(t)} className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs text-left">
                    {t}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Action label="Make concise" onClick={() => { setMode('simplify'); handleRewrite() }} />
              <Action label="Elaborate" onClick={() => { setMode('expand'); handleRewrite() }} />
              <Action label="More formal" onClick={() => { setMode('tone_formal'); handleRewrite() }} />
              <Action label="More casual" onClick={() => { setMode('tone_casual'); handleRewrite() }} />
            </div>
          </div>
        </aside>
      </main>

      <footer className="py-8 text-center text-xs text-gray-500">
        Built with an on-device rule-based assistant. No external AI calls are made.
      </footer>
    </div>
  )
}

function Action({ label, onClick }) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">
      {label}
    </button>
  )
}
