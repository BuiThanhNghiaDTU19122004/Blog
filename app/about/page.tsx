import Link from 'next/link'
import { Window } from '@/components/win98/Window'

export default function AboutPage() {
  return (
    <Window
      title="User Profile - [profile.exe]"
      icon="👤"
      address="C:\Blog\User\profile.exe"
      statusText="User status: Online | System Memory: 640KB OK"
    >
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-400 pb-3 font-win98">
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] active:border-black hover:bg-[var(--bg-surface-subtle)] no-underline text-[var(--text-main)]"
          >
            <span>⬅️</span>
            <span>Back to Explorer</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-700">
            <span className="bg-white border border-gray-500 px-2 py-0.5 shadow-inner">
              SYSTEM USER
            </span>
          </div>
        </div>

        {/* Main Content Box using JetBrains Mono Body Typography */}
        <div className="bg-[var(--bg-surface-inset)] border-2 border-gray-800 border-t-gray-900 border-l-gray-900 p-4 sm:p-6 shadow-inner space-y-6">
          
          {/* Intro Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 border-b-2 border-gray-200 pb-2">
              <span className="text-3xl select-none">💻</span>
              <div>
                <h1 className="text-3xl font-bold font-crt text-[var(--accent-primary)]">
                  Software Engineer & Architect
                </h1>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  Specializing in Full-Stack Web Development, Next.js, and Cloud Infrastructure.
                </p>
              </div>
            </div>

            <p className="font-body text-[1.05rem] text-[var(--text-main)] leading-[1.7]">
              Hello! I am a passionate full-stack developer dedicated to building high-performance, resilient, and beautifully crafted web applications. With a strong interest in modern framework architectures, distributed systems, and nostalgic user interfaces, I blend modern browser capabilities with classic retro aesthetics.
            </p>
          </section>

          {/* Technical Skills Section */}
          <fieldset className="border-2 border-gray-400 p-4 bg-[var(--bg-surface-subtle)] shadow-sm">
            <legend className="font-win98 font-bold text-xs text-[var(--accent-primary)] px-2 bg-[var(--bg-surface)] border border-gray-600">
              ⚙️ Technical Capabilities & Stack
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 font-body text-sm">
              <div className="bg-[var(--bg-surface-inset)] p-3 border border-gray-300 shadow-inner">
                <h3 className="font-crt font-bold text-lg text-[var(--accent-primary)] border-b border-gray-300 pb-1 mb-2">
                  Frontend Engineering
                </h3>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)]">
                  <li>React 19 & Next.js App Router</li>
                  <li>TypeScript & JavaScript (ESNext)</li>
                  <li>Tailwind CSS v4 & CSS Architecture</li>
                  <li>React Server Components & MDX</li>
                </ul>
              </div>

              <div className="bg-[var(--bg-surface-inset)] p-3 border border-gray-300 shadow-inner">
                <h3 className="font-crt font-bold text-lg text-[var(--accent-primary)] border-b border-gray-300 pb-1 mb-2">
                  Backend & Infrastructure
                </h3>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)]">
                  <li>Node.js / Express & REST APIs</li>
                  <li>PostgreSQL, SQLite & ORMs</li>
                  <li>CI/CD Workflows & GitHub Actions</li>
                  <li>Vercel, Docker & Cloud Deployment</li>
                </ul>
              </div>
            </div>
          </fieldset>

          {/* Contact & Social Links Section */}
          <section className="space-y-3 pt-2">
            <h2 className="text-2xl font-bold font-crt text-[var(--accent-primary)] border-b border-gray-300 pb-1">
              📫 Get In Touch & Social Links
            </h2>
            <p className="font-body text-[1.05rem] text-[var(--text-main)] leading-[1.7]">
              Feel free to connect or explore my open-source projects across the web:
            </p>

            <div className="flex flex-wrap gap-3 font-win98 text-xs">
              <a
                href="https://github.com/BuiThanhNghiaDTU19122004"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-main)] font-bold no-underline"
              >
                <span>🐙</span>
                <span>GitHub Profile</span>
              </a>

              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-2 px-3 py-1.5 border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-main)] font-bold no-underline"
              >
                <span>✉️</span>
                <span>Send Email</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-main)] font-bold no-underline"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
            </div>
          </section>

        </div>
      </div>
    </Window>
  )
}
