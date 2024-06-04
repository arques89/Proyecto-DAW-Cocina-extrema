// src/pages/Login.jsx
import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";
import { inputLogin } from "./mocks";
import toast from "react-hot-toast";

export const Login = ({ setOpen }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting login with:", { email, password });

    if (!email || !password) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    const response = await actions.login(email, password);

    console.log("Login response:", response);

    if (response.success) {
      setOpen(false);
      navigate('/settings');
    } else {
      toast.error(response.message);
    }
  };

  const renderInputLogin = () => {
    return inputLogin.map((item) => (
      <div key={item.id}>
        <div className="block text-2xl mt-4 mx-36">
          <div className="flex justify-start">
            <label
              htmlFor={item.htmlFor}
              className="text-xl text-shape_border_button mt-2"
            >
              {item.label}
            </label>
          </div>
          <div className="mt-3 relative">
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
      {renderInputLogin()}
      <div className="block text-2xl mt-5 mx-36">
        <button
          type="submit"
          className="w-full text-2xl text-white rounded-full bg-shape_border_button"
        >
          INICIAR SESIÓN
        </button>
      </div>
    </form>
  );
};

Login.propTypes = {
  setOpen: PropTypes.func
};

export default Login;
