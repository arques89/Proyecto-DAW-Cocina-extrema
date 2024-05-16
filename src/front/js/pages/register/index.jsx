import { Menu } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

import { Toaster } from "react-hot-toast";
import { inputRegister } from "./mocks";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Register = () => {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { store, actions } = useContext(Context); // Obtén las acciones y el estado del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatarConfig, setAvatarConfig] = useState(null);
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si el formulario es válido antes de enviar la solicitud
    if (!event.target.checkValidity()) {
      console.error("El formulario es inválido");
      return;
    }

    // Verificar si los campos están vacíos
    if (!name || !surname || !email || !password) {
      console.error("Por favor, completa todos los campos");
      return;
    }
    // Llamar a la acción register con los datos del formulario
    const avatarConfig = await actions.register(email, password, name, surname);
    if (avatarConfig) {
      setAvatarConfig(avatarConfig);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "name") setName(value);
    if (name === "surname") setSurname(value);
  };

  const renderInputRegister = () => {
    return inputRegister.map((item) => (
      <div key={item.id}>
        <div className="block text-2xl mt-10 mx-36">
          <div className=" flex justify-start">
            <label
              htmlFor={item.htmlFor}
              className="text-xl text-shape_border_button mt-4"
            >
              {item.label}
            </label>
          </div>
          <div className="mt-5">
            <input
              className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type={item.type}
              name={item.name}
              value={
                item.name === "email"
                  ? email
                  : item.name === "password"
                  ? password
                  : item.name === "name"
                  ? name
                  : surname
              }
              onChange={handleChange}
              required
              placeholder={item.placeholder}
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <UserIcon className="h-7 w-7" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Menu.Items
          id="menu-login"
          className="absolute flex z-10 w-custom origin-top-right -md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="block w-full">
            <div>
              <Menu.Item className="flex justify-end text-5xl mt-16 me-36">
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "text-shape_red" : "",
                      "block py-3 text-black-700"
                    )}
                  >
                    x
                  </a>
                )}
              </Menu.Item>
              <div className="flex justify-center mx-36">
                <Menu.Item className="flex justify-start text-2xl mt-10 w-full">
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "text-shape_red" : "",
                        "block px-0 pb-2 text-shape_border_button border-b-2 me-8 border-shape_border_button"
                      )}
                    >
                      INICIAR SESION
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item className="flex justify-end text-2xl mt-10 w-full">
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "text-shape_red" : "",
                        "block px-0 pb-2 text-shape_border_button border-b-2 ms-8 border-shape_border_button "
                      )}
                    >
                      CREAR CUENTA
                    </a>
                  )}
                </Menu.Item>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {renderInputRegister()}
              <div className="flex w-full mt-8"></div>
              <label className="flex items-center space-x-2">
                <input
                  className="flex items-center appearance-none checked:border-transparent rounded-full w-9 h-9 ms-24 mt-4"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <div className="w-9 h-9 mt-4 bg-shape_input rounded-full flex items-center justify-center">
                  {isChecked && <CheckIcon className="w-7 h-7 text-blue-600" />}
                </div>
                <span className="align-middle">
                  Inscríbase para recibir las noticias exclusivas, las novedades
                  y las ofertas personalizadas. <br /> Puede darse de baja en
                  cualquier momento.
                </span>
              </label>

              <div className="block text-2xl mt-5 mx-36">
                <button
                  type="submit"
                  className="w-full text-2xl text-white rounded-full bg-shape_border_button"
                >
                  REGISTRARSE
                </button>
              </div>
            </form>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  // Define default options
                  duration: 10000,
                }}
              />
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
};
