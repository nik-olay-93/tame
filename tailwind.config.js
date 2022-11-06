/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#edeef0",
          dark: "#222222",
        },

        background: {
          light: "#ffffff",
          dark: "#141414",
        },

        accent: { light: "#a78bfa", dark: "#a78bfa" },
      },
    },
  },
  plugins: [],
};

