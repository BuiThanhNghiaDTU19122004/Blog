import { Window } from '@/components/win98/Window'
import { GitHubHeatmap } from '@/components/win98/GitHubHeatmap'
import { getDictionary } from '@/lib/i18n/dictionary'

interface GitHubPageProps {
  params: Promise<{ locale: string }>
}

export default async function GitHubPage({ params }: GitHubPageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <Window
      title={`GitHub Contributions - [profile.exe]`}
      icon="🐱"
      address="https://github.com/BuiThanhNghiaDTU19122004"
      statusText={`${dict.systemStatus} | Fetching contribution data... OK`}
    >
      <div className="bg-[var(--bg-surface-inset)] border-2 border-[var(--border-dark)] p-4 sm:p-6 shadow-inner min-h-[300px] flex flex-col items-center justify-center">
        <h2 className="font-heading font-bold text-xl text-[var(--accent-primary)] mb-6 text-center">
          GitHub Contribution Heatmap
        </h2>
        
        {/* In-house zero-dependency React Server Component using GitHub GraphQL */}
        <div className="w-full max-w-4xl">
          <GitHubHeatmap username="BuiThanhNghiaDTU19122004" />
        </div>

        <div className="mt-8 text-center text-xs font-mono text-[var(--text-muted)]">
          <p>Data provided by GitHub GraphQL API</p>
          <a 
            href="https://github.com/BuiThanhNghiaDTU19122004" 
            target="_blank" 
            rel="noreferrer"
            className="text-[var(--accent-primary)] hover:underline mt-2 inline-block"
          >
            [View Full Profile on GitHub]
          </a>
        </div>
      </div>
    </Window>
  )
}
