import type { MouseEvent } from 'react'

type SiteFooterProps = {
  onNavigate: (path: string) => void
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <footer className="site-footer">
      <a href="/impressum" onClick={(e) => handleClick(e, '/impressum')}>
        Impressum
      </a>
      <span className="footer-dot" aria-hidden="true">
        ·
      </span>
      <a href="/datenschutz" onClick={(e) => handleClick(e, '/datenschutz')}>
        Datenschutz
      </a>
    </footer>
  )
}
