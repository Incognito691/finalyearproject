const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export async function classifyMessage(message: string) {
  const r = await fetch(`${BASE}/classify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  if (!r.ok) throw new Error('Classify failed')
  return r.json()
}

export async function submitReport(number: string, category: string, message: string) {
  const r = await fetch(`${BASE}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number, category, message })
  })
  if (!r.ok) throw new Error('Report failed')
  return r.json()
}

export async function fetchNumber(number: string) {
  const r = await fetch(`${BASE}/number/${encodeURIComponent(number)}`)
  if (!r.ok) throw new Error('Number lookup failed')
  return r.json()
}

export async function fetchTrending() {
  const r = await fetch(`${BASE}/trending`)
  if (!r.ok) throw new Error('Trending fetch failed')
  return r.json()
}

export async function fetchDashboard() {
  const r = await fetch(`${BASE}/dashboard`)
  if (!r.ok) throw new Error('Dashboard fetch failed')
  return r.json()
}
