import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import logo from "../../img/LogoNavBar.png";
import { HiOutlineUser } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { Canvas } from "./canvas";
import { Context } from "../store/appContext";

export const NavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // Obtén la función de redireccionamiento
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [content, setContent] = useState("");
  const { store } = useContext(Context); // Obtener el store del contexto

  // Función para manejar el clic en el icono de usuario
  const handleUserIconClick = () => {
    if (store.token) {
      navigate("/settings"); // Redirige a la página de configuración si está autenticado al pulsar en el icono de User
    } else {
      setIsCanvasOpen(true);
      setContent("iconUser"); // Abre el canvas con las opciones de login, register y forgot si no está autenticado
    }
  };

  // Función para manejar el clic en el icono de menú
  const handleMenuIconClick = () => {
    setIsCanvasOpen(true);
    setContent("iconMenu");
  };

  return (
    <div className="flex w-full h-24 bg-shape_primary">
      <div className="flex w-1/4 items-center ps-20">
        <a href="/"><img className="h-14 w-14" src={logo} alt="Logo Cocina Extrema"  /></a>
      </div>
      <div className="w-2/4">
        <span className="flex justify-center items-center h-full text-4xl sedgwick-ave-display-regular">
          Cocina Extrema
        </span>
      </div>
      <div className="w-1/4">
        <div className="flex items-center justify-end pe-20 h-full">
          <button onClick={handleUserIconClick}>
            <HiOutlineUser className="h-8 w-8 me-2 hover:text-shape_red" aria-hidden="true" />
          </button>
          <button onClick={handleMenuIconClick}>
            <RxHamburgerMenu className="h-8 w-8 ms-2 hover:text-shape_red" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Canvas open={isCanvasOpen} setOpen={setIsCanvasOpen} content={content} />
    </div>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool
};
