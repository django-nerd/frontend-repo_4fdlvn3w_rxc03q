import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/40 to-blue-50">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded bg-indigo-600 text-white grid place-items-center font-bold">AI</div>
            <span className="font-semibold text-gray-800 text-lg">Flames Writer</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#how" className="hover:text-gray-900">How it works</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
            <a href="/test" className="hover:text-gray-900">Status</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/app" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Open Editor</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -left-20 h-80 w-80 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-72 w-72 bg-blue-200/50 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Write faster. Sound smarter. Stay private.
            </h1>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              An AI‑powered word processor with on‑device analysis, summarization, rewriting, and title ideas.
              No external AI calls. Your words stay yours.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/app" className="px-5 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow">
                Start writing
              </Link>
              <a href="#features" className="px-5 py-3 rounded-md bg-white text-gray-800 font-medium border border-gray-200 hover:bg-gray-50 shadow-sm">
                Explore features
              </a>
            </div>
            <p className="mt-3 text-sm text-gray-500">Runs in your browser with a lean, rule‑based assistant.</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="p-3 border-b bg-gray-50 text-xs text-gray-600">Preview</div>
            <div className="p-4">
              <div className="h-64 md:h-72 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-dashed border-indigo-200 grid place-items-center text-indigo-700 text-sm">
                Minimal, distraction‑free editor with live stats, summary pane, and one‑click rewrites.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Everything you need to polish your prose</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Feature title="Live insights" desc="Word count, readability, syllables, and reading time as you type."/>
          <Feature title="Smart summaries" desc="Frequency‑based sentence ranking for quick overviews."/>
          <Feature title="One‑click rewrites" desc="Simplify, elaborate, or switch tone between formal and casual."/>
          <Feature title="Title ideas" desc="Keyword‑aware suggestions to headline your draft."/>
          <Feature title="Private by design" desc="No external AI calls — your text stays on device."/>
          <Feature title="Fast & lightweight" desc="Rule‑based logic for instant results and zero vendor lock‑in."/>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How it works</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li>Open the editor and paste or type your draft.</li>
              <li>Use Analyze for instant stats and readability scores.</li>
              <li>Summarize with a length slider to condense key points.</li>
              <li>Rewrite with Simplify, Elaborate, or adjust tone.</li>
              <li>Grab a title idea and keep moving.</li>
            </ol>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Why it’s different</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Works instantly — no API keys or accounts needed.</li>
              <li>• Predictable, explainable results with rule‑based methods.</li>
              <li>• Built for focus: clean UI, no distractions.</li>
            </ul>
            <div className="mt-6">
              <Link to="/app" className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Try the editor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h3>
        <div className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-200">
          <Faq q="Does it use external AI services?" a="No. All features are implemented with efficient, local, rule‑based algorithms." />
          <Faq q="Can I use it offline?" a="The core features run in your browser. Some actions like health checks may need network access." />
          <Faq q="Will my text be stored?" a="No account is required and your text stays in your session unless you choose to save it in a future update." />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h4 className="text-2xl md:text-3xl font-extrabold text-gray-900">Ready to write better, faster?</h4>
          <p className="mt-2 text-gray-700">Jump straight into the editor — it’s free and private.</p>
          <Link to="/app" className="mt-6 inline-block px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Open the Editor</Link>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Flames Writer — Built with a rule‑based assistant. No external AI calls.
      </footer>
    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-700 mt-1 text-sm">{desc}</p>
    </div>
  )
}

function Faq({ q, a }) {
  return (
    <details className="group p-5">
      <summary className="cursor-pointer list-none font-medium text-gray-900 flex items-center justify-between">
        {q}
        <span className="ml-3 text-gray-400 group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <p className="mt-2 text-gray-700 text-sm leading-relaxed">{a}</p>
    </details>
  )
}
