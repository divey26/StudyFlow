import '../landing.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  FileText,
  GraduationCap,
  Link2,
  Network,
  Route,
  Sparkles,
  Star,
  Workflow,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─── Data ─────────────────────────────────────────────────── */

const features = [
  {
    title: 'AI Study Maps',
    icon: Sparkles,
    text: 'Start with any topic and let Gemini AI shape it into a clear, connected study structure instantly.',
    gradient: 'from-violet-500 to-indigo-600',
    glow: 'shadow-violet-500/25',
  },
  {
    title: 'Source To Structure',
    icon: Link2,
    text: 'Paste a URL, YouTube link, or raw notes — AI extracts the key ideas and turns them into nodes.',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/25',
  },
  {
    title: 'Visual Learning Canvas',
    icon: Network,
    text: 'Move, connect, expand, and reorganize concepts on a blazing-fast React Flow canvas.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/25',
  },
  {
    title: 'Smart Auto Layout',
    icon: Workflow,
    text: 'Rearrange messy study material into a clean, readable hierarchy with a single click.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/25',
  },
  {
    title: 'Export Your Work',
    icon: FileText,
    text: 'Save your study map as PNG or structured JSON and keep your progress wherever you go.',
    gradient: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/25',
  },
  {
    title: 'Learning Roadmaps',
    icon: Route,
    text: 'Break large skills into topics, sub-tasks, resources, and notes you can actually follow.',
    gradient: 'from-fuchsia-500 to-purple-600',
    glow: 'shadow-fuchsia-500/25',
  },
];

const steps = [
  { step: '01', label: 'Enter a topic or paste a source', icon: Link2, desc: 'Any URL, video, or text works.' },
  { step: '02', label: 'AI extracts the key ideas', icon: Sparkles, desc: 'Gemini parses & maps concepts.' },
  { step: '03', label: 'Shape the flow on the canvas', icon: Workflow, desc: 'Drag, link, expand freely.' },
  { step: '04', label: 'Export & keep building', icon: FileText, desc: 'PNG, JSON, or keep going.' },
];

const testimonials = [
  {
    name: 'Aria Chen',
    role: 'CS Student',
    avatar: 'AC',
    text: 'StudyFlow completely changed how I prepare for exams. Visual maps make everything click.',
    stars: 5,
  },
  {
    name: 'Marcus Reid',
    role: 'Self-taught Developer',
    avatar: 'MR',
    text: 'I pasted a YouTube tutorial and got a full roadmap in seconds. Absolute game-changer.',
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Medical Student',
    avatar: 'PN',
    text: 'The AI map generation is incredibly accurate. My study sessions are 2x more productive.',
    stars: 5,
  },
];

const previewNodes = [
  { label: 'Full Stack Dev', cls: 'left-1/2 top-6 -translate-x-1/2', gradient: 'from-violet-600 to-indigo-600', delay: 0 },
  { label: 'Frontend', cls: 'left-8 top-28', gradient: 'from-cyan-500 to-blue-600', delay: 0.3 },
  { label: 'Backend', cls: 'right-8 top-28', gradient: 'from-emerald-500 to-teal-600', delay: 0.6 },
  { label: 'React / TS', cls: 'left-16 bottom-10', gradient: 'from-amber-500 to-orange-500', delay: 0.9 },
  { label: 'Node / DB', cls: 'right-16 bottom-10', gradient: 'from-rose-500 to-pink-600', delay: 1.2 },
];

/* ─── Component ─────────────────────────────────────────────── */

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="sf-landing" id="landing-page">
      {/* Grain overlay */}
      <div className="sf-grain" aria-hidden />

      {/* ── NAV ── */}
      <nav className="sf-nav" id="main-nav">
        <div className="sf-nav-inner">
          <Link to="/" className="sf-logo" id="nav-logo">
            <span className="sf-logo-icon"><GraduationCap size={20} /></span>
            <span className="sf-logo-text">StudyFlow</span>
          </Link>
          <div className="sf-nav-links">
            <a href="#features" className="sf-nav-link" id="nav-features">Features</a>
            <a href="#how" className="sf-nav-link" id="nav-how">How It Works</a>
            <Link to="/dashboard" className="sf-btn sf-btn-primary" id="nav-cta">
              Open App <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <motion.section ref={heroRef} className="sf-hero" id="hero" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="sf-orb sf-orb-1" aria-hidden />
        <div className="sf-orb sf-orb-2" aria-hidden />
        <div className="sf-orb sf-orb-3" aria-hidden />

        <div className="sf-hero-inner">
          {/* Copy */}
          <motion.div
            className="sf-hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sf-badge" id="hero-badge">
              <Sparkles size={13} /> Powered by Gemini AI
            </div>
            <h1 className="sf-h1" id="hero-heading">
              Turn any topic into a{' '}
              <span className="sf-gradient-text">visual learning path</span>
            </h1>
            <p className="sf-hero-sub">
              StudyFlow converts topics, links, videos, and notes into interactive study maps —
              so you learn with direction, not scattered tabs.
            </p>
            <div className="sf-hero-cta" id="hero-cta-group">
              <Link to="/dashboard" className="sf-btn sf-btn-primary sf-btn-lg" id="hero-cta-primary">
                Build My Flow <ArrowRight size={18} />
              </Link>
              <a href="#how" className="sf-btn sf-btn-ghost sf-btn-lg" id="hero-cta-secondary">
                See How It Works
              </a>
            </div>
            <div className="sf-hero-social" id="hero-social-proof">
              <div className="sf-avatars">
                {['AC', 'MR', 'PN', 'JD'].map((a) => (
                  <span key={a} className="sf-avatar">{a}</span>
                ))}
              </div>
              <p className="sf-social-text">Loved by <strong>1,200+</strong> learners</p>
            </div>
          </motion.div>

          {/* Canvas preview */}
          <motion.div
            className="sf-hero-visual"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sf-canvas-card" id="hero-canvas-preview">
              <div className="sf-canvas-header">
                <div className="sf-canvas-dots">
                  <span className="sf-dot sf-dot-red" />
                  <span className="sf-dot sf-dot-yellow" />
                  <span className="sf-dot sf-dot-green" />
                </div>
                <div className="sf-canvas-title">
                  <BookOpenCheck size={14} className="sf-canvas-icon" />
                  Full Stack Developer Flow
                </div>
                <span className="sf-live-badge">● Live</span>
              </div>

              <div className="sf-canvas-body">
                <div className="sf-dot-grid" aria-hidden />
                <svg className="sf-connectors" aria-hidden viewBox="0 0 560 280" fill="none">
                  <path d="M280 52 C220 80 168 108 128 148" stroke="url(#g1)" strokeWidth="1.5" />
                  <path d="M280 52 C340 80 392 108 432 148" stroke="url(#g2)" strokeWidth="1.5" />
                  <path d="M128 172 C148 214 188 240 212 258" stroke="url(#g3)" strokeWidth="1.5" />
                  <path d="M432 172 C412 214 372 240 348 258" stroke="url(#g4)" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="g1" x1="280" y1="52" x2="128" y2="148" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="g2" x1="280" y1="52" x2="432" y2="148" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="g3" x1="128" y1="172" x2="212" y2="258" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#06b6d4" /><stop offset="1" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="g4" x1="432" y1="172" x2="348" y2="258" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10b981" /><stop offset="1" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                {previewNodes.map(({ label, cls, gradient, delay }) => (
                  <motion.div
                    key={label}
                    className={`sf-node absolute ${cls}`}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3 + delay * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
                  >
                    <span className={`sf-node-inner bg-gradient-to-br ${gradient}`}>{label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="sf-canvas-footer">
                <span className="sf-canvas-stat"><Zap size={12} /> 5 nodes</span>
                <span className="sf-canvas-stat"><BrainCircuit size={12} /> AI-generated</span>
              </div>
            </div>

            <motion.div
              className="sf-floating-badge"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Sparkles size={16} className="sf-floating-icon" />
              <div>
                <p className="sf-floating-title">AI Generated</p>
                <p className="sf-floating-sub">in 2.3 seconds</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── STATS STRIP ── */}
      <section className="sf-stats-strip" id="stats">
        <div className="sf-stats-inner">
          {[
            { value: 'Gemini AI', label: 'Generation Engine' },
            { value: 'React Flow', label: 'Interactive Canvas' },
            { value: 'NestJS', label: 'Backend' },
            { value: 'PostgreSQL', label: 'Database' },
          ].map((s) => (
            <div key={s.label} className="sf-stat-item">
              <p className="sf-stat-value">{s.value}</p>
              <p className="sf-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="sf-section" id="features">
        <div className="sf-container">
          <motion.div
            className="sf-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sf-badge"><Network size={13} /> Everything You Need</div>
            <h2 className="sf-h2" id="features-heading">Built for focused learning</h2>
            <p className="sf-section-sub">Capture the material, organize the path, keep your next step visible.</p>
          </motion.div>

          <div className="sf-feature-grid" id="feature-grid">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="sf-feature-card"
                id={`feature-${i}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={`sf-feature-icon bg-gradient-to-br ${f.gradient} shadow-lg ${f.glow}`}>
                  <f.icon size={22} />
                </div>
                <h3 className="sf-feature-title">{f.title}</h3>
                <p className="sf-feature-text">{f.text}</p>
                <div className={`sf-feature-bar bg-gradient-to-r ${f.gradient}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="sf-section sf-how" id="how">
        <div className="sf-container">
          <motion.div
            className="sf-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sf-badge sf-badge-dark"><Zap size={13} /> Simple Process</div>
            <h2 className="sf-h2 sf-h2-light" id="how-heading">From source to study flow</h2>
            <p className="sf-section-sub sf-section-sub-light">Four steps from raw material to a visual learning map.</p>
          </motion.div>

          <div className="sf-steps" id="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                className="sf-step"
                id={`step-${i}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="sf-step-num">{step.step}</div>
                <div className="sf-step-icon-wrap"><step.icon size={20} /></div>
                <h3 className="sf-step-label">{step.label}</h3>
                <p className="sf-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sf-section" id="testimonials">
        <div className="sf-container">
          <motion.div
            className="sf-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sf-badge"><Star size={13} /> Learner Stories</div>
            <h2 className="sf-h2" id="testimonials-heading">Loved by learners worldwide</h2>
          </motion.div>

          <div className="sf-testimonials" id="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="sf-testimonial"
                id={`testimonial-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="sf-stars">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} className="sf-star" />
                  ))}
                </div>
                <p className="sf-testimonial-text">"{t.text}"</p>
                <div className="sf-testimonial-author">
                  <span className="sf-testimonial-avatar">{t.avatar}</span>
                  <div>
                    <p className="sf-testimonial-name">{t.name}</p>
                    <p className="sf-testimonial-role">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sf-cta-section" id="cta">
        <div className="sf-container">
          <motion.div
            className="sf-cta-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="sf-cta-orb sf-cta-orb-1" aria-hidden />
            <div className="sf-cta-orb sf-cta-orb-2" aria-hidden />
            <div className="sf-cta-icon-wrap"><Zap size={30} className="sf-cta-zap" /></div>
            <h2 className="sf-cta-heading" id="cta-heading">Build your first study flow today.</h2>
            <p className="sf-cta-sub">
              Turn a topic into a learning path, expand it with AI, and keep every step in one visual workspace.
            </p>
            <Link to="/dashboard" className="sf-btn sf-btn-white sf-btn-lg" id="cta-btn">
              Open StudyFlow <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sf-footer" id="footer">
        <div className="sf-footer-inner">
          <Link to="/" className="sf-logo">
            <span className="sf-logo-icon"><GraduationCap size={16} /></span>
            <span className="sf-logo-text">StudyFlow</span>
          </Link>
          <p className="sf-footer-copy">Built with Gemini AI · React Flow · NestJS · PostgreSQL</p>
          <p className="sf-footer-rights">© 2026 StudyFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
