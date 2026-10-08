export type SamplingParams = {
  temperature: number
  topK: number
  topP: number
  minP: number
}

export const DEFAULT_PARAMS: SamplingParams = {
  temperature: 0.1,
  topK: 50,
  topP: 0.95,
  minP: 0.05,
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
  const kept = Array.from({ length: n }, () => true)
  const peak = Math.max(...probs, 0)

  for (let i = topK; i < n; i++) {
    kept[i] = false
  }

  let cumulative = 0
  let nucleus = n
  for (let i = 0; i < n; i++) {
    cumulative += probs[i]
    if (cumulative >= topP) {
      nucleus = i + 1
      break
    }
  }
  for (let i = nucleus; i < n; i++) {
    kept[i] = false
  }

  const minThreshold = minP * peak
  for (let i = 0; i < n; i++) {
    if (probs[i] < minThreshold) kept[i] = false
  }

  kept[0] = true

  return probs.map((p, i) => (kept[i] ? p : 0))
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
