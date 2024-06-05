import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";

import { Home } from "./pages/home/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Settings } from "./pages/setting/index";
import { ForgotPassword } from "./pages/forgot_password/index";
import { Vlog } from "./pages/vlog";
import { VlogDetails } from "./pages/vlog/vlog-details";
import { Toaster } from "react-hot-toast";
import "../css/layout.css";
import "../css/media.css";
import "../css/styles.css";
import injectContext from "./store/appContext";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Settings } from "./pages/setting/index";
import { Prueba } from "./components/prueba";
import { ForgotPassword } from './pages/forgot_password/index';
import { School } from "./pages/school/school";
import { Content } from "./pages/content/index";
import { Introduction } from "./pages/content/introduction";
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
import { Carrito } from "./pages/carrito/index";
import { Cesta } from "./pages/carrito/cesta";
import { Envio } from "./pages/carrito/envio";
import { Pago } from "./pages/carrito/pago";
// import { RenderInputLogin2 } from "./components/input";
=======


const Layout = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/settings" Component={Settings} />
        <Route path="/prueba" Component={Prueba} />
        <Route path="/school" Component={School} />
        <Route path="/content" Component={Content} />
        <Route path="/contentintroduction" Component={Introduction} />
        <Route path="/aves" Component={AvesHuevos} />
        <Route path="/carnes" Component={Carnes} />
        <Route path="/pescados" Component={Pescados} />
        <Route path="/verduras" Component={Verduras} />
        <Route path="/lacteos" Component={Lacteos} />
        <Route path="/pastas" Component={Pastas} />
        <Route path="/panaderia" Component={Panaderia} />
        <Route path="/reposteria" Component={Reposteria} />
        <Route path="/sopas" Component={Sopas} />
        <Route path="/tradicional" Component={Tradicional} />
        <Route path="/vanguardia" Component={Vanguardia} />
        <Route path="/carrito" Component={Carrito} />
        <Route path="/cesta" Component={Cesta} />
        <Route path="/envio" Component={Envio} />
        <Route path="/pago" Component={Pago} />
        {/* <Route path="/p" Component={RenderInputLogin2} /> */}
        {/* <Route path="/chefs" Component={Chefs} /> */}
        {/* <Route path="/concursantes" Component={Concursantes} /> */}
        {/* <Route path="/dashboard" Component={Dashboard} /> */}
        <Route path="/forgot" Component={ForgotPassword} />
        {/* <Route path="/form" Component={upFile} /> */}
=======
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/vlog" element={<Vlog />} />
        <Route path="/vlog/:videoId" element={<VlogDetails />} /> {/* Usa solo esta ruta */}

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
