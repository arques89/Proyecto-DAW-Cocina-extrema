import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DatosDirecciones } from "./datos-direcciones";
import { DatosBancarios } from "./datos-bancarios";
import { DatosPersonales } from "./datos-personales";
import { useState } from "react";
import { Sponsor } from "../../components/sponsor";

export const Settings = () => {
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
    } else {
      return <div>Opción no válida</div>;
    }
  };

  return (
    <>
    <div className="flex h-full bg-shape_primary">
      {/* Columna verde de 1/4 de ancho y altura completa */}
      <div className="w-4/5 bg-yellow-400 ps-20">
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
                <h3 className="mb-6 text-shape_border_button">HOLA !!</h3>
                <h3 className="text-shape_red">JAVIER ARQUES</h3>
                <hr className="mt-3 w-full" />
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
                <li className="mb-2">
                  <a onClick={() => handlechange("personales")} href="#">
                    Modificar mis datos
                  </a>
                </li>
                <li className="mb-2">
                  <a onClick={() => handlechange("direcciones")} href="#">
                    Mis direcciones
                  </a>
                </li>
                <li className="mb-2">
                  <a onClick={() => handlechange("bancarios")} href="#">
                    Mis tarjetas bancarias
                  </a>
                </li>
              </ul>
              <ul className="mt-6">
                <li className="font-bold mb-2">MIS PEDIDOS</li>
                <li className="mb-2">Ver mis pedidos</li>
                <li className="mb-2">Devoluciones</li>
                <li className="mb-2">Mi lista de deseos</li>
              </ul>
              <ul className="mt-6">
                <li className="font-bold mb-2">MI CONTENIDO</li>
                <li className="mb-2">Contenido compartido</li>
                <li className="mb-2">Mis favoritos</li>
              </ul>
              <ul className="mt-6">
                <li className="font-bold mb-2">¿NECESITAS AYUDA?</li>
                <li>Contactanos</li>
              </ul>
            </div>
            <div className="text-xl w-52">
              <hr className="mt-2 w-full" />
              <img
                className="mt-6 mb-2"
                src="src/front/img/power_button.png"
                width={28}
                alt=""
              />
              <h3 className="mb-4 text-shape_border_button w-60">
                NOS VEMOS PRONTO !!
              </h3>
              <h3 className="text-shape_red mb-1">CERRAR SESIÓN</h3>
            </div>
          </div>
        </section>
      </div>

      {/* Contenedor para el resto de la estructura */}
      <div className="flex flex-col w-full bg-blue-700 me-16">
        {/* Fila roja en la parte superior */}
        <div className="w-full ">
          <section className="flex h-full w-full bg-blue-gray-600 pe-20">
            <div className="flex w-full mt-12">
              <div className="block w-full">
                <div className="flex w-full mb-16 text-center justify-between text-xl font-thin">
                  <span>Home</span>
                  <span>Programa</span>
                  <span>Escuela</span>
                  <span>Vlog</span>
                  <span>Tienda</span>
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
