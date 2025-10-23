import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Header = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return
      if (e.target instanceof Node && !menuRef.current.contains(e.target))
        setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-200">
      <div className="container mx-auto max-w-7xl 2xl:max-w-full 2xl:px-8 px-4 py-3 flex items-center justify-between">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="PortPilot Logo" className="h-10 w-auto" />
            <span className="hidden sm:inline text-lg font-bold tracking-tight text-text">
              Port<span className="text-logo">Pilot</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-weak mt-1">
            <a href="#features" className="hover:text-text">
              Features
            </a>
            <a href="#how" className="hover:text-text">
              How It Works
            </a>
            <a href="#cta" className="hover:text-text">
              Generate
            </a>
          </nav>
        </div>

        {/* Right: auth actions + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <button className="rounded-md px-3 py-2 text-sm font-medium text-text-weak hover:text-text">
              Sign in
            </button>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-text-weak md:hidden"
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
      <div ref={menuRef} className={`md:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="border-t bg-white px-4 py-4 shadow-sm">
          <nav className="flex flex-col gap-3">
            <a
              href="#features"
              className="block rounded-md px-3 py-2 text-sm font-medium text-text-weak hover:bg-gray-50"
            >
              Features
            </a>
            <a
              href="#how"
              className="block rounded-md px-3 py-2 text-sm font-medium text-text-weak hover:bg-gray-50"
            >
              How It Works
            </a>
            <a
              href="#cta"
              className="block rounded-md px-3 py-2 text-sm font-medium text-text-weak hover:bg-gray-50"
            >
              Generate
            </a>
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/signin"
              className="block w-full rounded-md px-4 py-2 text-center text-sm font-medium text-text-weak hover:bg-gray-50"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
