/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          base: 'rgb(var(--brand-base) / <alpha-value>)',
          surface: 'rgb(var(--brand-surface) / <alpha-value>)',
          surfaceHover: 'rgb(var(--brand-surfaceHover) / <alpha-value>)',
          card: 'rgb(var(--brand-card) / <alpha-value>)',
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          primaryHover: 'rgb(var(--brand-primaryHover) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
          accentHover: 'rgb(var(--brand-accentHover) / <alpha-value>)',
          minor1: '#EAB308',
          minor2: '#A855F7',
          textPrimary: 'rgb(var(--brand-textPrimary) / <alpha-value>)',
          textSecondary: 'rgb(var(--brand-textSecondary) / <alpha-value>)',
          border: 'rgb(var(--brand-border) / <alpha-value>)',
        }
      }
    }
  },
  plugins: []
};
