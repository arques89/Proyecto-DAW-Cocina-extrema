import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { NavBar } from "./components/navbar";
// import { Footer } from "./components/footer";

import Home from "./pages/home";

import "../css/layout.css";
// import "../styles/media.css";
// import { Chefs } from './pages/chefs';
// import { upFile } from './pages/upFile/upFile';
// import { Concursantes } from './pages/concursantes';
// import { Login } from './pages/login/login';
// import { Register } from './pages/register/register';
// import { Dashboard } from './pages/dashboard/index';

import injectContext from "./store/appContext";
// import { ForgotPassword } from './pages/forgot_password/index';
const Layout = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        {/* <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/chefs" Component={Chefs} />
        <Route path="/concursantes" Component={Concursantes} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/forgot" Component={ForgotPassword} />
        <Route path="/form" Component={upFile} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default injectContext(Layout);
