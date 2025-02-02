import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--secondaryBackground)",
        container: "var(--containerBackground)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        accent: "var(--accent)",
        "accent-secondary": "var(--accent-secondary)",
        gradient: {
          start: "var(--gradient-start)",
          end: "var(--gradient-end)"
        }
      },
      fontFamily: {
        playwrite: ['var(--font-playwrite)'],
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, var(--gradient-start), var(--gradient-end))'
      }
    },
  },
  plugins: [],
} satisfies Config;