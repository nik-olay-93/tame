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
        "primary-light": "#ffffff",
        "bg-light": "#edeef0",

        accent: "#a78bfa",

        "primary-dark": "#222222",
        "bg-dark": "#141414",
      },
    },
  },
  plugins: [],
};

