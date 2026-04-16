import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"]
      },
      colors: {
        cream: {
          DEFAULT: "#faf7f2",
          50: "#fdfcf8",
          100: "#faf7f2",
          200: "#f2ece0",
          300: "#e8ddc9"
        },
        ink: {
          DEFAULT: "#1a2321",
          900: "#0f1816",
          700: "#2a3632",
          500: "#4a5551",
          300: "#8a938e"
        },
        hhh: {
          50: "#f2f8f7",
          100: "#dfeeeb",
          200: "#bcddd7",
          300: "#8dc3ba",
          400: "#5ca69a",
          500: "#3c8a7e",
          600: "#2d7067",
          700: "#265a54",
          800: "#204945",
          900: "#1b3b38"
        },
        sun: {
          50: "#fef8ec",
          100: "#fbebc3",
          200: "#f7d78b",
          300: "#f3bd52",
          400: "#eea52c",
          500: "#d98a17",
          600: "#b36c12"
        },
        clay: {
          50: "#fbf3ee",
          100: "#f4e0d3",
          200: "#e6bea5",
          300: "#d49878"
        },
        brand: {
          50: "#f2f8f7",
          500: "#3c8a7e",
          700: "#265a54"
        }
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -12px rgba(38,90,84,0.18)",
        ring: "0 0 0 1px rgba(38,90,84,0.08), 0 20px 40px -24px rgba(38,90,84,0.28)"
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(1200px 400px at 50% -10%, rgba(60,138,126,0.18), transparent 70%)"
      }
    }
  },
  plugins: []
} satisfies Config;
