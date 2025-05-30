/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./app/**/*.{js,jsx,ts,tsx}", // expo-router pasta
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require('nativewind/preset')],
  theme: {
     extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular", "sans-serif"],
        light: ["Poppins_300Light", "sans-serif"],
        medium: ["Poppins_500Medium", "sans-serif"],
        semibold: ["Poppins_600SemiBold", "sans-serif"],
      },

      colors:{
        "primary": "#429867",
        "secondary": "#2C2C2C",
      }
    },
  },
  plugins: [],
};
