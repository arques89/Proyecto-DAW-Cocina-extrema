import { useState } from "react";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const Options = ({ setOpen }) => {
  const [selectedOption, setSelectedOption] = useState("login");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "close") {
      setOpen(false); // Cerrar el canvas cuando se hace clic en "X"
    }
  };

  return (
    <div>
      <div className="flex justify-end text-5xl mt-10 me-36">
        <a
          href="#"
          className="block py-3 text-black-700"
          onClick={() => handleOptionClick("close")} // Llamar a handleOptionClick con "close"
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
            INICIAR SESION
          </a>
        </div>
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
      </div>
      {selectedOption === "login" && <Login />}
      {selectedOption === "register" && <Register />}
    </div>
  );
};
