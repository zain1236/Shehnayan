/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/src/Background/Home(b.g).png')",
        contact: "url('/src/Background/Contact(b.g1).png')",
        about: "url('/src/Background/AboutUs(b.g)-02-01.png')",
        postAd: "url('/src/Background/PostAd(b.g).png')",
        donate: "url('')",
        login: "url('/src/Background/Login(b.g).png')",
        register: "url('/src/Background/Register(b.g).png')",
      },
      screens: {
        md: "960px",
        lg: "1280px",
      },
    },
  },
  plugins: [require("daisyui")],
};
