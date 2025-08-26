import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-900 flex items-center justify-center md:justify-start">
              <img src={logo} alt="PortPilot Logo" className="h-12" /> PortPilot
            </h2>
            <p className="mt-3 text-sm text-gray-600 max-w-sm">
              Transform your resume into a live portfolio website in minutes.
              Stand out. Get noticed. Land interviews.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-right">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#features" className="hover:text-gray-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-gray-900">
                  How it works
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-gray-900">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PortPilot — All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
