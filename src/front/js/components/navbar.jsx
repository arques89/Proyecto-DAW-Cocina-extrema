import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redireccionar
import PropTypes from 'prop-types';
import logo from "../../img/LogoNavBar.png";
import { HiOutlineUser } from "react-icons/hi2";
import { RxHamburgerMenu } from "react-icons/rx";
import { Canvas } from "./canvas";

export const NavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // Obtén la función de redireccionamiento
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [content, setContent] = useState("");

  // Función para manejar el clic en el icono de usuario
  const handleUserIconClick = () => {
    setIsCanvasOpen(true);
    setContent("iconUser");
  };

  // Función para manejar el clic en el icono de menú
  const handleMenuIconClick = () => {
    setIsCanvasOpen(true);
    setContent("iconMenu");
  };

  // Función para manejar el clic en la opción de cerrar sesión
  const handleLogout = () => {
    // Elimina el token del localStorage u otras acciones necesarias
    localStorage.removeItem("token");
    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div className="flex w-full h-24 bg-shape_primary">
      <div className="flex w-1/4 items-center ps-20">
        <img className="h-14 w-14" src={logo} alt="Logo Cocina Extrema" />
      </div>
      <div className="w-2/4">
        <span className="flex justify-center items-center h-full text-4xl sedgwick-ave-display-regular">
          Cocina Extrema
        </span>
      </div>
      <div className="w-1/4">
        <div className="flex items-center justify-end pe-20 h-full">
          {isLoggedIn ? (
            // Mostrar opciones diferentes si el usuario está autenticado
            <>
              <button onClick={() => navigate("/settings")}>
                Configuración
              </button>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            // Mostrar iconos de usuario y menú si el usuario no está autenticado
            <>
              <button onClick={handleUserIconClick}>
                <HiOutlineUser className="h-8 w-8 me-2 hover:text-shape_red" aria-hidden="true" />
              </button>
              <button onClick={handleMenuIconClick}>
                <RxHamburgerMenu className="h-8 w-8 ms-2 hover:text-shape_red" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
      <Canvas open={isCanvasOpen} setOpen={setIsCanvasOpen} content={content} />
    </div>
  );
};
NavBar.propTypes = {
  isLoggedIn: PropTypes.bool
};