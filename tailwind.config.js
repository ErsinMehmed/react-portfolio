/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Single source of truth for brand blue. Change here only.
        // Manually mirrored in src/theme/colors.ts (raw-hex JS consumers,
        // e.g. QR code) and index.html (static pre-hydration markup that
        // renders before the JS bundle loads).
        brand: {
          DEFAULT: "#1b74e4",
          dark: "#1667cf",
        },
      },
      fontFamily: {
        sans: [
          '"Hanken Grotesk"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Bricolage Grotesque"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

