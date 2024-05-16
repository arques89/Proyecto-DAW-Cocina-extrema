import { useState } from "react";
import { Menu } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { inputLogin } from "./mocks";

export const Login = () => {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    actions.login(email, password); // Llama a la acción de inicio de sesión
  };

  const renderInputLogin = () => {
    return inputLogin.map((item) => (
      <div key={item.id}>
        <label htmlFor={item.htmlFor}>{item.label}</label>
        <br />
        <input
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          required
          onChange={handleInputChange}
        />
        <br />
      </div>
    ));
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
            <div className="block text-2xl mt-10 mx-36">
              <div className=" flex justify-start">
                <span className="text-xl text-shape_border_button mt-4">
                  Correo Electrónico*
                </span>
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>

            <div className="block text-2xl mt-5 mx-36">
              <div className=" flex justify-start">
                <span className="text-xl text-shape_border_button mt-4">
                  Contraseña*
                </span>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex w-full mt-8"></div>
            <div className="flex mx-36 text-xl">
              <span className="flex justify-start w-full font-thin">
                Recordarme
              </span>
              <span className="flex justify-end w-full text-shape_red">
                ¿Has olvidado tu contraseña?
              </span>
            </div>
            <label className="flex items-center space-x-2">
              <input
                className="appearance-none checked:border-transparent rounded-full w-9 h-9 ms-24 mt-4"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <div className="w-9 h-9 mt-4 bg-shape_input rounded-full flex items-center justify-center">
                {isChecked && <CheckIcon className="w-7 h-7 text-blue-600" />}
              </div>
            </label>

                  <div className="block text-2xl mt-5 mx-36">
                    <button type="button" className="w-full text-2xl text-white rounded-full bg-shape_border_button">INICIAR SESIÓN</button>
                  </div>
            {/* <div className="login">
              <form onSubmit={handleSubmit}>
                {renderInputLogin()}
                <br />
                <button type="submit">Entrar</button>
              </form>
            </div> */}
          </div>
        </Menu.Items>
      </Menu>
    </>
  );
};
