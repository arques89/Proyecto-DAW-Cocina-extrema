import { useContext, useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DatosDirecciones } from "./datos-direcciones";
import { DatosBancarios } from "./datos-bancarios";
import { DatosPersonales } from "./datos-personales";
import { DatosPedidos } from "./datos-pedidos";
import { Sponsor } from "../../components/sponsor";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { SharedData } from "./shared-data";
import { Contact } from "./contact-data";
import { FavoriteData } from "./favorite-data";

export const Settings = () => {
  const { store, actions } = useContext(Context);
  const { userName, userSurname } = store;
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si hay un token presente en el contexto global
    const token = store.token;

    // Si no hay un token, redirige al usuario a la página de inicio de sesión
    if (!token) {
      navigate("/");
    }
  }, [store.token, navigate]);

  const [selectOption, setSelectedOption] = useState("personales");
  const handlechange = (nombre) => {
    setSelectedOption(nombre);
  };

  // Función para renderizar el componente basado en selectOption
  const renderContent = () => {
    if (selectOption === "personales") {
      return <DatosPersonales />;
    } else if (selectOption === "direcciones") {
      return <DatosDirecciones />;
    } else if (selectOption === "bancarios") {
      return <DatosBancarios />;
    } else if (selectOption === "pedidos") {
      return <DatosPedidos />;
    } else if (selectOption === "shared") {
      return <SharedData />;
    } else if (selectOption === "favorite") {
      return <FavoriteData />;
    } else if (selectOption === "contact") {
      return <Contact />;
    } else {
      return <div>Opción no válida</div>;
    }
  };

  const handleLogout = () => {
    // Llama a la función logout del contexto
    actions.logout();
    // Redirige al usuario a la página de inicio de sesión
    navigate("/");
  };

  return (
    <>
      <div className="flex h-full bg-shape_primary pb-16">
        {/* Columna verde de 1/4 de ancho y altura completa */}
        <div className="w-4/5 ps-20">
          <section className="flex w-full">
            <div className="w-3/5">
              <div className="block mt-14">
                {/* Button UserIcon */}
                <div>
                  <span className="" />
                  <span className="sr-only">View notifications</span>
                  <UserIcon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div className="text-xl mt-2 ">
                  <h3 className="mb-2 text-shape_border_button">HOLA !!</h3>
                  <h3 className="text-shape_red">
                    {userName} {userSurname}
                  </h3>
                  <hr className="mt-3 w-1/2" />
                </div>
              </div>
            </div>
          </section>
          <section className="flex">
            <div className="w-3/5">
              <div className="mt-6 font-thin">
                <ul className="mt-6">
                  <Link>
                    <li className="font-bold mb-2">MIS DATOS</li>
                  </Link>
                  <li className="mb-2 hover:text-shape_red">
                    <a onClick={() => handlechange("personales")} href="#">
                      Modificar mis datos
                    </a>
                  </li>
                  <li className="mb-2 hover:text-shape_red">
                    <a onClick={() => handlechange("direcciones")} href="#">
                      Mis direcciones
                    </a>
                  </li>
                  <li className="mb-2 hover:text-shape_red">
                    <a onClick={() => handlechange("bancarios")} href="#">
                      Mis tarjetas bancarias
                    </a>
                  </li>
                </ul>
                <ul className="mt-6">
                  <li className="mb-2 font-bold">MIS PEDIDOS</li>
                  <li className="mb-2 hover:text-shape_red">
                    <a onClick={() => handlechange("pedidos")} href="#">
                      Ver mis pedidos
                    </a>
                  </li>
                  <li className="mb-2 hover:text-shape_red">Devoluciones</li>
                  <li className="mb-2 hover:text-shape_red">
                    Mi lista de deseos
                  </li>
                </ul>
                <ul className="mt-6">
                  <li className="font-bold mb-2">MI CONTENIDO</li>
                  <li className="mb-2 hover:text-shape_red">
                    <a onClick={() => handlechange("shared")} href="#">
                      Contenido compartido
                    </a>
                  </li>
                    <a onClick={() => handlechange("favorite")} href="#">
                  <li className="mb-2 hover:text-shape_red">Mis favoritos</li>
                    </a>
                </ul>
                <ul className="mt-6">
                  <li className="font-bold mb-2">¿NECESITAS AYUDA?</li>
                    <a onClick={() => handlechange("contact")} href="#">
                  <li className="hover:text-shape_red">Contactanos</li>
                    </a>
                </ul>
              </div>
              <hr className="my-4 w-1/2" />
              <div className="text-xl w-52">
                <img
                  className="mt-6 mb-2"
                  src="src/front/img/power_button.png"
                  width={28}
                  alt=""
                />
                <h3 className="mb-2 text-shape_border_button w-60">
                  NOS VEMOS PRONTO !!
                </h3>
                <button onClick={handleLogout}>
                  <h3 className="text-shape_red mb-1">CERRAR SESIÓN</h3>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Contenedor para el resto de la estructura */}
        <div className="flex flex-col w-full">
          {/* Fila roja en la parte superior */}
          <div className="w-full ">
            <section className="flex h-full w-full bg-blue-gray-600 pe-20">
              <div className="flex w-full mt-12">
                <div className="block w-full">
                  <div className="flex w-full mb-16 text-center justify-between text-xl font-thin">
                    <span className="hover:text-shape_red">
                      <a href="/">Home</a>
                    </span>
                    <span className="hover:text-shape_red">
                      <a href="/">Programa</a>
                    </span>
                    <span className="hover:text-shape_red">
                      <a href="/school">Escuela</a>
                    </span>
                    <span className="hover:text-shape_red">
                      <a href="/vlog">Vlog</a>
                    </span>
                    <span className="hover:text-shape_red">
                      <a href="/">Tienda</a>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Renderizado condicional basado en selectOption */}
          {renderContent()}
        </div>
      </div>
      <Sponsor />
    </>
  );
};
