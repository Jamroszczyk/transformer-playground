export type Token = {
  text: string
  baseProb: number
}

const CITIES = [
  'Berlin',
  'Bonn',
  'Hamburg',
  'Munich',
  'Frankfurt',
  'Cologne',
  'Stuttgart',
  'Düsseldorf',
  'Leipzig',
  'Dresden',
] as const

const FILLER_WORDS = [
  'the',
  'of',
  'a',
  'in',
  'to',
  'and',
  'is',
  'for',
  'that',
  'on',
  'with',
  'as',
  'by',
  'from',
  'at',
  'this',
  'which',
  'or',
  'an',
  'be',
  'are',
  'was',
  'were',
  'been',
  'have',
  'has',
  'had',
  'not',
  'but',
  'they',
  'their',
  'there',
  'then',
  'than',
  'when',
  'what',
  'who',
  'how',
  'all',
  'can',
] as const

function rawWeights(): number[] {
  const weights: number[] = []

  // Berlin dominates; Bonn is a clear but much smaller second.
  weights.push(4.6)
  weights.push(1.15)

  // Eight other major German cities, tapering down.
  for (let i = 0; i < 8; i++) {
    weights.push(0.82 * Math.pow(0.78, i))
  }

  // Forty common single-token words, continuing the decay.
  for (let i = 0; i < 40; i++) {
    weights.push(0.11 * Math.pow(0.88, i))
  }

  return weights
}

function buildTokens(): Token[] {
  const names = [...CITIES, ...FILLER_WORDS]
  const weights = rawWeights()
  const sum = weights.reduce((a, b) => a + b, 0)

  return names.map((text, i) => ({
    text,
    baseProb: weights[i] / sum,
  }))
}

export const TOKENS: Token[] = buildTokens()
export const PROMPT = 'The capital of Germany is'
export const TOKEN_COUNT = TOKENS.length
