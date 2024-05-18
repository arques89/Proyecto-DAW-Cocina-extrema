import { CheckIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { Context } from "../../store/appContext"; // Importa el contexto
import { inputLogin } from "./mocks";

export const Login = () => {
  const { actions } = useContext(Context); // Obtén las acciones y el estado del contexto

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
        <div className="block text-2xl mt-5 mx-36">
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
              onChange={handleInputChange}
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
      <form onSubmit={handleSubmit}>
        {renderInputLogin()}
        <div className="flex w-full mt-14"></div>
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
          <button
            type="submit"
            className="w-full text-2xl text-white rounded-full bg-shape_border_button"
          >
            INICIAR SESIÓN
          </button>
        </div>
      </form>
    </>
  );
};
