import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex justify-center items-center">
          <img src={logo} alt="PortPilot Logo" className="h-12" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Port<span className="text-logo">Pilot</span>
          </h1>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-gray-900">
            Features
          </a>
          <a href="#how" className="hover:text-gray-900">
            How It Works
          </a>
          <a href="#cta" className="hover:text-gray-900">
            Generate
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
