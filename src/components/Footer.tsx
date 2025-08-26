const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-10 mt-24">
      <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PortPilot — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
