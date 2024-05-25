import { useState } from "react";
import { RenderInputLogin2 } from "../../components/input";
import { changePassword } from "./mocks";

export const DatosPersonales = () => {
  const [change, setChange] = useState(true);

  const handleChange = () => {
    change === true ? setChange(false) : setChange(true);
  };
  const renderInputChangePassword = () => {
    return changePassword.map((item) => (
      <div key={item.id} className="border-shape_border_button">
        <label>
          {item.name}
          <input
            type="text"
            className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-40 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {/* {view} */}
        </label>
      </div>
    ));
  };
  const renderChangePassword = () => {
    return (
      <div hidden={change}>
        <div className="border rounded-3xl w-full mt-4">
          <div className="w-full">
            <span className=" border border-shape_border_button w-full rounded-full pr-44 py-1.5 pl-4 inline-block">
              CAMBIAR CONTRASEÑA
            </span>
            <div className="block ms-3 mt-4">{renderInputChangePassword()}</div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-2xl text-white rounded-full bg-shape_border_button mt-4"
        >
          GUARDAR CONTRASEÑA NUEVA
        </button>
      </div>
    );
  };
  return (
    <div>
      <div className="text-xl">
        <h3 className=" pb-3 text-shape_border_button bg-pink-600">
          DATOS PERSONALES
        </h3>
        <hr />
      </div>
      <div className="flex">
        <div className=" w-2/4 pe-4">
          <RenderInputLogin2 />
          <div className="flex justify-end mt-3">
            <button
              name="changePassword"
              onClick={() => handleChange()}
              className="justify-end text-shape_red"
            >
              Cambiar
            </button>
          </div>

          {renderChangePassword()}

          <div className="block text-2xl mt-5">
            <button
              type="submit"
              className="w-full text-2xl text-white rounded-full bg-shape_border_button mb-4"
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
        <div className="flex w-1/4 ps-24">
          <div>
            <span className="font-thin">Tratamiento *</span>
            <div className="mt-4">
              <input className="ms-0" type="radio" name="gender" id="" />
              <label className="ms-2" htmlFor="">
                Sra
              </label>
              <input className="ms-4" type="radio" name="gender" id="" />
              <label className="ms-2" htmlFor="">
                Sr
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
