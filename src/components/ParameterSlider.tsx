import type { CSSProperties } from 'react'

type ParameterSliderProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  help: string
  display: string
  onChange: (value: number) => void
}

export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  help,
  display,
  onChange,
}: ParameterSliderProps) {
  const progress = ((value - min) / (max - min)) * 100

  return (
    <label className="param">
      <div className="param-head">
        <span className="param-label">{label}</span>
        <span className="param-value">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--progress': `${progress}%` } as CSSProperties}
      />
      <p className="param-help">{help}</p>
    </label>
  )
}
