import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#121213",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["luxury", "forest"],
  },
};
