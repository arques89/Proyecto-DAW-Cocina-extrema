import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./front/js/Layout";

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  </React.StrictMode>
);
