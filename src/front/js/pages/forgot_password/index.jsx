import { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { InputForgotPassword } from "./mocks";
import PropTypes from 'prop-types';

export const ForgotPassword = ({setOpen}) => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await actions.forgotPassword(email); // Llama a la acción de recuperación de contraseña
    setOpen(false)
  };

  const renderInputForgotPassword = () => {
    return InputForgotPassword.map((item) => (
      <div key={item.id}>
        <div className="block text-2xl mt-2 mx-36">
          <div className="flex justify-start">
            <label
              htmlFor={item.htmlFor}
              className="text-xl text-shape_border_button mt-4"
            >
              {item.label}
            </label>
          </div>
          <div className="mt-3">
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
    <form onSubmit={handleSubmit}>
      {renderInputForgotPassword()}
      <div className="block w-full mt-14">
        <div className="block mx-36 text-xl">
          <div className="block text-2xl mt-5 mx-36">
            <button
              type="submit"
              className="w-full text-2xl text-white rounded-full bg-shape_border_button"
            >
              CAMBIAR CONTRASEÑA
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
ForgotPassword.propTypes = {
  setOpen: PropTypes.func,
};