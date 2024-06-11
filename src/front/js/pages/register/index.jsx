import { inputRegister } from "./mocks";
import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Context } from "../../store/appContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ValidatePassword } from '../../components/validate_password';
import { GoEye, GoEyeClosed } from "react-icons/go"; 
import toast from "react-hot-toast";

export const Register = ({ setOpen }) => {
  const { actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isPasswordValid) {
      toast.error("La contraseña introducida no es segura");
      return;
    }

    if (!name || !surname || !email || !password || !phone) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    await actions.register(email, password, name, surname, phone);
    setOpen(false);
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
                  {showPassword ? <GoEye size={18} className="mt-3.5" /> : <GoEyeClosed size={18} className="mt-3.5" />}
                </button>
                <ValidatePassword password={password} setValidationStatus={setIsPasswordValid} />
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
