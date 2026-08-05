import Link from 'next/link'
import { Window } from '@/components/win98/Window'
import { getDictionary } from '@/lib/i18n/dictionary'
import { ExperienceItem } from '@/components/win98/ExperienceItem'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

// ponytail: static dataset matching terminal/file-card about page structure
const skills = [
  'AWS',
  'Terraform',
  'Docker',
  'Kubernetes',
  'Argo CD',
  'GitHub Actions',
  'Prometheus',
  'Grafana',
  'PostgreSQL',
  'Python',
  'JavaScript',
  'Java',
]

const projects = [
  {
    fileId: 'FILE_1',
    name: 'Foresight Lens — Cloud-Native Predictive Monitoring',
    date: '2026-06 – 2026-07',
    status: 'Completed',
    category: 'Cloud Observability / Fintech',
    tech: 'AWS / Terraform / GitHub Actions / ECS Fargate / Kinesis',
    description:
      'A proactive AWS observability platform detecting drift and capacity exhaustion across a 3-service fintech workload. Built an end-to-end pipeline with ECS Fargate, ALB, Kinesis Data Streams, Lambda, Timestream, S3, SNS/Slack, and Managed Grafana, plus a fail-open fallback and a cost circuit breaker. Load-tested with k6 to see where it actually breaks.',
    sourceUrl: 'github.com/BuiThanhNghiaDTU19122004/CDO07-Capstone',
  },
  {
    fileId: 'FILE_2',
    name: 'GitOps & Kubernetes Practice Lab',
    date: '2026-06 – 2026-07',
    status: 'Ongoing',
    category: 'Learning Project',
    tech: 'Kubernetes / Argo CD / Prometheus',
    description:
      'A GitOps deployment pipeline using Argo CD and Prometheus for automated rollouts and health monitoring, structured with an app-of-apps pattern and environment manifests for repeatable, Git-driven delivery.',
    sourceUrl: 'github.com/BuiThanhNghiaDTU19122004/gitops',
  },
  {
    fileId: 'FILE_3',
    name: 'EZPark — Smart Parking Application',
    date: '2025-09 – 2025-12',
    status: 'Completed',
    category: 'Mobile / Backend',
    tech: 'Node.js / Express / PostgreSQL / AWS EC2 / RDS',
    description:
      'Led a 4-person Agile team building a smart-parking app. Built RESTful APIs for no-parking route management with geospatial queries, designed a PostgreSQL + PostGIS schema, and deployed the backend on AWS EC2/RDS.',
    sourceUrl: 'github.com/NagikoPokPok/EZPark',
  },
]

const experiences = [
  {
    title: 'CloudOps / DevOps Intern',
    companyLocation: 'Xbrain, Da Nang, Vietnam',
    dateRange: 'Apr 2026 – Jul 2026',
    details:
      'Acquired foundational knowledge across AWS CloudOps services, focusing on architecture and system design best practices. Studied and practiced core Kubernetes concepts, automated GitOps workflows, and canary deployment strategies.',
  },
  {
    title: 'Graduation Internship — Team Lead',
    companyLocation: 'Kaopiz Holdings, Da Nang, Vietnam',
    dateRange: 'Sep 2025 – Dec 2025',
    details:
      'Led a 4-member Agile/Scrum team designing and developing EZPark, a smart-parking app, through Daily Scrum, Sprint Planning, and Retrospectives. Collaborated on system architecture and implemented backend RESTful APIs and database integration.',
  },
]

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <Window
      title={`User Profile - [Bui Thanh Nghia (Arti) - profile.exe]`}
      icon="👤"
      address={`C:\\Blog\\User\\BuiThanhNghia\\profile.exe`}
      statusText={`${dict.systemStatus} | System Memory: 640KB OK`}
    >
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-400 pb-3 font-win98">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] active:border-black hover:bg-[var(--bg-surface-subtle)] no-underline text-[var(--text-main)]"
          >
            <span>⬅️</span>
            <span>{dict.backToExplorer}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-700 dark:text-gray-300">
            <span className="bg-[var(--bg-surface)] border border-gray-500 px-2 py-0.5 shadow-inner text-[var(--text-main)] font-bold">
              USER: BUI THANH NGHIA (ARTI)
            </span>
          </div>
        </div>

        {/* Main Terminal Content Box */}
        <div className="bg-[var(--bg-surface-inset)] border-2 border-gray-800 border-t-gray-900 border-l-gray-900 p-4 sm:p-6 shadow-inner space-y-8 font-mono">
          {/* Profile Name Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-gray-400 dark:border-gray-700 pb-4 bg-[var(--bg-surface-subtle)] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl select-none">💻</span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-[var(--accent-primary)]">
                  Bui Thanh Nghia <span className="text-sm sm:text-base text-[var(--accent-secondary)] font-normal">(Arti)</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[var(--text-muted)] mt-0.5">
                  Software Engineering &amp; CloudOps / DevOps Engineer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="bg-[var(--bg-surface)] border border-gray-500 px-2 py-1 shadow-inner text-[var(--text-main)] font-bold">
                STATUS: ACTIVE_SEEKER
              </span>
            </div>
          </div>

          {/* 01. ABOUT */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              01. ABOUT
            </h2>
            <p className="font-sans text-sm sm:text-base text-[var(--text-main)] leading-relaxed">
              Graduated Software Engineering student (CMU-based program, Duy Tan University — GPA 3.93/4.0) currently deep in AWS, Terraform, and Kubernetes. I'd rather learn a deployment pipeline by building one than by reading about it — GitOps, canary deployments, cost circuit breakers, the works. Currently looking for an entry-level DevOps / Cloud Operations role.
            </p>
          </section>

          {/* 02. SKILLS */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              02. SKILLS
            </h2>
            <div className="border-2 border-gray-400 dark:border-gray-600 p-4 bg-[var(--bg-surface-subtle)] shadow-sm flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono bg-[#c0c0c0] dark:bg-[var(--bg-surface-card)] text-black dark:text-[var(--text-main)] font-bold px-2.5 py-1 border border-gray-600 uppercase tracking-wider shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* 03. PROJECTS */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              03. PROJECTS
            </h2>

            {/* Timeline container */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-gray-400 dark:border-gray-600 space-y-6 my-4">
              {projects.map((project) => (
                <div key={project.fileId} className="relative group">
                  {/* Dot marker on vertical line */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full bg-[var(--accent-primary)] border-2 border-[var(--bg-surface-inset)] shadow-xs" />

                  {/* File card */}
                  <div className="bg-[var(--bg-surface-card)] border-2 border-gray-700 p-4 sm:p-5 shadow-md space-y-3 font-mono">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 dark:border-gray-700 pb-2">
                      <h3 className="font-bold text-sm sm:text-base text-[var(--accent-primary)]">
                        {project.fileId}: {project.name}
                      </h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 border border-gray-500 bg-[var(--bg-surface-subtle)] text-[var(--text-main)]">
                        {project.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                      <div>
                        <span className="font-bold text-[var(--text-main)]">DATE:</span> {project.date}
                      </div>
                      <div>
                        <span className="font-bold text-[var(--text-main)]">CATEGORY:</span> {project.category}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-bold text-[var(--text-main)]">TECH:</span> {project.tech}
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[var(--text-main)] leading-relaxed pt-1">
                      {project.description}
                    </p>

                    <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                      <a
                        href={project.sourceUrl.startsWith('http') ? project.sourceUrl : `https://${project.sourceUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono font-bold text-xs text-[var(--accent-primary)] hover:underline"
                      >
                        <span>&gt;&gt; SOURCE CODE</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 04. EXPERIENCE */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              04. EXPERIENCE
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <ExperienceItem
                  key={exp.title + exp.companyLocation}
                  title={exp.title}
                  companyLocation={exp.companyLocation}
                  dateRange={exp.dateRange}
                  details={exp.details}
                />
              ))}
            </div>
          </section>

          {/* 05. EDUCATION */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              05. EDUCATION
            </h2>

            <div className="border-2 border-gray-700 border-l-4 border-l-[var(--accent-primary)] p-4 sm:p-5 bg-[var(--bg-surface-card)] shadow-sm space-y-2 font-mono">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-300 dark:border-gray-700 pb-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)]">
                    Duy Tan University (CMU-based program)
                  </h3>
                  <p className="text-xs text-[var(--accent-primary)] font-semibold mt-0.5">
                    Bachelor of Science in Software Engineering
                  </p>
                </div>
                <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-surface-subtle)] px-2 py-0.5 border border-gray-500">
                  2022 – 2026
                </span>
              </div>
              <div className="font-sans text-xs sm:text-sm text-[var(--text-muted)] pt-1 leading-relaxed">
                GPA 3.93/4.0 • Excellence Scholarship (Years 1, 2, 3) • TOEIC 950/990 • Encouragement Prize, Student Scientific Research Conference 2025
              </div>
            </div>
          </section>
        </div>
      </div>
    </Window>
  )
}
