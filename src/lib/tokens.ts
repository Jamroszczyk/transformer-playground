export type Token = {
  text: string
  baseProb: number
}

export type UseCaseNoteMore = {
  lead: string
  heading: string
  timeline: string[]
  after: string[]
}

export type UseCase = {
  id: string
  label: string
  prompt: string
  tokens: Token[]
  randomOrder: number[]
  note?: string
  noteMore?: UseCaseNoteMore
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function permutation(length: number, seed: number): number[] {
  const order = Array.from({ length }, (_, i) => i)
  const rand = mulberry32(seed)
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const current = order[i]
    order[i] = order[j]
    order[j] = current
  }
  return order
}

function withRandomOrder(
  useCase: Omit<UseCase, 'randomOrder'>,
  seed: number,
): UseCase {
  return {
    ...useCase,
    randomOrder: permutation(useCase.tokens.length, seed),
  }
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

const LANGUAGES = [
  'Python',
  'JavaScript',
  'Java',
  'TypeScript',
  'C++',
  'C',
  'Go',
  'Rust',
  'C#',
  'PHP',
  'Swift',
  'Kotlin',
  'Ruby',
  'SQL',
  'R',
  'Scala',
  'Dart',
  'Lua',
  'Haskell',
  'Perl',
] as const

const CITY_FILLERS = [
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

const PLACES = [
  'store',
  'park',
  'gym',
  'office',
  'beach',
  'mall',
  'market',
  'cafe',
  'library',
  'bank',
  'restaurant',
  'supermarket',
  'school',
  'station',
  'hospital',
  'movies',
  'airport',
  'university',
  'museum',
  'pool',
  'bakery',
  'pharmacy',
  'theater',
  'stadium',
  'hotel',
  'bar',
  'garden',
  'kitchen',
  'downtown',
  'garage',
  'zoo',
  'concert',
  'dentist',
  'doctor',
  'forest',
  'lake',
  'mountains',
  'river',
  'club',
  'harbor',
  'studio',
  'workshop',
  'balcony',
  'basement',
  'attic',
  'rooftop',
  'countryside',
  'bathroom',
  'bedroom',
  'porch',
] as const

const LANGUAGE_FILLERS = [
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
  'or',
  'an',
  'be',
  'not',
  'but',
  'maybe',
  'probably',
  'clearly',
  'obviously',
  'just',
  'really',
  'still',
  'always',
  'none',
] as const

const INVENTORS = [
  'Edison',
  'Davy',
  'Swan',
  'Rue',
] as const

const INVENTOR_OTHERS = [
  'Tesla',
  'Faraday',
  'Franklin',
  'Bell',
  'Newton',
  'Einstein',
  'Ford',
  'Watt',
  'Morse',
  'Volta',
  'Ampere',
  'Ohm',
  'Maxwell',
  'Marconi',
  'Gutenberg',
  'Wright',
  'Benz',
  'Diesel',
  'Pasteur',
  'Smith',
  'Johnson',
  'Brown',
  'Miller',
  'Jones',
  'Williams',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'someone',
  'nobody',
  'unknown',
  'maybe',
  'possibly',
  'actually',
  'perhaps',
  'the',
  'of',
  'a',
  'in',
  'to',
  'and',
  'is',
  'for',
  'that',
  'who',
] as const

function normalize(names: readonly string[], weights: number[]): Token[] {
  const sum = weights.reduce((a, b) => a + b, 0)
  return names
    .map((text, i) => ({
      text,
      baseProb: weights[i] / sum,
    }))
    .sort((a, b) => b.baseProb - a.baseProb)
}

function peakedCityWeights(): number[] {
  const weights: number[] = []
  weights.push(4.6)
  weights.push(1.15)
  for (let i = 0; i < 8; i++) {
    weights.push(0.82 * Math.pow(0.78, i))
  }
  for (let i = 0; i < 40; i++) {
    weights.push(0.11 * Math.pow(0.88, i))
  }
  return weights
}

function nearlyUniformWeights(count: number): number[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(count - 1, 1)
    return 1.12 - 0.24 * t
  })
}

function flatterLanguageProbs(count: number): number[] {
  const head = [0.1, 0.08, 0.05]
  const remaining = 1 - head.reduce((a, b) => a + b, 0)
  const restCount = count - head.length
  const ratio = 0.955
  const raw = Array.from({ length: restCount }, (_, i) => Math.pow(ratio, i))
  const rawSum = raw.reduce((a, b) => a + b, 0)
  const rest = raw.map((weight) => (weight / rawSum) * remaining)
  return [...head, ...rest]
}

function inventorProbs(count: number): number[] {
  const head = [0.42, 0.21, 0.19, 0.09]
  const remaining = 1 - head.reduce((a, b) => a + b, 0)
  const restCount = count - head.length
  const raw = Array.from({ length: restCount }, (_, i) => Math.pow(0.92, i))
  const rawSum = raw.reduce((a, b) => a + b, 0)
  return [...head, ...raw.map((weight) => (weight / rawSum) * remaining)]
}

const LANGUAGE_NAMES = [...LANGUAGES, ...LANGUAGE_FILLERS]
const LANGUAGE_PROBS = flatterLanguageProbs(LANGUAGE_NAMES.length)

const INVENTOR_NAMES = [...INVENTORS, ...INVENTOR_OTHERS]
const INVENTOR_PROBS = inventorProbs(INVENTOR_NAMES.length)

export const USE_CASES: UseCase[] = [
  withRandomOrder(
    {
      id: 'germany',
      label: 'Capital of Germany',
      prompt: 'The capital of Germany is',
      tokens: normalize([...CITIES, ...CITY_FILLERS], peakedCityWeights()),
    },
    1101,
  ),
  withRandomOrder(
    {
      id: 'languages',
      label: 'Best programming language',
      prompt: 'The best programming language is',
      tokens: LANGUAGE_NAMES.map((text, i) => ({
        text,
        baseProb: LANGUAGE_PROBS[i],
      })),
    },
    2202,
  ),
  withRandomOrder(
    {
      id: 'places',
      label: 'I am going to the',
      prompt: 'I am going to the',
      tokens: normalize(PLACES, nearlyUniformWeights(PLACES.length)),
    },
    3303,
  ),
  withRandomOrder(
    {
      id: 'lightbulb',
      label: 'Lightbulb inventor',
      prompt: 'The lightbulb was invented by',
      note: 'If popular but incorrect information is used as training data, the model can confidently present the incorrect information as fact.',
      noteMore: {
        lead: 'The invention of the lightbulb was a shared research effort to which many people contributed.',
        heading: 'Key inventors and timeline (among others)',
        timeline: [
          'Humphry Davy (1802)',
          'Warren de la Rue (1840)',
          'Joseph Swan (1878/1879)',
          'Thomas Edison (1879)',
        ],
        after: [
          'Edison is discussed much more often than the other contributors, for various reasons. One is his role in the first commercial lightbulb, which may have linked the idea of the lightbulb to Edison for many ordinary people. As a result, the weights connecting the concept of the lightbulb and Edison are overrepresented during training.',
          'This can happen with all sorts of misinformation.',
        ],
      },
      tokens: INVENTOR_NAMES.map((text, i) => ({
        text,
        baseProb: INVENTOR_PROBS[i],
      })),
    },
    4404,
  ),
]

export const DEFAULT_USE_CASE_ID = USE_CASES[0].id

export function getUseCase(id: string): UseCase {
  return USE_CASES.find((item) => item.id === id) ?? USE_CASES[0]
}
