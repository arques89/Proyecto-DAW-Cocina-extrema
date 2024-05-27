import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
export const RenderInputDatosPersonales = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [placeholders, setPlaceholders] = useState({
    userName: "",
    userSurname: "",
    userEmail: "",
    userPhone: ""
  });

  useEffect(() => {
    // Obtener los datos del localStorage y establecer los placeholders
    const userName = localStorage.getItem("userName") || "";
    const userSurname = localStorage.getItem("userSurname") || "";
    const userEmail = localStorage.getItem("userEmail") || "";
    const userPhone = localStorage.getItem("userPhone") || "";

    setPlaceholders({
      userName,
      userSurname,
      userEmail,
      userPhone
    });

    // También establecer el estado inicial
    setName(userName);
    setSurname(userSurname);
    setEmail(userEmail);
    setPhone(userPhone);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit({ email, name, surname, phone });

      // Actualizar el localStorage con los nuevos valores
      localStorage.setItem("userName", name);
      localStorage.setItem("userSurname", surname);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPhone", phone);
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-2xl">
        <div className="w-full">
          <div className="flex justify-start">
            <label htmlFor="name" className="text-xl text-shape_border_button mt-2">Nombre</label>
          </div>
          <div className="mt-3 relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={placeholders.userName}
              className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>
      <div className="text-2xl">
        <div className="w-full">
          <div className="flex justify-start">
            <label htmlFor="surname" className="text-xl text-shape_border_button mt-2">Apellido</label>
          </div>
          <div className="mt-3 relative">
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder={placeholders.userSurname}
              className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>
      <div className="text-2xl">
        <div className="w-full">
          <div className="flex justify-start">
            <label htmlFor="email" className="text-xl text-shape_border_button mt-2">Correo</label>
          </div>
          <div className="mt-3 relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholders.userEmail}
              className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>
      <div className="text-2xl">
        <div className="w-full">
          <div className="flex justify-start">
            <label htmlFor="phone" className="text-xl text-shape_border_button mt-2">Teléfono</label>
          </div>
          <div className="mt-3 relative">
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={placeholders.userPhone}
              className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" className="mt-10 hover:bg-shape_red w-full text-2xl text-white rounded-full bg-shape_border_button mb-4">GUARDAR CAMBIOS</button>
    </form>
  );
};
RenderInputDatosPersonales.propTypes = {
  onSubmit: PropTypes.func.isRequired
};