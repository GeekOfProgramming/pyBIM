/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          base: '#FFFFFF',          // Pure White
          surface: '#F1F5F9',       // Sky Blue / Light Gray (slate-100)
          surfaceHover: '#E2E8F0',  // Slightly darker gray for hover (slate-200)
          primary: '#2563EB',       // Royal Blue (Main Brand/Titles)
          accent: '#F97316',        // Vibrant Orange (Strictly CTAs)
          accentHover: '#EA580C',   // Darker Orange
          minor1: '#EAB308',        // Yellow (Tags)
          minor2: '#A855F7',        // Purple (Tags)
          textPrimary: '#0F172A',   // Deep Charcoal/Slate (slate-900)
          textSecondary: '#475569', // Muted text (slate-600)
          border: '#E2E8F0',        // Subtle borders (slate-200)
        }
      }
    }
  },
  plugins: []
};
