import React, { useState, useEffect, useRef } from 'react';
import Header from './components/layout/Header';
import ChemicalFormula from './components/chemistry/ChemicalFormula';
import { COURSE_CHAPTERS } from './data/courseChapters';
import { getStoredData, setStoredData, STORAGE_KEYS } from './utils/storage';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('journey');
  const [selectedChapter, setSelectedChapter] = useState(COURSE_CHAPTERS[0]);
  const [completedChapters, setCompletedChapters] = useState(() => {
    const saved = getStoredData(STORAGE_KEYS.PROGRESS, { completedChapters: [] });
    return saved.completedChapters || [];
  });

  // Simulator parameters
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [concentration, setConcentration] = useState(20); // Particle count
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [metrics, setMetrics] = useState({ totalCollisions: 0, effectiveCollisions: 0 });

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameId = useRef(null);

  // Initialize or re-initialize simulation particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;

    const baseSpeed = (temperature / 300) * 1.8;
    const count = concentration;

    const newParticles = [];
    for (let i = 0; i < count; i++) {
      // Type A (Cyan: Reaktan A) or Type B (Amber: Reaktan B)
      const type = i % 2 === 0 ? 'A' : 'B';
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.7 + Math.random() * 0.6) * baseSpeed;

      newParticles.push({
        x: 20 + Math.random() * (width - 40),
        y: 20 + Math.random() * (height - 40),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 7,
        type: type,
        state: 'reactant' // 'reactant' or 'product'
      });
    }
    particlesRef.current = newParticles;
    setMetrics({ totalCollisions: 0, effectiveCollisions: 0 });
  }, [concentration, temperature]);

  // Canvas render and collision loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let totalCol = 0;
    let effCol = 0;

    const loop = () => {
      if (isSimRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background grid lines (subtle lab grid)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        const particles = particlesRef.current;

        // Update positions & wall collisions
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x - p.radius < 0) {
            p.x = p.radius;
            p.vx = -p.vx;
          } else if (p.x + p.radius > canvas.width) {
            p.x = canvas.width - p.radius;
            p.vx = -p.vx;
          }

          if (p.y - p.radius < 0) {
            p.y = p.radius;
            p.vy = -p.vy;
          } else if (p.y + p.radius > canvas.height) {
            p.y = canvas.height - p.radius;
            p.vy = -p.vy;
          }
        }

        // Particle collisions
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);

            if (dist < p1.radius + p2.radius) {
              totalCol++;

              // Elastic bounce direction
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Relative speed as kinetic energy representation
              const relSpeed = Math.hypot(p1.vx - p2.vx, p1.vy - p2.vy);
              // Effective collision requirement: opposing types + kinetic energy > activation energy threshold
              const activationThreshold = 3.2 - (temperature - 300) * 0.005;

              if (p1.type !== p2.type && relSpeed > activationThreshold && p1.state === 'reactant') {
                effCol++;
                p1.state = 'product';
                p2.state = 'product';
              }

              // Separate particles to prevent overlap
              const overlap = (p1.radius + p2.radius - dist) / 2;
              p1.x -= overlap * cos;
              p1.y -= overlap * sin;
              p2.x += overlap * cos;
              p2.y += overlap * sin;

              // Simple velocity swap
              const tempVx = p1.vx;
              const tempVy = p1.vy;
              p1.vx = p2.vx;
              p1.vy = p2.vy;
              p2.vx = tempVx;
              p2.vy = tempVy;
            }
          }
        }

        // Draw particles
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.state === 'product') {
            ctx.fillStyle = '#10b981'; // Emerald: Produk Reaksi
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 8;
          } else if (p.type === 'A') {
            ctx.fillStyle = '#06b6d4'; // Cyan: Reaktan A
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = '#f59e0b'; // Amber: Reaktan B
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 4;
          }

          ctx.fill();
          ctx.shadowBlur = 0; // reset
        });

        setMetrics({ totalCollisions: totalCol, effectiveCollisions: effCol });
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [isSimRunning, temperature]);

  const handleToggleChapter = (chapterId) => {
    let updated;
    if (completedChapters.includes(chapterId)) {
      updated = completedChapters.filter((id) => id !== chapterId);
    } else {
      updated = [...completedChapters, chapterId];
    }
    setCompletedChapters(updated);
    setStoredData(STORAGE_KEYS.PROGRESS, { completedChapters: updated });
  };

  const progressPercent = Math.round((completedChapters.length / COURSE_CHAPTERS.length) * 100);

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        progressPercent={progressPercent}
      />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-banner animate-fade-in">
          <div className="hero-tag">
            🧪 Kurikulum Kimia SMA Kelas 11 • Laju Reaksi
          </div>
          <h1 className="hero-title">
            Kuasai Konsep Laju Reaksi & Teori Tumbukan Lewat Laboratorium Virtual
          </h1>
          <p className="hero-description">
            Hubungkan fenomena makroskopis, pergerakan partikel submikroskopis, hingga representasi grafik dan diagram energi aktivasi secara interaktif dan terstruktur.
          </p>

          <div className="hero-formula-strip">
            <span className="formula-label">Persamaan Model Contoh:</span>
            <ChemicalFormula formula="CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l) + CO2(g)" />
            <span style={{ color: 'var(--border-medium)' }}>|</span>
            <ChemicalFormula formula="Na2S2O3(aq) + 2HCl(aq) -> 2NaCl(aq) + SO2(g) + S(s) + H2O(l)" />
          </div>

          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                const element = document.getElementById('chapters-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Mulai Peta Belajar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setActiveTab('collision')}
            >
              Uji Teori Tumbukan
            </button>
          </div>
        </section>

        {/* Interactive Collision Simulator Demonstration */}
        <section className="simulation-card animate-fade-in" id="simulator-section">
          <div className="section-header">
            <div className="section-eyebrow">Visualisasi Submikroskopis</div>
            <h2 className="section-title">Simulator Teori Tumbukan Interaktif</h2>
            <p className="section-desc">
              Amati bagaimana variasi suhu dan konsentrasi memengaruhi frekuensi serta keberhasilan tumbukan antarpartikel reaktan.
            </p>
          </div>

          <div className="simulation-layout">
            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                width={620}
                height={320}
                className="sim-canvas"
                aria-label="Kanvas Simulasi Tumbukan Partikel"
              />
              <div className="sim-note">
                ℹ️ <strong>Data Simulasi:</strong> Representasi konseptual tumbukan partikel 2D untuk tujuan pembelajaran (bukan pengukuran atomik riil).
              </div>
            </div>

            <div className="sim-controls-panel">
              <div className="sim-controls-title">
                🎛️ Kontrol Variabel Reaksi
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Suhu Reaksi (T)</span>
                  <strong>{temperature} K</strong>
                </div>
                <input
                  type="range"
                  min="250"
                  max="450"
                  step="5"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="slider-input"
                />
              </div>

              <div className="control-group">
                <div className="control-label">
                  <span>Konsentrasi / Kerapatan</span>
                  <strong>{concentration} partikel</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="2"
                  value={concentration}
                  onChange={(e) => setConcentration(Number(e.target.value))}
                  className="slider-input"
                />
              </div>

              <div className="sim-metrics-box">
                <div className="metric-item">
                  <span className="metric-label">Total Tumbukan</span>
                  <span className="metric-value">{metrics.totalCollisions}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Tumbukan Efektif</span>
                  <span className="metric-value highlight">{metrics.effectiveCollisions}</span>
                </div>
              </div>

              <div className="sim-buttons-row">
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setIsSimRunning(!isSimRunning)}
                >
                  {isSimRunning ? '⏸️ Jeda' : '▶️ Lanjutkan'}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setConcentration((c) => (c === 20 ? 22 : 20)); // Trigger reset
                  }}
                >
                  🔄 Ulangi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sequential Course Journey (Peta Belajar) */}
        <section id="chapters-section">
          <div className="section-header">
            <div className="section-eyebrow">Struktur Kurikulum Berurutan</div>
            <h2 className="section-title">Peta Belajar Kursus (5 Bab Pembelajaran)</h2>
            <p className="section-desc">
              Setiap bab mengintegrasikan pengenalan fenomena, eksplorasi laboratorium, pembuktian data, dan evaluasi pemahaman.
            </p>
          </div>

          <div className="chapter-grid">
            {COURSE_CHAPTERS.map((ch) => {
              const isCompleted = completedChapters.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  className={`chapter-card ${selectedChapter?.id === ch.id ? 'active-card' : ''}`}
                  onClick={() => setSelectedChapter(ch)}
                >
                  <div className="chapter-card-header">
                    <div className="chapter-badge-wrap">
                      <div className="chapter-icon">{ch.icon}</div>
                      <span className="chapter-num">Bab {ch.number}</span>
                    </div>
                    {isCompleted ? (
                      <span className="badge badge-success">✓ Selesai</span>
                    ) : (
                      <span className="badge badge-primary">Tersedia</span>
                    )}
                  </div>

                  <h3 className="chapter-card-title">{ch.title}</h3>
                  <p className="chapter-card-subtitle">{ch.subtitle}</p>

                  <ul className="chapter-topics-list">
                    {ch.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>

                  <div className="chapter-card-footer">
                    <span>⏱️ Estimasi: {ch.duration}</span>
                    <button
                      className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleChapter(ch.id);
                      }}
                    >
                      {isCompleted ? 'Tandai Belum' : 'Tandai Selesai'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            <strong>ReactionLab 11</strong> — Platform Pembelajaran Kimia Laju Reaksi SMA Kelas XI.
          </div>
          <div>
            Dikembangkan sesuai panduan kurikulum &amp; standar <code>PRD.md</code> &amp; <code>AGENT.md</code>.
          </div>
        </div>
      </footer>
    </div>
  );
}
