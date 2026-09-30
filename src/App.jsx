import React, { useState, useEffect, useRef } from 'react';

// Particle Canvas Background
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const NODE_COUNT = 45;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}

// Header Component
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#090c10]/80 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f2fe] to-[#9d4edd] flex items-center justify-center text-black font-extrabold text-xl shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-[#00f2fe] transition-colors">
              Salve Tech
            </h1>
            <span className="text-xs font-mono text-[#00f2fe]">sahl-way</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#solutions" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">Solutions</a>
          <a href="#ecosystem" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">Ecosystem</a>
          <a href="#api" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">API Docs</a>
          <a href="#support" className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors">Support</a>
        </nav>

        <a
          href="https://github.com/salvetech"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5"
        >
          <i className="fa-brands fa-github"></i>
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}

// Hero Component
function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-[#9d4edd]/10 border border-[#9d4edd]/30 text-[#9d4edd] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
        <i className="fa-solid fa-microchip"></i>
        <span>Powered by Amarii Productions Inc.</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8b949e] max-w-4xl mx-auto leading-tight mb-6">
        Next-Gen AI & API Solutions <br />
        for <span className="font-mono text-[#00f2fe] font-normal">Salve</span> [<span className="text-[#9d4edd]">sahl-way</span>] Innovation
      </h1>

      <p className="max-w-2xl mx-auto text-lg text-[#8b949e] font-normal mb-8">
        Salve Technologies builds product engines and wholesale AI/API infrastructure tailored for creative individuals, independent media, and modern web solutions.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#solutions"
          className="bg-gradient-to-r from-[#00f2fe] to-[#4cc9f0] text-black px-6 py-3 rounded-lg font-bold shadow-[0_4px_20px_rgba(0,242,254,0.25)] hover:shadow-[0_6px_25px_rgba(0,242,254,0.4)] hover:-translate-y-0.5 transition-all"
        >
          Explore Solutions
        </a>
        <a
          href="https://github.com/salvetech"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/5 border border-white/10 hover:border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <i className="fa-brands fa-github"></i>
          <span>View Repositories</span>
        </a>
      </div>
    </section>
  );
}

// Ecosystem Component
function Ecosystem() {
  const projects = [
    {
      title: 'Interactive Emulators',
      icon: 'fa-compact-disc',
      desc: 'Powering retro-futuristic web applications like Dub Deck (cassette dubbing emulator) and WebPod (2000s music player emulator) with rich audio canvas frameworks.',
      link: 'https://amprodinc.site/projects.html',
    },
    {
      title: 'Curated AI Agents',
      icon: 'fa-brain',
      desc: 'Wholesaling custom recommendation engines and context-driven conversational agents like Vibe Shift AI (mood playlisting) and Daily Bread AI / Noora AI.',
      link: 'https://amprodinc.site/projects.html',
    },
    {
      title: 'Independent Media & Tech',
      icon: 'fa-sliders',
      desc: 'Providing modular infrastructure for decentralized publishing, experimental audio research, and independent creative toolkits.',
      link: 'https://amprodinc.site/projects.html',
    },
  ];

  return (
    <section id="ecosystem" className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Ecosystem & Case Studies</h2>
      <p className="text-[#8b949e] text-lg mb-10 max-w-2xl">
        Deploying modular intelligence across creative technology, interactive web emulators, and specialized AI agents.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#161b22]/70 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:bg-[#161b22]/90 hover:border-[#00f2fe]/40 transition-all hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00f2fe] text-xl mb-6 group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-[#8b949e] text-sm leading-relaxed mb-6">{item.desc}</p>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f2fe] text-sm font-semibold flex items-center gap-2 hover:underline"
            >
              <span>Explore Projects</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// Wholesale API Section
function WholesaleApi() {
  const [activeTab, setActiveTab] = useState('audio');

  const codeSnippets = {
    audio: `// Initialize Salve Audio & Emulator Engine
import { SalveEngine } from '@salvetech/sdk';

const salve = new SalveEngine({
  apiKey: process.env.SALVE_API_KEY,
  environment: 'production'
});

// Create cassette dubbing session
const session = await salve.audio.createEmulator({
  type: 'dub-deck',
  sampleRate: 48000,
  tapeType: 'chrome-ii'
});`,
    ai: `// Query Context-Aware AI Agent
const aiSession = await salve.ai.createAgentSession({
  agentId: 'vibe-shift-v2',
  context: 'creative-flow-state'
});

const response = await aiSession.generatePlaylist({
  genreFilter: ['ambient', 'modular-synth'],
  durationMinutes: 60
});`,
  };

  return (
    <section id="solutions" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#161b22]/90 to-[#0d1117]/90 border border-white/10 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Wholesale Solutions for Creators & Businesses</h2>
          <p className="text-[#8b949e] leading-relaxed mb-6">
            Whether you need lightweight web emulators, custom AI models, or flexible backend APIs, Salve Technologies delivers production-ready systems you can scale or white-label.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-[#00f2fe] mt-1"></i>
              <div>
                <strong className="text-white block">Modular API Integration</strong>
                <span className="text-[#8b949e] text-sm">Embed audio processing, mood curation, and custom AI responses into your existing web apps.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-[#00f2fe] mt-1"></i>
              <div>
                <strong className="text-white block">White-Label Creative Apps</strong>
                <span className="text-[#8b949e] text-sm">Deploy interactive canvas interfaces and web tools designed specifically for modern creative brands.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-[#00f2fe] mt-1"></i>
              <div>
                <strong className="text-white block">Decentralized Infrastructure</strong>
                <span className="text-[#8b949e] text-sm">Built with freedom of expression, performance, and self-sufficiency at the core.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Interactive Code Terminal */}
        <div id="api" className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
          <div className="bg-[#161b22] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('audio')}
                className={`px-3 py-1 text-xs rounded transition-colors ${activeTab === 'audio' ? 'bg-[#00f2fe]/20 text-[#00f2fe]' : 'text-[#8b949e] hover:text-white'}`}
              >
                audio-sdk.js
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3 py-1 text-xs rounded transition-colors ${activeTab === 'ai' ? 'bg-[#00f2fe]/20 text-[#00f2fe]' : 'text-[#8b949e] hover:text-white'}`}
              >
                ai-sdk.js
              </button>
            </div>
          </div>
          <div className="p-5 text-[#e6edf3] overflow-x-auto whitespace-pre leading-relaxed">
            <code>{codeSnippets[activeTab]}</code>
          </div>
        </div>
      </div>
    </section>
  );
}

// Support / Contribution Section
function Support() {
  return (
    <section id="support" className="py-16 px-6 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Support & Contributions</h2>
      <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-10">
        Salve Technologies is self-funded and community supported through Amarii Productions Inc. Support independent creative technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-[#161b22]/70 border border-white/10 rounded-xl p-8 backdrop-blur-md text-left flex flex-col justify-between">
          <div>
            <div className="text-2xl text-[#00f2fe] mb-4">
              <i className="fa-regular fa-credit-card"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Card & Subscription Donations</h3>
            <p className="text-[#8b949e] text-sm mb-6">
              Support development and infrastructure cost directly via Ko-fi or Stripe integrations.
            </p>
          </div>
          <a
            href="https://ko-fi.com/tajpollard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            <span>Support on Ko-fi</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
          </a>
        </div>

        <div className="bg-[#161b22]/70 border border-white/10 rounded-xl p-8 backdrop-blur-md text-left flex flex-col justify-between">
          <div>
            <div className="text-2xl text-[#9d4edd] mb-4">
              <i className="fa-brands fa-ethereum"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cryptocurrency Payments</h3>
            <p className="text-[#8b949e] text-sm mb-6">
              Decentralized support accepted via NOWPayments (Ethereum, Monero, Litecoin, Polygon).
            </p>
          </div>
          <a
            href="https://nowpayments.io/donation?api_key=3d245b61-fd15-44c7-be5b-12f1b2f8ab8b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#9d4edd]/20 border border-[#9d4edd]/40 hover:bg-[#9d4edd]/30 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            <span>Crypto Contribution</span>
            <i className="fa-solid fa-coins text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070a] pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div>
          <a href="#" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f2fe] to-[#9d4edd] flex items-center justify-center text-black font-extrabold text-sm">
              S
            </div>
            <span className="text-lg font-bold text-white">Salve Technologies</span>
          </a>
          <p className="text-[#8b949e] text-sm max-w-sm leading-relaxed">
            AI & API development for modern web solutions. Built for creators, artists, and forward-thinking digital businesses.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-[#8b949e]">
            <li><a href="#solutions" className="hover:text-[#00f2fe] transition-colors">Wholesale Solutions</a></li>
            <li><a href="#ecosystem" className="hover:text-[#00f2fe] transition-colors">Ecosystem Case Studies</a></li>
            <li><a href="#api" className="hover:text-[#00f2fe] transition-colors">Developer SDK Docs</a></li>
            <li><a href="#support" className="hover:text-[#00f2fe] transition-colors">Support Development</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Parent Network</h4>
          <ul className="space-y-2 text-sm text-[#8b949e]">
            <li>
              <a href="https://amprodinc.site/projects.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f2fe] transition-colors flex items-center gap-2">
                <span>Amarii Productions Projects</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/salvetech" target="_blank" rel="noopener noreferrer" className="hover:text-[#00f2fe] transition-colors flex items-center gap-2">
                <span>GitHub Organization</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#8b949e]">
        <div>&copy; 2026 Salve Technologies. Powered by Amarii Productions Inc.</div>
        <a href="https://github.com/salvetech" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2">
          <i className="fa-brands fa-github"></i>
          <span>github.com/salvetech</span>
        </a>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen relative text-[#f0f6fc]">
      <ParticleCanvas />
      <Header />
      <main>
        <Hero />
        <Ecosystem />
        <WholesaleApi />
        <Support />
      </main>
      <Footer />
    </div>
  );
}
