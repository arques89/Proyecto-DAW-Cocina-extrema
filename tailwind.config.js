const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    screens: {
      mmedia: "960px",
      // rest of the breakpoints
    },
    extend: {
      colors: {
        shape_primary: "#C1BEB8",
        shape_red: "#CE4F20",
        shape_border_button: "#707070",
        shape_input: "#B1AFA9",
        font_icon: "#979797",
        grey_span: "#5E5E5E",

        shape_green_2: "#6D8108",
        shape_green_3: "#A4B064",
      },
      width: {
        custom: "960px", // Cambia '50%' al valor de ancho que desees
      },
      heigth: {
        custo: "847px", // Cambia '50%' al valor de ancho que desees
      },
      fontFamily: {
        // 'sedgwick-ave-display': ['"Sedgwick Ave Display"', 'cursive'],
        // Aquí puedes añadir más fuentes personalizadas si lo necesitas
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class"
});
