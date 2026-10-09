/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.025em' }],       // 56px / 64px
        section: ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.02em' }],        // 40px / 48px
        'section-sm': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em' }], // 32px / 40px
        'card-title': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],   // 24px / 32px
        lead: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.005em' }],     // 18px / 28px
        body: ['1rem', { lineHeight: '1.625rem' }],                                   // 16px / 26px
        'body-sm': ['0.875rem', { lineHeight: '1.375rem' }],                          // 14px / 22px
        caption: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.04em' }],    // 12px / 18px
        technical: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],   // 11px / 16px
      },
      colors: {
        brand: {
          base: 'rgb(var(--brand-base) / <alpha-value>)',
          surface: 'rgb(var(--brand-surface) / <alpha-value>)',
          surfaceHover: 'rgb(var(--brand-surfaceHover) / <alpha-value>)',
          card: 'rgb(var(--brand-card) / <alpha-value>)',
          cardElevated: 'rgb(var(--brand-cardElevated) / <alpha-value>)',
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          primaryHover: 'rgb(var(--brand-primaryHover) / <alpha-value>)',
          actionPrimary: 'rgb(var(--brand-actionPrimary) / <alpha-value>)',
          actionPrimaryHover: 'rgb(var(--brand-actionPrimaryHover) / <alpha-value>)',
          actionOnPrimary: 'rgb(var(--brand-actionOnPrimary) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
          accentHover: 'rgb(var(--brand-accentHover) / <alpha-value>)',
          accentAction: 'rgb(var(--brand-accentAction) / <alpha-value>)',
          accentOnAction: 'rgb(var(--brand-accentOnAction) / <alpha-value>)',
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
