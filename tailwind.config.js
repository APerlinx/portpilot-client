/** @type {import('tailwindcss').Config} */
function withOpacity(varName) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) return `rgb(var(${varName}))`
    return `rgb(var(${varName}) / ${opacityValue})`
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-main-rgb'),
        secondary: withOpacity('--color-secondary-rgb'),
        third: withOpacity('--color-third-rgb'),
        fourth: withOpacity('--color-fourth-rgb'),
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        'text-weak': 'var(--color-text-weak)',
        muted: 'var(--gray-500)',
        logo: 'var(--color-fourth)',
      },
    },
  },
  plugins: [],
}
