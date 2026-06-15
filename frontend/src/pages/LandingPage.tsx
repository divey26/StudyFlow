import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Link2,
  Network,
  Route,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'AI Study Maps',
    icon: Sparkles,
    text: 'Start with a topic and let AI shape it into a clear study structure.',
    accent: 'bg-indigo-600',
  },
  {
    title: 'Source To Structure',
    icon: Link2,
    text: 'Paste a URL, YouTube link, or notes and turn the key ideas into connected nodes.',
    accent: 'bg-cyan-600',
  },
  {
    title: 'Visual Learning Canvas',
    icon: Network,
    text: 'Move, connect, expand, and organize concepts on a fast React Flow canvas.',
    accent: 'bg-emerald-600',
  },
  {
    title: 'Clean Auto Layout',
    icon: LayoutDashboard,
    text: 'Rearrange messy study material into a readable path with one click.',
    accent: 'bg-amber-500',
  },
  {
    title: 'Export Your Work',
    icon: FileText,
    text: 'Save your study map as PNG or structured JSON whenever you need it.',
    accent: 'bg-rose-600',
  },
  {
    title: 'Learning Roadmaps',
    icon: Route,
    text: 'Break large skills into topics, tasks, resources, and notes you can actually follow.',
    accent: 'bg-violet-600',
  },
];

const steps = [
  { label: 'Enter a topic or paste a source', icon: Link2 },
  { label: 'AI extracts the important ideas', icon: Sparkles },
  { label: 'Shape the flow on the canvas', icon: Workflow },
  { label: 'Export or keep building', icon: FileText },
];

const stats = [
  { value: 'Gemini AI', label: 'Generation' },
  { value: 'React Flow', label: 'Canvas' },
  { value: 'Study Maps', label: 'Output' },
  { value: 'Roadmaps', label: 'Planning' },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <GraduationCap size={21} />
          </span>
          <span className="text-xl font-bold tracking-tight">StudyFlow</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 sm:block"
          >
            Sign In
          </Link>
          <Link to="/register">
            <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
              Start Free
            </button>
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:pb-20 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm">
            <Sparkles size={14} />
            AI-powered study planning
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Turn any topic into a visual learning path.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            StudyFlow turns topics, links, videos, and notes into editable study maps so you can learn with direction,
            not scattered tabs.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/register">
              <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                Build My Flow <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/login">
              <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
                View Demo
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BookOpenCheck size={17} className="text-indigo-600" />
                Full Stack Developer Flow
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Live
              </span>
            </div>

            <div className="relative h-80 overflow-hidden bg-slate-50">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                  backgroundSize: '26px 26px',
                }}
              />
              <svg className="absolute inset-0 h-full w-full text-slate-300" aria-hidden>
                <path d="M320 62 C240 92 190 118 142 148" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M360 64 C440 94 494 118 548 152" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M146 178 C156 218 194 246 238 264" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M548 180 C536 220 498 246 454 264" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              {[
                { label: 'Full Stack Dev', cls: 'left-1/2 top-8 -translate-x-1/2 bg-indigo-600 text-white' },
                { label: 'Frontend', cls: 'left-12 top-32 bg-white text-slate-900 border border-slate-200' },
                { label: 'Backend', cls: 'right-12 top-32 bg-white text-slate-900 border border-slate-200' },
                { label: 'React Practice', cls: 'left-28 bottom-9 bg-emerald-600 text-white' },
                { label: 'API Projects', cls: 'right-28 bottom-9 bg-cyan-600 text-white' },
              ].map(({ label, cls }) => (
                <motion.div
                  key={label}
                  className={`absolute min-w-32 rounded-lg px-4 py-2 text-center text-sm font-semibold shadow-md ${cls}`}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-around gap-6 px-4 py-7 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-bold text-slate-950">{s.value}</p>
              <p className="mt-0.5 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Built for focused learning</h2>
          <p className="mt-3 text-slate-600">Capture the material, organize the path, and keep your next step visible.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white ${f.accent}`}>
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-slate-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold">From source to study flow</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                className="rounded-lg border border-white/10 bg-white/5 p-5"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-950">
                  <step.icon size={19} />
                </div>
                <p className="text-sm font-semibold text-slate-100">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-xl bg-indigo-600 p-8 text-center text-white shadow-lg shadow-indigo-200 sm:p-10">
          <Zap className="mx-auto mb-4 text-amber-300" size={34} />
          <h2 className="text-3xl font-extrabold sm:text-4xl">Build your first study flow today.</h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-100">
            Turn a topic into a learning path, expand it with AI, and keep every step in one visual workspace.
          </p>
          <Link to="/register">
            <button className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-base font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50">
              Start StudyFlow <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        StudyFlow - Built with Gemini AI, React Flow, NestJS and PostgreSQL
      </footer>
    </main>
  );
}
