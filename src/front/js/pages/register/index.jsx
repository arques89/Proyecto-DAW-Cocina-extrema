import { CheckIcon } from "@heroicons/react/24/solid";

import { inputRegister } from "./mocks";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";

export const Register = () => {
  const { actions } = useContext(Context); // Obtén las acciones y el estado del contexto

  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

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
    actions.register(email, password, name, surname);

    // const avatarConfig = await actions.register(email, password, name, surname);
    // if (avatarConfig) {
    //   setAvatarConfig(avatarConfig);
    // }
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
        <div className="block text-2xl mt-4 mx-36">
          <div className=" flex justify-start">
            <label
              htmlFor={item.htmlFor}
              className="text-xl text-shape_border_button mt-4"
            >
              {item.label}
            </label>
          </div>
          <div className="mt-4">
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
      <form className="mb-24" onSubmit={handleSubmit}>
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
            Inscríbase para recibir las noticias exclusivas, las novedades y las
            ofertas personalizadas. <br /> Puede darse de baja en cualquier
            momento.
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
    </>
  );
};
