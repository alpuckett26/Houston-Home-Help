import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f9ff",
          500: "#1e4f7a",
          700: "#113a60"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
