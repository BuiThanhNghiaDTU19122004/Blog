'use client'

// REDESIGN: light mode = circuit-trace screensaver (not static sprites).
// Dark mode = stars + moon (unchanged, worked fine).

import React from 'react'
import './AmbientRails.css'

export function AmbientRails() {
  return (
    <div className="ambient-rails" aria-hidden="true">
      {/* ── DARK MODE: Starry sky + moon ── */}
      <div className="ambient-dark">
        <div className="ambient-moon" />
        <div className="ambient-stars ambient-stars--far" />
        <div className="ambient-stars ambient-stars--near" />
      </div>

      {/* ── LIGHT MODE: Circuit-trace screensaver ──
           Two SVG paths that draw themselves in a loop,
           one per rail. Cyber-blue palette. */}
      <div className="ambient-light">
        {/* Left rail — vertical circuit trace */}
        <div className="ambient-trace ambient-trace--left">
          <svg viewBox="0 0 80 600" preserveAspectRatio="none" fill="none">
            <path
              className="trace-line"
              d="M40 0 L40 80 L20 100 L20 180 L60 200 L60 280 L30 310 L30 400 L50 420 L50 500 L40 520 L40 600"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Junction dots at bends */}
            <circle className="trace-dot" cx="40" cy="80" r="2" />
            <circle className="trace-dot" cx="20" cy="180" r="2" />
            <circle className="trace-dot" cx="60" cy="280" r="2" />
            <circle className="trace-dot" cx="30" cy="400" r="2" />
            <circle className="trace-dot" cx="50" cy="500" r="2" />
          </svg>
        </div>

        {/* Right rail — mirrored circuit trace */}
        <div className="ambient-trace ambient-trace--right">
          <svg viewBox="0 0 80 600" preserveAspectRatio="none" fill="none">
            <path
              className="trace-line"
              d="M40 0 L40 60 L55 80 L55 160 L25 190 L25 300 L50 330 L50 430 L35 450 L35 540 L40 560 L40 600"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="trace-dot" cx="40" cy="60" r="2" />
            <circle className="trace-dot" cx="55" cy="160" r="2" />
            <circle className="trace-dot" cx="25" cy="300" r="2" />
            <circle className="trace-dot" cx="50" cy="430" r="2" />
            <circle className="trace-dot" cx="35" cy="540" r="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}
