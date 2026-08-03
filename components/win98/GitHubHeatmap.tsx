import React from 'react'
import { getGitHubContributions, ContributionLevel, GitHubContributions } from '@/lib/github'

interface GitHubHeatmapProps {
  username: string
}

function getLevelClasses(level: ContributionLevel) {
  switch (level) {
    case 'NONE':
      return 'bg-gray-200 dark:bg-gray-800'
    case 'FIRST_QUARTILE':
      return 'bg-blue-300 dark:bg-cyan-900'
    case 'SECOND_QUARTILE':
      return 'bg-blue-500 dark:bg-cyan-700'
    case 'THIRD_QUARTILE':
      return 'bg-blue-700 dark:bg-cyan-500'
    case 'FOURTH_QUARTILE':
      return 'bg-[#000080] dark:bg-cyan-300'
    default:
      return 'bg-gray-200 dark:bg-gray-800'
  }
}

// Generate mock data if token is missing
function generateMockData(): GitHubContributions {
  const weeks = []
  const today = new Date()
  
  for (let w = 0; w < 53; w++) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (53 * 7) + (w * 7) + d)
      
      // Random distribution weighted towards NONE
      const rand = Math.random()
      let level: ContributionLevel = 'NONE'
      let count = 0
      
      if (rand > 0.95) {
        level = 'FOURTH_QUARTILE'
        count = Math.floor(Math.random() * 10) + 15
      } else if (rand > 0.85) {
        level = 'THIRD_QUARTILE'
        count = Math.floor(Math.random() * 5) + 8
      } else if (rand > 0.7) {
        level = 'SECOND_QUARTILE'
        count = Math.floor(Math.random() * 4) + 4
      } else if (rand > 0.5) {
        level = 'FIRST_QUARTILE'
        count = Math.floor(Math.random() * 3) + 1
      }
      
      days.push({
        date: date.toISOString().split('T')[0],
        contributionCount: count,
        contributionLevel: level
      })
    }
    weeks.push({ contributionDays: days })
  }
  
  return {
    totalContributions: weeks.reduce((acc, w) => acc + w.contributionDays.reduce((a, d) => a + d.contributionCount, 0), 0),
    weeks
  }
}

export async function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  let data = await getGitHubContributions(username)
  let isMock = false

  if (!data) {
    // Fallback to mock data if token is not set
    data = generateMockData()
    isMock = true
  }

  return (
    <div className="w-full space-y-2">
      {isMock && (
        <div className="text-xs text-red-600 dark:text-red-400 font-bold mb-2 text-center bg-red-100 dark:bg-red-900/30 p-2 border border-red-300">
          ⚠️ GITHUB_TOKEN not found in .env.local - Showing Mock Data
        </div>
      )}
      
      <div className="flex justify-between items-end mb-2 text-xs font-mono text-[var(--text-muted)] px-1">
        <span>{data.totalContributions.toLocaleString()} contributions in the last year</span>
      </div>

      <div className="bg-[var(--bg-surface-inset)] p-4 border border-[var(--border-shadow)] rounded-sm overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {data.weeks.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-1">
              {week.contributionDays.map((day, dIndex) => (
                <div
                  key={dIndex}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                  className={`w-3 h-3 rounded-sm ${getLevelClasses(day.contributionLevel)} border border-black/10 dark:border-white/5 transition-colors duration-200 hover:border-black dark:hover:border-white`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-[var(--text-muted)] mt-2 pr-1">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-800 border border-black/10 dark:border-white/5" />
          <div className="w-3 h-3 rounded-sm bg-blue-300 dark:bg-cyan-900 border border-black/10 dark:border-white/5" />
          <div className="w-3 h-3 rounded-sm bg-blue-500 dark:bg-cyan-700 border border-black/10 dark:border-white/5" />
          <div className="w-3 h-3 rounded-sm bg-blue-700 dark:bg-cyan-500 border border-black/10 dark:border-white/5" />
          <div className="w-3 h-3 rounded-sm bg-[#000080] dark:bg-cyan-300 border border-black/10 dark:border-white/5" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
