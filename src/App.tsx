import { useEffect, useMemo, useRef, useState } from 'react'
import { DistributionChart, type Sample } from './components/DistributionChart'
import { ParameterSlider } from './components/ParameterSlider'
import { SiteFooter } from './components/SiteFooter'
import {
  DEFAULT_PARAMS,
  sampleIndex,
  visualDistribution,
  type SamplingParams,
} from './lib/sampling'
import { DEFAULT_USE_CASE_ID, USE_CASES, getUseCase } from './lib/tokens'
import { Datenschutz } from './pages/Datenschutz'
import { Impressum } from './pages/Impressum'

type Theme = 'dark' | 'light'
type SortMode = 'sorted' | 'random'

const MARBLE_LIMIT = 150

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
}

function currentPath() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path === '' ? '/' : path
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  const [path, setPath] = useState(currentPath)
  const [useCaseId, setUseCaseId] = useState(DEFAULT_USE_CASE_ID)
  const [sortMode, setSortMode] = useState<SortMode>('sorted')
  const [params, setParams] = useState<SamplingParams>(DEFAULT_PARAMS)
  const [samples, setSamples] = useState<Sample[]>([])
  const [history, setHistory] = useState<string[]>([])
  const nextId = useRef(1)
  const runId = useRef(0)

  const useCase = getUseCase(useCaseId)
  const tokens = useMemo(
    () =>
      sortMode === 'sorted'
        ? useCase.tokens
        : useCase.randomOrder.map((index) => useCase.tokens[index]),
    [sortMode, useCase],
  )

  const probs = useMemo(
    () => visualDistribution(tokens.map((t) => t.baseProb), params),
    [params, tokens],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const onPop = () => setPath(currentPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.title =
      path === '/impressum'
        ? 'Impressum'
        : path === '/datenschutz'
          ? 'Datenschutz'
          : 'Sampling Playground'
  }, [path])

  function go(to: string) {
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('theme', next)
      return next
    })
  }

  function clearAll() {
    runId.current += 1
    setSamples([])
    setHistory([])
  }

  function update<K extends keyof SamplingParams>(key: K, value: SamplingParams[K]) {
    clearAll()
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  function sampleOnce() {
    if (samples.length >= MARBLE_LIMIT) return
    runId.current += 1
    const index = sampleIndex(probs)
    const id = nextId.current++
    setSamples((prev) => [...prev, { id, tokenIndex: index }])
    setHistory((prev) => [...prev, tokens[index].text])
  }

  function resetDefaults() {
    clearAll()
    setParams(DEFAULT_PARAMS)
  }

  function changeUseCase(id: string) {
    if (id === useCaseId) return
    clearAll()
    setParams(DEFAULT_PARAMS)
    setUseCaseId(id)
  }

  function changeSortMode(mode: SortMode) {
    if (mode === sortMode) return
    clearAll()
    setSortMode(mode)
  }

  async function sampleHundred() {
    const id = ++runId.current
    nextId.current = 1
    setSamples([])
    setHistory([])

    const drawn: Sample[] = []
    for (let i = 0; i < 100; i++) {
      await sleep(15)
      if (runId.current !== id) return
      const tokenIndex = sampleIndex(probs)
      drawn.push({ id: nextId.current++, tokenIndex })
      setSamples([...drawn])
    }
  }

  const isLegal = path === '/impressum' || path === '/datenschutz'

  return (
    <div className="page">
      {isLegal ? (
        <>
          <header className="header legal-header">
            <button type="button" className="text-btn" onClick={() => go('/')}>
              ← Playground
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to bright mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Bright mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </header>
          {path === '/impressum' ? <Impressum /> : <Datenschutz />}
        </>
      ) : (
        <>
          <header className="header">
            <div>
              <p className="eyebrow">Sampling</p>
              <h1>Next-token playground</h1>
              <p className="lede">
                How temperature, top-k, top-p, and min-p reshape sampling.
              </p>
            </div>
            <div className="header-actions">
              <button
                type="button"
                className="icon-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to bright mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Bright mode' : 'Dark mode'}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
              <button type="button" className="text-btn" onClick={resetDefaults}>
                Reset defaults
              </button>
            </div>
          </header>

          <details className="intro">
            <summary>What is this?</summary>
            <p>
              Many people think an LLM is just a next-word predictor. That is
              somewhat true, but classic transformers do not simply output the
              next most likely word or token when generating text. They sample
              from a distribution. That is why you get different answers from
              the same input. It is like drawing a marble from a bag. How many
              marbles each token has in the bag — and thus how likely it is to
              be drawn — depends on the trained weights given the previous
              token sequence, and can also be adjusted with the transformer’s
              hyperparameters. Here you can play with those hyperparameters,
              see the likelihood of drawing each token, and then sample a token
              from the bag.
            </p>
          </details>

          <section className="params">
            <ParameterSlider
              label="Temperature"
              value={params.temperature}
              min={0}
              max={10}
              step={0.01}
              display={params.temperature.toFixed(2)}
              help="Raises probabilities to 1/T and renormalizes — low values sharpen the peak, high values flatten the curve."
              onChange={(v) => update('temperature', v)}
            />
            <ParameterSlider
              label="Top-K"
              value={params.topK}
              min={1}
              max={50}
              step={1}
              display={String(params.topK)}
              help="Keeps only the K most likely tokens and sets every token beyond that cutoff to zero."
              onChange={(v) => update('topK', v)}
            />
            <ParameterSlider
              label="Top-P"
              value={params.topP}
              min={0}
              max={1}
              step={0.01}
              display={params.topP.toFixed(2)}
              help="Keeps the smallest leading set of tokens whose probabilities sum to P, then zeros the remaining tail."
              onChange={(v) => update('topP', v)}
            />
            <ParameterSlider
              label="Min-P"
              value={params.minP}
              min={0}
              max={1}
              step={0.01}
              display={params.minP.toFixed(2)}
              help="Zeros any token whose probability falls below P times the most likely token."
              onChange={(v) => update('minP', v)}
            />
          </section>

          <label className="usecase">
            <span className="param-label">Use case</span>
            <select
              value={useCaseId}
              onChange={(e) => changeUseCase(e.target.value)}
            >
              {USE_CASES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <DistributionChart
            key={`${useCaseId}-${sortMode}`}
            tokens={tokens}
            probs={probs}
            samples={samples}
            prompt={useCase.prompt}
            sortMode={sortMode}
            onSortModeChange={changeSortMode}
          />

          <section className="actions">
            <div className="action-row">
              <button
                type="button"
                className="btn primary"
                onClick={sampleOnce}
                disabled={samples.length >= MARBLE_LIMIT}
              >
                Sample next token
              </button>
              <button type="button" className="btn" onClick={clearAll}>
                Clear
              </button>
            </div>

            <div className="history" aria-live="polite">
              {history.length > 0
                ? history.map((token, i) => (
                    <span key={`${token}-${i}`} className="chip">
                      {token}
                    </span>
                  ))
                : samples.length === 0 && (
                    <span className="history-empty">Sampled tokens appear here</span>
                  )}
            </div>

            <button type="button" className="btn mass" onClick={sampleHundred}>
              Sample 100
            </button>
          </section>
        </>
      )}

      <SiteFooter onNavigate={go} />
    </div>
  )
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2l1.5 1.5M16.3 16.3l1.5 1.5M6.2 17.8l1.5-1.5M16.3 7.7l1.5-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M16.5 13.5A7 7 0 0 1 10.5 4 7 7 0 1 0 20 13.5a7 7 0 0 1-3.5 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
