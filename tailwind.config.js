const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mmedia: "960px",
      // rest of the breakpoints
    },
    extend: {
      colors: {
        primary: "#C1BEB8",
        shape_red: "#FCECDF",
        shape_orange_2: "#E67817",
        shape_orange_hover: "#E6781780",
        shape_green: "#E2E6CE",
        shape_green_2: "#6D8108",
        shape_green_3: "#A4B064",
        shape_green_hover: "#6D810880",
        shape_white: "#FDFDFD",
        shape_green_light: "#C5DA58",
        shape_green_1: "#6D8108",
        shape_green_dark: "#324601",
        shape_orange_light: "#FEAA50",
        shape_orange_dark: "#E67817",
        shape_orange_radio: "#E37615",
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
  plugins: [],
});
