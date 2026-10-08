import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { areaPath } from '../lib/spline'
import { formatProb } from '../lib/sampling'
import { PROMPT, type Token } from '../lib/tokens'

export type Sample = {
  id: number
  tokenIndex: number
}

type Marble = {
  id: number
  tokenIndex: number
  x: number
  y: number
  vx: number
  vy: number
  settled: boolean
}

type Layout = {
  width: number
  height: number
  plotX: number
  plotY: number
  plotW: number
  plotH: number
}

type Hover = {
  index: number
  x: number
  y: number
} | null

const VIEW_H = 472
const MIN_R = 1.35
const MAX_R = 4.6

function marbleRadius(total: number, binW: number, plotH: number) {
  const usable = plotH * 0.9
  const fit = usable / (2 * Math.max(total, 16) + 0.35)
  return Math.max(MIN_R, Math.min(MAX_R, binW * 0.34, fit))
}

function slotY(row: number, r: number, layout: Layout) {
  return layout.plotY + layout.plotH - r - 1.5 - row * 2 * r
}

export function DistributionChart({
  tokens,
  probs,
  samples,
}: {
  tokens: Token[]
  probs: number[]
  samples: Sample[]
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(960)
  const [marbles, setMarbles] = useState<Marble[]>([])
  const [hover, setHover] = useState<Hover>(null)
  const marblesRef = useRef<Marble[]>([])
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef(0)

  const layout = useMemo<Layout>(() => {
    const plotX = 12
    const plotY = 76
    const plotW = Math.max(width - 24, 100)
    const plotH = 300
    return { width, height: VIEW_H, plotX, plotY, plotW, plotH }
  }, [width])

  const { line, area } = useMemo(
    () => areaPath(probs, layout.plotX, layout.plotY, layout.plotW, layout.plotH),
    [probs, layout],
  )

  const binW = layout.plotW / tokens.length

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observe = () => setWidth(Math.max(el.clientWidth, 320))
    observe()
    const ro = new ResizeObserver(observe)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (samples.length === 0) {
      marblesRef.current = []
      setMarbles([])
      return
    }

    const known = new Set(marblesRef.current.map((m) => m.id))
    const incoming = samples.filter((s) => !known.has(s.id))
    if (incoming.length === 0) return

    const next = [...marblesRef.current]
    for (const sample of incoming) {
      const x = layout.plotX + (sample.tokenIndex + 0.5) * binW
      next.push({
        id: sample.id,
        tokenIndex: sample.tokenIndex,
        x,
        y: layout.plotY + 8,
        vx: (Math.random() - 0.5) * 18,
        vy: 28 + Math.random() * 36,
        settled: false,
      })
    }
    marblesRef.current = next
    setMarbles(next)
  }, [samples, binW, layout.plotX, layout.plotY])

  useEffect(() => {
    const tick = (now: number) => {
      const prevT = lastTimeRef.current || now
      lastTimeRef.current = now
      const dt = Math.min(0.033, (now - prevT) / 1000)

      const current = marblesRef.current
      if (current.length === 0 || current.every((m) => m.settled)) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const r = marbleRadius(current.length, binW, layout.plotH)

      const counts = Array.from({ length: tokens.length }, () => 0)
      const next: Marble[] = current.map((m) => {
        const row = counts[m.tokenIndex]
        counts[m.tokenIndex] += 1
        const targetX = layout.plotX + (m.tokenIndex + 0.5) * binW
        const targetY = slotY(row, r, layout)

        if (m.settled) {
          return {
            ...m,
            x: m.x + (targetX - m.x) * 0.22,
            y: m.y + (targetY - m.y) * 0.22,
          }
        }

        let { x, y, vx, vy } = m
        vy += 2650 * dt
        vx += (targetX - x) * 14 * dt
        vx *= 0.985
        x += vx * dt
        y += vy * dt

        if (y >= targetY) {
          y = targetY
          vy *= -0.28
          x += (targetX - x) * 0.35
          vx *= 0.45
          if (Math.abs(vy) < 55) {
            return { ...m, x: targetX, y: targetY, vx: 0, vy: 0, settled: true }
          }
        }

        return { ...m, x, y, vx, vy }
      })

      marblesRef.current = next
      setMarbles(next)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [binW, layout, tokens.length])

  const r = marbleRadius(marbles.length, binW, layout.plotH)

  function onMove(e: MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * layout.width
    const y = ((e.clientY - rect.top) / rect.height) * layout.height
    if (
      x < layout.plotX ||
      x > layout.plotX + layout.plotW ||
      y < layout.plotY ||
      y > layout.plotY + layout.plotH + 56
    ) {
      setHover(null)
      return
    }
    const index = Math.min(
      tokens.length - 1,
      Math.max(0, Math.floor((x - layout.plotX) / binW)),
    )
    setHover({ index, x, y })
  }

  const hoverToken = hover ? tokens[hover.index] : null
  const hoverProb = hover ? probs[hover.index] : 0

  return (
    <div className="chart-wrap" ref={wrapRef}>
      <svg
        className="chart"
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label="Token probability distribution"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop className="area-stop-top" offset="0%" />
            <stop className="area-stop-bottom" offset="100%" />
          </linearGradient>
          <radialGradient id="marbleFill" cx="32%" cy="28%" r="70%">
            <stop className="marble-stop-hi" offset="0%" />
            <stop className="marble-stop-mid" offset="55%" />
            <stop className="marble-stop-lo" offset="100%" />
          </radialGradient>
          <clipPath id="plotClip">
            <rect
              x={layout.plotX}
              y={layout.plotY}
              width={layout.plotW}
              height={layout.plotH}
            />
          </clipPath>
        </defs>

        {tokens.map((_, i) => (
          <line
            key={`g-${i}`}
            x1={layout.plotX + (i + 0.5) * binW}
            x2={layout.plotX + (i + 0.5) * binW}
            y1={layout.plotY}
            y2={layout.plotY + layout.plotH}
            className={`bin-guide${hover?.index === i ? ' active' : ''}`}
          />
        ))}

        <path d={area} fill="url(#areaFill)" clipPath="url(#plotClip)" />
        <path d={line} className="curve-stroke" clipPath="url(#plotClip)" />

        <line
          x1={layout.plotX}
          x2={layout.plotX + layout.plotW}
          y1={layout.plotY + layout.plotH}
          y2={layout.plotY + layout.plotH}
          className="baseline"
        />

        <g clipPath="url(#plotClip)">
          {marbles.map((m) => (
            <circle
              key={m.id}
              cx={m.x}
              cy={m.y}
              r={r}
              fill="url(#marbleFill)"
              className="marble"
            />
          ))}
        </g>

        {tokens.map((token, i) => {
          const x = layout.plotX + (i + 0.5) * binW
          const y = layout.plotY + layout.plotH + 14
          return (
            <text
              key={token.text}
              x={x}
              y={y}
              className={`tick${hover?.index === i ? ' active' : ''}`}
              transform={`rotate(-90 ${x} ${y})`}
              textAnchor="end"
            >
              {token.text}
            </text>
          )
        })}

        {hover && hoverToken && (
          <g className="tooltip" pointerEvents="none">
            <rect
              x={Math.min(hover.x + 12, layout.width - 168)}
              y={Math.max(hover.y - 46, 8)}
              width="156"
              height="40"
              rx="8"
            />
            <text
              x={Math.min(hover.x + 24, layout.width - 156)}
              y={Math.max(hover.y - 22, 32)}
            >
              {hoverToken.text}
              <tspan className="tip-prob"> {formatProb(hoverProb)}</tspan>
            </text>
          </g>
        )}
      </svg>

      <div className="prompt" aria-hidden="true">
        <span className="prompt-text">{PROMPT}</span>
        <span className="caret" />
      </div>

      <div className="chart-meta">
        n = {samples.length}
      </div>
    </div>
  )
}
