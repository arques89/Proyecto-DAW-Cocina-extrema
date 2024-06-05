import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ForgotPassword } from "../pages/forgot_password";

export const Options = ({ setOpen }) => {
  const [selectedOption, setSelectedOption] = useState("login");
  const [isChecked, setIsChecked] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "close") {
      setOpen(false); // Cerrar el canvas cuando se hace clic en "X"
    }
  };

  const renderInputSection = () => {
    if (selectedOption === "login") {
      return (
        <>
          <Login setOpen={setOpen} />
          <div className="w-full mt-14">
            <div className="flex mx-36 text-xl">
              <span className="flex justify-start w-full font-thin">
                Recordarme
              </span>
              <a
                href="#"
                className={`block w-full px-0 pb-2 ms-8 ${
                  selectedOption === "forgot" ? "font-bold" : ""
                }`}
                onClick={() => handleOptionClick("forgot")}
              >
                <span className="flex justify-end w-full text-shape_red">
                  ¿Has olvidado tu contraseña?
                </span>
              </a>
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
          </div>
        </>
      );
    } else if (selectedOption === "register") {
      return <Register setOpen={setOpen} />;
    } else if (selectedOption === "forgot") {
      return <ForgotPassword setOpen={setOpen} />;
    }
  };

  return (
    <div>
      <div className="flex justify-end text-5xl mt-0 me-36">
        <a
          href="#"
          className="block py-0 text-black-700"
          onClick={() => handleOptionClick("close")}
        >
          x
        </a>
      </div>
      <div className="flex justify-center mx-36">
        <div className="flex justify-start text-2xl mt-10 w-full">
          <a
            href="#"
            className={`block px-0 pb-2 text-shape_border_button border-b-2 me-8 border-shape_border_button ${
              selectedOption === "login" ? "font-bold" : ""
            }`}
            onClick={() => handleOptionClick("login")}
          >
            INICIAR SESIÓN
          </a>
        </div>
        {(selectedOption === "login" || selectedOption === "register") && (
          <div className="flex justify-end text-2xl mt-10 w-full">
            <a
              href="#"
              className={`block px-0 pb-2 text-shape_border_button border-b-2 ms-8 border-shape_border_button ${
                selectedOption === "register" ? "font-bold" : ""
              }`}
              onClick={() => handleOptionClick("register")}
            >
              CREAR CUENTA
            </a>
          </div>
        )}
      </div>
      {renderInputSection()}
    </div>
  );
};

Options.propTypes = {
  setOpen: PropTypes.func.isRequired
};
