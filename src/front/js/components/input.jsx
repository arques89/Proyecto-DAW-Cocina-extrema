import { useEffect, useState } from "react";

export const RenderInputDatosPersonales = () => {
  const [inputData, setInputData] = useState({
    userName: "",
    userSurname: "",
    userEmail: "",
    userPhone: "",
  });

  useEffect(() => {
    // Obtener los datos del localStorage y establecer el estado
    const userName = localStorage.getItem("userName") || "";
    const userSurname = localStorage.getItem("userSurname") || "";
    const userEmail = localStorage.getItem("userEmail") || "";
    const userPhone = localStorage.getItem("userPhone") || "";

    setInputData({
      userName,
      userSurname,
      userEmail,
      userPhone,
    });
  }, []);

  const inputRegister = [
    {
      id: 1,
      htmlFor: "name",
      label: "Nombre",
      type: "text",
      name: "name",
      className: "block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
      placeholder: inputData.userName,
    },
    {
      id: 2,
      htmlFor: "surname",
      label: "Apellido",
      type: "text",
      name: "surname",
      className: "block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
      placeholder: inputData.userSurname,
    },
    {
      id: 3,
      htmlFor: "email",
      label: "Correo",
      type: "email",
      name: "email",
      className: "block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
      placeholder: inputData.userEmail,
    },
    {
      id: 4,
      htmlFor: "phone",
      label: "Teléfono",
      type: "text",
      name: "phone",
      className: "block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
      placeholder: inputData.userPhone,
    },
    {
      id: 5,
      htmlFor: "password",
      label: "Contraseña",
      type: "password",
      name: "password",
      className: "block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",
    },
  ];

  return inputRegister.map((item) => (
    <div key={item.id} className="text-2xl">
      <div className="w-full">
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
            className={item.className}
            type={item.type}
            name={item.name}
            required
            placeholder={item.placeholder}
          />
        </div>
      </div>
    </div>
  ));
};
