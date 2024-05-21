import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";

import Home from "./pages/home/home";

import "../css/layout.css";
import "../css/media.css";
import "../css/styles.css";
// import { Chefs } from './pages/chefs';
// import { upFile } from './pages/upFile/upFile';
// import { Concursantes } from './pages/concursantes';
// import { Dashboard } from './pages/dashboard/index';

import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Settings } from "./pages/setting";
import { Prueba } from "./components/prueba";
import { ForgotPassword } from './pages/forgot_password/index';
const Layout = () => {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/settings" Component={Settings} />
        <Route path="/prueba" Component={Prueba} />
        {/* <Route path="/chefs" Component={Chefs} /> */}
        {/* <Route path="/concursantes" Component={Concursantes} /> */}
        {/* <Route path="/dashboard" Component={Dashboard} /> */}
        <Route path="/forgot" Component={ForgotPassword} />
        {/* <Route path="/form" Component={upFile} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default injectContext(Layout);
