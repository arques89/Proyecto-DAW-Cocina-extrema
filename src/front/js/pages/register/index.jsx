// src\front\js\pages\register\index.jsx
import { inputRegister } from "./mocks";
import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import { basic_eye } from 'react-icons-kit/linea/basic_eye';
import { basic_eye_closed } from 'react-icons-kit/linea/basic_eye_closed';
import { Context } from "../../store/appContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ValidatePassword } from '../../components/validate_password';

export const Register = ({setOpen}) => {
  const { actions } = useContext(Context); // Obtén las acciones del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false); // Manejar el estado del checkbox
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si el formulario es válido antes de enviar la solicitud
    if (!event.target.checkValidity()) {
      console.error("El formulario es inválido");
      return;
    }

    // Verificar si los campos están vacíos
    if (!name || !surname || !email || !password || !phone) {
      console.error("Por favor, completa todos los campos");
      return;
    }

    await actions.register(email, password, name, surname, phone); // Llama a la acción de registro
    setOpen(false); // Cierra el canvas después de un inicio de sesión exitoso
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "name") setName(value);
    if (name === "surname") setSurname(value);
    if (name === "phone") setPhone(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputRegister.map((item) => (
        <div key={item.id} className="block text-2xl mt-2 mx-36">
          <div className="flex justify-start">
            <label htmlFor={item.htmlFor} className="text-xl text-shape_border_button mt-4">
              {item.label}
            </label>
          </div>
          <div className="mt-3 relative">
            <input
              className={item.className}
              type={item.type === 'password' && showPassword ? 'text' : item.type}
              name={item.name}
              value={
                item.name === "email" ? email :
                item.name === "password" ? password :
                item.name === "name" ? name :
                item.name === "surname" ? surname :
                item.name === "phone" ? phone : ''
              }
              onChange={(e) => {
                handleChange(e);
                if (item.name === "password") {
                  handleChange(e);
                }
              }}
              required
              placeholder={item.placeholder}
            />
            {item.type === 'password' && (
              <>
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-0 mr-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? basic_eye : basic_eye_closed} size={18} />
                </button>
                <ValidatePassword password={password} />
              </>
            )}
          </div>
        </div>
      ))}
      <div className="w-full mt-8">
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

        <div className="block text-2xl mt-5 mx-36 mb-24">
          <button
            type="submit"
            className="w-full text-2xl text-white rounded-full bg-shape_border_button"
          >
            REGISTRARSE
          </button>
        </div>
      </div>
    </form>
  );
};
Register.propTypes = {
  setOpen: PropTypes.func,
};
