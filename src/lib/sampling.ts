export type SamplingParams = {
  temperature: number
  topK: number
  topP: number
  minP: number
}

export const DEFAULT_PARAMS: SamplingParams = {
  temperature: 1,
  topK: 50,
  topP: 1,
  minP: 0,
}

export function applyTemperature(probs: number[], temperature: number): number[] {
  if (temperature <= 1e-8) {
    let maxIdx = 0
    for (let i = 1; i < probs.length; i++) {
      if (probs[i] > probs[maxIdx]) maxIdx = i
    }
    return probs.map((_, i) => (i === maxIdx ? 1 : 0))
  }

  const invT = 1 / temperature
  const scaled = probs.map((p) => Math.pow(Math.max(p, 1e-15), invT))
  const sum = scaled.reduce((a, b) => a + b, 0)
  return scaled.map((s) => s / sum)
}

export function applyFilters(
  probs: number[],
  { topK, topP, minP }: Pick<SamplingParams, 'topK' | 'topP' | 'minP'>,
): number[] {
  const n = probs.length
  if (n === 0) return []

  const ranked = Array.from({ length: n }, (_, i) => i).sort(
    (a, b) => probs[b] - probs[a] || a - b,
  )
  const peak = probs[ranked[0]] ?? 0
  const minThreshold = minP * peak

  const topKSet = new Set(ranked.slice(0, Math.max(1, topK)))

  const nucleus = new Set<number>()
  let cumulative = 0
  for (const index of ranked) {
    nucleus.add(index)
    cumulative += probs[index]
    if (cumulative >= topP) break
  }

  const maxIdx = ranked[0]

  return probs.map((p, i) => {
    if (i === maxIdx) return p
    if (!topKSet.has(i) || !nucleus.has(i) || p < minThreshold) return 0
    return p
  })
}

export function visualDistribution(
  baseProbs: number[],
  params: SamplingParams,
): number[] {
  const tempered = applyTemperature(baseProbs, params.temperature)
  return applyFilters(tempered, params)
}

export function sampleIndex(visualProbs: number[]): number {
  const sum = visualProbs.reduce((a, b) => a + b, 0)
  if (sum <= 0) return 0

  let cursor = Math.random() * sum
  for (let i = 0; i < visualProbs.length; i++) {
    cursor -= visualProbs[i]
    if (cursor <= 0) return i
  }
  return visualProbs.length - 1
}

export function formatProb(p: number): string {
  if (p <= 0) return '0%'
  if (p < 0.0001) return '<0.01%'
  if (p < 0.01) return `${(p * 100).toFixed(2)}%`
  return `${(p * 100).toFixed(1)}%`
}
