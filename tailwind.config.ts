import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090B",
        secondaryBg: "#0D1117",
        cardBg: "#12161F",
        cardHover: "#181E2B",
        primaryText: "#F5F5F5",
        secondaryText: "#9CA3AF",
        accent: {
          DEFAULT: "#C9A86A",
          light: "#E2C78E",
          dark: "#A38244",
          muted: "rgba(201, 168, 106, 0.15)",
        },
        borderBase: "rgba(255, 255, 255, 0.08)",
        borderHover: "rgba(201, 168, 106, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
      },
      keyframes: {
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(201, 168, 106, 0.2)" },
          "50%": { borderColor: "rgba(201, 168, 106, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
