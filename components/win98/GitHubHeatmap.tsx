import React from 'react'
import { getGitHubContributions, ContributionLevel, GitHubContributions } from '@/lib/github'
import { HeatmapGrid } from './HeatmapGrid'

interface GitHubHeatmapProps {
  username: string
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

// REDESIGN: server component fetches data, delegates rendering to animated client component.
export async function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  let data = await getGitHubContributions(username)
  let isMock = false

  if (!data) {
    data = generateMockData()
    isMock = true
  }

  return (
    <HeatmapGrid
      weeks={data.weeks}
      totalContributions={data.totalContributions}
      isMock={isMock}
    />
  )
}
