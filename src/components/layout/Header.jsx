import React from 'react';
import './Header.css';

export default function Header({ activeTab, onSelectTab, progressPercent = 0 }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <a href="#home" className="header-brand" onClick={() => onSelectTab('journey')}>
          <div className="brand-icon-box" aria-hidden="true">
            ⚗️
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">
              ReactionLab <span className="brand-badge">11</span>
            </span>
            <span className="brand-subtitle">Kursus & Lab Virtual Laju Reaksi</span>
          </div>
        </a>

        <nav className="header-nav" aria-label="Navigasi Utama">
          <button
            className={`nav-link-btn ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => onSelectTab('journey')}
          >
            🗺️ Peta Belajar
          </button>
          <button
            className={`nav-link-btn ${activeTab === 'collision' ? 'active' : ''}`}
            onClick={() => onSelectTab('collision')}
          >
            💥 Simulasi Tumbukan
          </button>
          <button
            className={`nav-link-btn ${activeTab === 'virtual-lab' ? 'active' : ''}`}
            onClick={() => onSelectTab('virtual-lab')}
          >
            🧪 Lab Faktor Reaksi
          </button>
          <button
            className={`nav-link-btn ${activeTab === 'energy' ? 'active' : ''}`}
            onClick={() => onSelectTab('energy')}
          >
            📈 Diagram Energi
          </button>
        </nav>

        <div className="header-meta">
          <div className="progress-pill" title="Progres Kursus Anda">
            <span>Progres: {progressPercent}%</span>
            <div className="progress-pill-bar">
              <div
                className="progress-pill-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
