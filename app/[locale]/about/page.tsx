import Link from 'next/link'
import { Window } from '@/components/win98/Window'
import { getDictionary } from '@/lib/i18n/dictionary'
import { ExperienceItem } from '@/components/win98/ExperienceItem'
import { ProfileHeader } from '@/components/win98/ProfileHeader'
import { TechStackGrid } from '@/components/win98/TechStackGrid'
import { EducationSection } from '@/components/win98/EducationSection'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

// ponytail: static dataset matching terminal/file-card about page structure
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <Window
      title={dict.profileTitle ?? `User Profile - [Bui Thanh Nghia (Arti) - profile.exe]`}
      icon="👤"
      address={`C:\\Blog\\User\\BuiThanhNghia\\profile.exe`}
      statusText={`${dict.systemStatus} | System Memory: 640KB OK`}
    >
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-400 pb-3 font-win98">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-t-white border-l-white border-b-black border-r-black bg-[var(--bg-surface)] active:border-black hover:bg-[var(--bg-surface-subtle)] no-underline text-[var(--text-main)] transition-colors"
          >
            <span>⬅️</span>
            <span>{dict.backToExplorer}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-700 dark:text-gray-300">
            <span className="bg-[var(--bg-surface)] border border-gray-500 px-2 py-0.5 shadow-inner text-[var(--text-main)] font-bold">
              {dict.profileUserLabel ?? 'USER: BUI THANH NGHIA (ARTI)'}
            </span>
          </div>
        </div>

        {/* Main Terminal Content Box */}
        <div className="bg-[var(--bg-surface-inset)] border-2 border-gray-800 border-t-gray-900 border-l-gray-900 p-4 sm:p-6 shadow-inner space-y-8 font-mono">
          {/* 1. Profile Header with subtle premium polish */}
          <ProfileHeader
            name={dict.profileName ?? 'Bui Thanh Nghia'}
            nickname={dict.profileNickname ?? '(Arti)'}
            role={dict.profileRole ?? 'Software Engineering & CloudOps / DevOps Engineer'}
            status={dict.profileStatus ?? 'STATUS: ACTIVE_SEEKER'}
          />

          {/* 01. ABOUT */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              {dict.sectionAbout ?? '01. ABOUT'}
            </h2>
            <div className="font-sans text-sm sm:text-base text-[var(--text-main)] leading-relaxed space-y-3">
              {dict.aboutParagraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* 02. TECH STACK — Categorized with Muted Accent Palettes */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              {dict.sectionSkills ?? '02. TECH STACK'}
            </h2>
            <TechStackGrid categories={dict.techCategories} />
          </section>

          {/* 03. PROJECTS */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              {dict.sectionProjects ?? '03. PROJECTS'}
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
                        <span>{dict.sourceCodeBtn ?? '>> SOURCE CODE'}</span>
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
              {dict.sectionExperience ?? '04. EXPERIENCE'}
            </h2>

            <div className="space-y-4">
              {dict.experiences.map((exp) => (
                <ExperienceItem
                  key={exp.title + exp.companyLocation}
                  title={exp.title}
                  companyLocation={exp.companyLocation}
                  dateRange={exp.dateRange}
                  bullets={exp.bullets}
                  toggleShowText={dict.experienceDetailsShow}
                  toggleHideText={dict.experienceDetailsHide}
                />
              ))}
            </div>
          </section>

          {/* 05. EDUCATION & CERTS — Dual Card Showcase */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold font-mono text-[var(--accent-primary)] border-b-2 border-gray-400 dark:border-gray-700 pb-1">
              {dict.sectionEducation ?? '05. EDUCATION & CERTS'}
            </h2>

            <EducationSection data={dict.educationData} />
          </section>
        </div>
      </div>
    </Window>
  )
}
