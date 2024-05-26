import { useState } from "react";
import { changeAddress } from "./mocks";

export const DatosDirecciones = () => {
  const [change, setChange] = useState(true);

  const handleChange = () => {
    change === true ? setChange(false) : setChange(true);
  };
  const renderInputChangeAddress = () => {
    return changeAddress.map((item) => (
      <div key={item.id} className="border-shape_border_button">
        <label>
          {item.name}
          <input
            type="text"
            className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {/* {view} */}
        </label>
      </div>
    ));
  };
  const renderChangeAddress = () => {
    return (
      <div hidden={change}>
        <div className="w-full">
        <div className="border rounded-3xl w-full mt-4">
          <div className="w-full">
            <span className=" border border-shape_border_button w-full text-center rounded-full pr-44 py-1.5 pl-6 inline-block">
              CAMBIAR CONTRASEÑA
            </span>
            <div className="block ms-7 mt-4">{renderInputChangeAddress()}</div>
          </div>
        </div>
        <button
          type="submit"
          className="w-1/2 text-2xl text-white rounded-full bg-shape_border_button mt-4"
          >
          GUARDAR DIRECCIÓN
        </button>
          </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="text-xl">
        <h3 className=" pb-3 text-shape_border_button bg-pink-600">
          DATOS PERSONALES
        </h3>
        <hr />
      </div>
      <div className="flex">
        <div className="w-1/2 bg-red-300">
          <p className="mb-3 font-thin">Dirección de Facturación</p>
          <p>BRAND AGENCY S.L</p>
          <p>B974626390</p>
          <p>CALLE DEL MEZQUITE 2, BAJO</p>
          <p>28008 MADRID</p>
          <p>ESPAÑA</p>
        </div>
        <div className=" w-1/2 bg-green-300">
          <span className="flex font-thin mb-3">Dirección de Envío</span>
          <p>Como dirección de facturación</p>
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 bg-red-300">
          <p className="mb-3 font-thin">Otras Direcciones</p>
          <p>BRAND AGENCY S.L</p>
          <p>B974626390</p>
          <p>CALLE DEL MEZQUITE 2, BAJO</p>
          <p>28008 MADRID</p>
          <p>ESPAÑA</p>
        </div>

        <div className=" w-1/2 bg-green-300">
          <span className="flex font-thin mb-3">Usar como</span>
          <p className="pb-2 text-shape_red">Dirección de Envío predeterminada</p>
          <p className="pb-3 text-shape_red">Dirección de Facturación predeterminada</p>
          <div className="">
            <button
              name="changePassword"
              onClick={() => handleChange()}
              className="justify-end text-shape_red"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 bg-red-300">
          <p className="mb-3 font-thin">Otras Direcciones</p>
          <p>BRAND AGENCY S.L</p>
          <p>B974626390</p>
          <p>CALLE DEL MEZQUITE 2, BAJO</p>
          <p>28008 MADRID</p>
          <p>ESPAÑA</p>
        </div>

        <div className=" w-1/2 bg-green-300">
          <span className="flex font-thin mb-3">Usar como</span>
          <p className="pb-2 text-shape_red">Dirección de Envío predeterminada</p>
          <p className="pb-3 text-shape_red">Dirección de Facturación predeterminada</p>
          <div className="">
            <button
              name="changePassword"
              onClick={() => handleChange()}
              className="justify-end text-shape_red"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
      {renderChangeAddress()}
    </div>
  );
};
