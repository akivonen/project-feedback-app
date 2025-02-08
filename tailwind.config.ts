import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#FFF",
      light: {
        100: "#F2F4FE",
        200: "#F7F8FD",
      },
      dark: {
        100: "#656EA3",
        200: "#647196",
        300: "#373F68",
        400: "#3A4374",
      },
      purple: {
        100: "#C75AF6",
        200: "#AD1FEA",
      },
      blue: {
        100: "#62BCFA",
        200: "#7C91F9",
        300: "#4661E6",
      },
      orange: {
        100: "#D73737",
      },
    },
    fontSize: {
      base: "1rem",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
