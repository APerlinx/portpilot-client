const GenPageFooter = () => {
  return (
    <footer className="border-t border-black mt-24 mx-12">
      <div>
        <div className="flex flex-row items-center gap-12 justify-center max-w-7xl mx-auto  py-6  ">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} PortPilot. All rights reserved.
          </div>
          {/* Links */}
          <div className="">
            <ul className="flex flex-row items-center gap-4 text-sm text-gray-500">
              <li>
                <a href="" className="hover:text-gray-400">
                  Terms
                </a>
              </li>
              <span>{'\u2022'}</span>
              <li>
                <a href="" className="hover:text-gray-400">
                  Privacy
                </a>
              </li>
              <span>{'\u2022'}</span>
              <li>
                <a href="" className="hover:text-gray-400">
                  help@portpilot.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 text-center mb-4 flex justify-center">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default GenPageFooter
