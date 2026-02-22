import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0a0e13",
          800: "#0f1419",
          700: "#151c24",
          600: "#1a232e",
          500: "#1f2937",
        },
        accent: {
          green: "#00ff88",
          red: "#ff3344",
          orange: "#ff8833",
          blue: "#3388ff",
          cyan: "#00ddff",
          yellow: "#ffdd00",
          purple: "#aa44ff",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
