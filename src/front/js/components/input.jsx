import { useState } from "react";
import { inputRegister } from "../pages/register/mocks";

export const RenderInputLogin2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

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
