import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";

import { Home } from "./pages/home/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Settings } from "./pages/setting/index";
// impor t ForgotPassword from "./pages/forgot_password/index";
import {  ForgotPassword } from "./pages/forgot_password/index";
import { Vlog } from "./pages/vlog";
import { VlogDetails } from "./pages/vlog/vlog-details";

import "../css/layout.css";
import "../css/media.css";
import "../css/styles.css";
import injectContext from "./store/appContext";

const Layout = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/vlog" element={<Vlog />} />
        <Route path="/vlog/:id" element={<VlogDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default injectContext(Layout);
