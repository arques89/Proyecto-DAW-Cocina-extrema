import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";

import { Home } from "./pages/home/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgot_password/index";

import { Settings } from "./pages/setting/index";

import { Vlog } from "./pages/vlog";
import { VlogDetails } from "./pages/vlog/vlog-details";

import { Toaster } from "react-hot-toast";
import injectContext from "./store/appContext";

import { School } from "./pages/school/school";
import { Programa } from "./pages/programa/programa";
import { Content } from "./pages/content/index";
import { Introduction } from "./pages/content/introduction";

import { Carrito } from "./pages/carrito/index";
import { Cesta } from "./pages/carrito/cesta";
import { Envio } from "./pages/carrito/envio";
import { Pago } from "./pages/carrito/pago";

import { AvesHuevos } from "./pages/content/aves";
import { Carnes } from "./pages/content/carnes";
import { Pescados } from "./pages/content/pescados";
import { Verduras } from "./pages/content/verduras";
import { Lacteos } from "./pages/content/lacteos";
import { Pastas } from "./pages/content/pastas";
import { Panaderia } from "./pages/content/panaderia";
import { Reposteria } from "./pages/content/reposteria";
import { Sopas } from "./pages/content/sopas";
import { Tradicional } from "./pages/content/tradicional";
import { Vanguardia } from "./pages/content/vanguardia";

import "../css/styles.css";
import "../css/layout.css";
import "../css/media.css";


const Layout = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/vlog" element={<Vlog />} />
        <Route path="/vlog/:videoId" element={<VlogDetails />} />

        <Route path="/school" element={<School />} />
        <Route path="/content" element={<Content />} />
        <Route path="/programa" element={<Programa />} />
        <Route path="/contentintroduction" element={<Introduction />} />

        <Route path="/carrito" Component={Carrito} />
        <Route path="/cesta" Component={Cesta} />
        <Route path="/envio" Component={Envio} />
        <Route path="/pago" Component={Pago} />
        
        <Route path="/aves" element={<AvesHuevos />} />
        <Route path="/carnes" element={<Carnes />} />
        <Route path="/pescados" element={<Pescados />} />
        <Route path="/verduras" element={<Verduras />} />
        <Route path="/lacteos" element={<Lacteos />} />
        <Route path="/pastas" element={<Pastas />} />
        <Route path="/panaderia" element={<Panaderia />} />
        <Route path="/reposteria" element={<Reposteria />} />
        <Route path="/sopas" element={<Sopas />} />
        <Route path="/tradicional" element={<Tradicional />} />
        <Route path="/vanguardia" element={<Vanguardia />} />

      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 10000,
          style: {
            background: "#363636",
            color: "#fff",
            marginBottom: "0px",
            marginRight: "220px",
          },
        }}
      />
      <Footer />
    </BrowserRouter>
  );
};

export default injectContext(Layout);
