// TODO : Close when scrolling

import { memo, useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

type NavItem = { label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Generate', href: '#cta' },
]

const FOOTER_LINKS: NavItem[] = [
  { label: 'Contact us', href: '#contact' },
  { label: 'Help', href: '#help' },
  { label: 'About us', href: '#about' },
]

const YEAR = new Date().getFullYear()

const Header = memo(function Header() {
  const [open, setOpen] = useState(false)

  const headerRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const menuButtonId = useId()
  const menuPanelId = useId()

  const closeMenu = useCallback(() => setOpen(false), [])
  const toggleMenu = useCallback(() => setOpen((s) => !s), [])

  // Close on outside click / Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const headerEl = headerRef.current
      if (!headerEl) return
      // If click is inside the header, ignore
      if (e.target instanceof Node && headerEl.contains(e.target)) return
      setOpen(false)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (!open || !menuRef.current) return
    const first = menuRef.current.querySelector<HTMLElement>(
      "a, button, [tabindex]:not([tabindex='-1'])"
    )
    first?.focus()
  }, [open])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white backdrop-blur"
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3 2xl:max-w-full 2xl:px-8">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center"
            aria-label="PortPilot home"
          >
            <img src={logo} alt="" className="h-10 w-auto" />
            <span className="text-xl font-bold tracking-tight text-text">
              Port<span className="text-logo">Pilot</span>
            </span>
          </Link>

          <nav className="mt-1 hidden items-center gap-6 text-sm font-medium text-text-weak md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: auth actions + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/signin"
              className="rounded-md px-3 py-2 text-sm font-medium text-text-weak hover:text-text"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            id={menuButtonId}
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls={menuPanelId}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-text-weak md:hidden"
            data-state={open ? 'open' : 'closed'}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        id={menuPanelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuButtonId}
        aria-hidden={!open}
        className="z-50 md:hidden border-t border-gray-50"
      >
        <div className="bg-white shadow-2xl">
          <div
            className={[
              'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out',
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            ].join(' ')}
          >
            <div className="min-h-0">
              <div className="pt-4">
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={[
                        'block rounded-md px-6 py-2 text-lg font-medium text-text hover:bg-gray-50',
                        'transition duration-100 ease-out will-change-transform',
                        open
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 -translate-y-1',
                      ].join(' ')}
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-3 bg-gray-50">
                  <div className="flex flex-col items-start gap-2 px-6 pt-4 text-sm text-gray-700">
                    {FOOTER_LINKS.map((item, i) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={[
                          'hover:underline transition duration-100 ease-out will-change-transform',
                          open
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-1',
                        ].join(' ')}
                        style={{
                          transitionDelay: `${(NAV_ITEMS.length + i) * 40}ms`,
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>

                  <div
                    className={[
                      'px-6 py-4 text-sm text-gray-500 transition duration-100 ease-out will-change-transform',
                      open
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-1',
                    ].join(' ')}
                    style={{
                      transitionDelay: `${
                        (NAV_ITEMS.length + FOOTER_LINKS.length) * 40
                      }ms`,
                    }}
                  >
                    © {YEAR} PortPilot
                  </div>
                </div>

                <div
                  className={[
                    'flex flex-row items-center justify-center gap-3 border-t py-4 ',
                    'transition duration-200 ease-out will-change-transform',
                    open
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-1',
                  ].join(' ')}
                  style={{
                    transitionDelay: `${
                      (NAV_ITEMS.length + FOOTER_LINKS.length + 1) * 40
                    }ms`,
                  }}
                >
                  <Link
                    to="/signin"
                    onClick={closeMenu}
                    className="rounded-md border border-secondary px-[60.5px] py-[7px] text-sm font-medium text-text-weak"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="inline-flex rounded-md bg-primary px-12 py-2 text-sm font-semibold text-white"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
})

export default Header
