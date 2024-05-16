import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "./pages/home";
import '../css/layout.css'
import { NavBar } from "./components/navbar";
import injectContext from "./store/appContext";
const Layout = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
