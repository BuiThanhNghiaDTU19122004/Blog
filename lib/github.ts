export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE'

export interface ContributionDay {
  contributionCount: number
  date: string
  contributionLevel: ContributionLevel
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface GitHubContributions {
  totalContributions: number
  weeks: ContributionWeek[]
}

export async function getGitHubContributions(username: string): Promise<GitHubContributions | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.warn('GITHUB_TOKEN is not set. Returning mock data or null.')
    return null
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // Cache the response for 1 hour
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.error('GitHub API returned an error:', await res.text())
      return null
    }

    const json = await res.json()
    if (json.errors) {
      console.error('GitHub GraphQL errors:', json.errors)
      return null
    }

    return json?.data?.user?.contributionsCollection?.contributionCalendar ?? null
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return null
  }
}
