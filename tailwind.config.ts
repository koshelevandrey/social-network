import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in-from-bottom": "fadeInWithTranslateY 0.3s linear forwards",
        "snap-heart": "snapHeart 1s linear forwards",
      },
      keyframes: {
        fadeInWithTranslateY: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        snapHeart: {
          "0%": { transform: "scale(1, 1)", filter: "brightness(0.5)" },
          "30%": {
            transform: "scale(1.25, 0.75)",
          },
          "40%": {
            transform: "scale(0.75, 1.25)",
          },
          "50%": {
            transform: "scale(1.15, 0.85)",
            filter: "brightness(1)",
          },
          "65%": {
            transform: "scale(.95, 1.05)",
          },
          "75%": {
            transform: "scale(1.05, .95)",
          },
          "100%": {
            transform: "scale(1, 1)",
            filter: "brightness(1)",
          },
        },
      },
      fontFamily: {
        spaceGrotesk: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
