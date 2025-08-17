import wave from '../assets/wave-haikei.svg'
import reactsvg from '../assets/react.svg'
const LandingPage = () => {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-[#0066FF] text-center overflow-hidden pt-28 min-h-screen">
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col items-center justify-center ">
            {' '}
            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Turn Your Resume Into a{' '}
              <span className="text-white">Live Portfolio</span>
            </h2>
            <p className="max-w-2xl mx-auto text-white mb-8">
              Upload your CV and let ScriptumLab analyze, rewrite, and build a
              modern website version of your professional story — automatically.
            </p>
            <a
              href="#cta"
              className="inline-block px-8 py-4 rounded-lg bg-black text-white text-lg font-semibold hover:bg-blue-700 transition"
            >
              Generate My Site
            </a>
          </div>
          <div className="flex items-center justify-center">
            <img src={reactsvg} />
          </div>
        </div>
      </section>
      <div className="">
        <img src={wave} className="w-full h-full object-cover" />
      </div>
      {/* FEATURES */}
      <section id="features" className=" bg-white">
        <div className="container mx-auto max-w-6xl px-4 ">
          <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl mb-4">📄</div>
              <h4 className="font-medium mb-2">Smart CV Parsing</h4>
              <p className="text-gray-600 text-sm">
                Upload PDF, DOCX or LinkedIn export — we extract everything you
                need.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="font-medium mb-2">Beautiful Templates</h4>
              <p className="text-gray-600 text-sm">
                Clean responsive layouts that make you stand out.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-medium mb-2">Instant Publishing</h4>
              <p className="text-gray-600 text-sm">
                One-click deploy to your own live URL — no coding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-28 bg-gray-50 text-center">
        <h3 className="text-4xl font-bold mb-6">Ready to stand out?</h3>
        <a
          href="#"
          className="inline-block px-10 py-5 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
        >
          Upload CV & Generate
        </a>
      </section>
    </main>
  )
}

export default LandingPage
