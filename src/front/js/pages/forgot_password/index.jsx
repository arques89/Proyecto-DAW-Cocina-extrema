import { useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { InputForgotPassword } from "./mocks";
import { Login } from "../login";

export const ForgotPassword = ({ setOpen }) => {
  
  const { actions } = useContext(Context);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    actions.forgotPassword(email);
  };

  const renderInputForgotPassword = (setOpen) => {
    return InputForgotPassword.map((item) => (
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
              onChange={handleInputChange}
              required
              placeholder={item.placeholder}
            />
          </div>
        </div>
      </div>
    ));
  };

  const [selectedOption, setSelectedOption] = useState("login");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "close") {
      setOpen(false); // Cerrar el canvas cuando se hace clic en "X"
    }
  };

  return (
    <>
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
      </div>
      {/* {selectedOption === "login" && <Login />} */}
    </div>


      <form onSubmit={handleSubmit}>
        {renderInputForgotPassword()}
        <div className="flex w-full mt-14"></div>
        <div className="flex mx-36 text-xl">
        </div>
        <div className="block text-2xl mt-5 mx-36">
          <button
            type="submit"
            className="w-full text-2xl text-white rounded-full bg-shape_border_button"
          >
            CAMBIAR CONTRASEÑA
          </button>
        </div>
      </form>
    </>
  );
};
