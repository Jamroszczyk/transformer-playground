type Point = { x: number; y: number }

function monotoneCubicPath(points: Point[]): string {
  const n = points.length
  if (n === 0) return ''
  if (n === 1) return `M ${points[0].x} ${points[0].y}`

  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const dy: number[] = []
  const m: number[] = Array.from({ length: n }, () => 0)

  for (let i = 0; i < n - 1; i++) {
    dy[i] = (ys[i + 1] - ys[i]) / Math.max(xs[i + 1] - xs[i], 1e-9)
  }

  m[0] = dy[0]
  m[n - 1] = dy[n - 2]
  for (let i = 1; i < n - 1; i++) {
    if (dy[i - 1] * dy[i] <= 0) m[i] = 0
    else m[i] = (dy[i - 1] + dy[i]) / 2
  }

  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(dy[i]) < 1e-12) {
      m[i] = 0
      m[i + 1] = 0
    } else {
      const a = m[i] / dy[i]
      const b = m[i + 1] / dy[i]
      const s = a * a + b * b
      if (s > 9) {
        const t = 3 / Math.sqrt(s)
        m[i] = t * a * dy[i]
        m[i + 1] = t * b * dy[i]
      }
    }
  }

  let d = `M ${xs[0]} ${ys[0]}`
  for (let i = 0; i < n - 1; i++) {
    const dx = xs[i + 1] - xs[i]
    d += ` C ${xs[i] + dx / 3} ${ys[i] + (m[i] * dx) / 3}, ${xs[i + 1] - dx / 3} ${ys[i + 1] - (m[i + 1] * dx) / 3}, ${xs[i + 1]} ${ys[i + 1]}`
  }
  return d
}

export function areaPath(
  values: number[],
  x: number,
  y: number,
  width: number,
  height: number,
): { line: string; area: string } {
  const n = values.length
  if (n === 0) return { line: '', area: '' }

  const dx = width / n
  const yAt = (v: number) => y + height - Math.max(0, Math.min(1, v)) * height
  const points: Point[] = [
    { x, y: yAt(values[0]) },
    ...values.map((v, i) => ({
      x: x + dx * (i + 0.5),
      y: yAt(v),
    })),
    { x: x + width, y: yAt(values[n - 1]) },
  ]

  const line = monotoneCubicPath(points)
  const last = points[n - 1]
  const first = points[0]
  const base = y + height
  const area = `${line} L ${last.x} ${base} L ${first.x} ${base} Z`
  return { line, area }
}
