import wave from '../assets/wave.svg'
import sideImage from '../assets/hero-image.png'
import Feature from './Feature'
import Step from './Step'

import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className="text-gray-900 antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#3B9797]">
        <div className="mx-auto grid min-h-[80vh] max-w-7xl 2xl:max-w-full grid-cols-1 items-center gap-10 2xl:gap-0 px-6 py-24 2xl:px-24 md:min-h-[100vh] md:grid-cols-2">
          {/* Left */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl 2xl:text-8xl">
              Turn your resume into a{' '}
              <span className="text-third">Live Portfolio</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/90 md:mx-0 2xl:text-lg">
              Upload your CV and let PortPilot analyze, rewrite, and build a
              modern website version of your professional story, automatically.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-start">
              <Link
                to="/generator"
                className="inline-flex items-center justify-center rounded-lg 2xl:text-lg bg-third px-7 py-3 text-white shadow-lg transition hover:bg-gray-800"
              >
                Generate My Site
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-lg 2xl:text-lg bg-white/10 px-7 py-3 text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right – 3D styled preview mockup */}
          <div className="relative flex items-center justify-center perspective-1000 z-10">
            <div className="relative transform-gpu rotate-y-6 rotate-x-2 scale-[0.98] transition-transform duration-700 hover:rotate-y-0 hover:scale-100">
              <img
                src={sideImage}
                alt="PortPilot generated portfolio preview"
                loading="eager"
                className="w-[520px] 2xl:w-[620px] max-w-full rounded-2xl border border-white/10 shadow-[0_25px_70px_-10px_rgba(0,0,0,0.45)]"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    '0 20px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset',
                }}
              />

              {/* Subtle light reflection overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.15) 100%)',
                  mixBlendMode: 'overlay',
                }}
              />

              {/* Glow underneath */}
              <div
                className="absolute left-1/2 top-full h-10 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full translate-y-1">
          <img
            src={wave}
            alt=""
            className="block h-32 w-full select-none object-cover md:h-40"
          />
        </div>
      </section>

      {/* TRUST / LOGOS */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-sm uppercase tracking-widest text-gray-500 2xl:text-lg">
            Portfolios that feel professional
          </p>
          <div className="grid grid-cols-2 items-center justify-items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Features</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Everything you need to go from resume to live portfolio. fast,
            polished, and mobile-first.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              emoji="📄"
              title="Smart CV Parsing"
              text="Upload PDF, DOCX or LinkedIn export. we extract roles, dates, skills, and achievements."
              variant="primary"
            />
            <Feature
              emoji="🎨"
              title="Beautiful Templates"
              text="Clean, responsive themes with smart typography and spacing out of the box."
              variant="third"
            />
            <Feature
              emoji="🚀"
              title="Instant Publishing"
              text="Preview instantly, then deploy to a custom URL. no code needed."
              variant="fourth"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">How it works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            A simple three-step flow that turns your resume into a live,
            shareable portfolio.
          </p>

          <ol className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            <Step num={1} title="Upload or Paste">
              Upload your resume (PDF/DOCX) or paste text. You can edit and
              tweak the extracted content before generating your site.
            </Step>
            <Step num={2} title="Generate (AI)">
              Click Generate, our OpenAI-powered engine receives your resume,
              creates a fully styled HTML site tailored to your experience, and
              returns it instantly.
            </Step>
            <Step num={3} title="Preview, Edit & Publish">
              Preview or download your generated site, make small edits in the
              UI if you like, then publish to make it live. quick and simple.
            </Step>
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS (removed) */}

      {/* FINAL CTA */}
      <section id="cta" className=" py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold">Ready to stand out?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Turn your static resume into a modern, mobile-friendly portfolio in
            minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-lg transition hover:brightness-95"
            >
              Upload CV & Generate
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-50"
            >
              Explore features
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
