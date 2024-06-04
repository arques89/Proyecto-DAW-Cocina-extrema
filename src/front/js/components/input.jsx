// src/components/RenderInputDatosPersonales.jsx
import { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";

export const RenderInputDatosPersonales = ({ onSubmit }) => {
  const { store } = useContext(Context);
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
    if (store.user) {
      setPlaceholders({
        userName: store.user.name || "",
        userSurname: store.user.surname || "",
        userEmail: store.user.email || "",
        userPhone: store.user.phone || ""
      });

      setName(store.user.name || "");
      setSurname(store.user.surname || "");
      setEmail(store.user.email || "");
      setPhone(store.user.phone || "");
    }
  }, [store.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit({ email, name, surname, phone });
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
