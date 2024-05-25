import { useState } from "react";
import { changeCard } from "./mocks";

export const DatosBancarios = () => {
  //   const [change, setChange] = useState(true);
  const [addCard, setAddCard] = useState(false);

  const handleAddCard = () => {
    setAddCard(!addCard);
  };

  const renderInputChangeCard = () => {
    return changeCard.map((item) => (
      <div key={item.id} className="border-shape_border_button">
        <label>
          {item.name}
          <input type={item.type} className={item.className} />
        </label>
      </div>
    ));
  };

  const renderChangeBanking = () => {
    return (
      <div>
        <div className="w-full">
          <div className="border rounded-3xl w-full mt-4">
            <div className="w-full">
              <span className="border border-shape_border_button w-full ps-12 rounded-full pr-44 py-1.5 pl-6 inline-block">
                AÑADE UNA TARJETA PARA FUTURAS COMPRAS
              </span>
              <div className="flex">
                <div className="block ms-12 mt-4">
                  {renderInputChangeCard()}
                  <div className="flex border-shape_border_button">
                    <label>
                    Fecha de vencimiento *
                      <input type="date" className="mt-2 mb-4 bg-shape_input w-1/2 rounded-full border-0 py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                    </label>
                    <label>
                    CVV *
                    <br />
                      <input type="text" className="mt-2 mb-4 bg-shape_input w-1/2 rounded-full border-0 py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                    </label>
                  </div>
                </div>
                <div className="w-1/2 h-1/3 bg-green-300 flex justify-center pb-10 items-end">
                  <img src="src/front/img/visa.png" width={50} alt="Visa" />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-2xl text-white rounded-full bg-shape_border_button my-4"
          >
            GUARDAR DIRECCIÓN
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-xl">
        <h3 className="pb-3 text-shape_border_button bg-pink-600">
          DATOS PERSONALES
        </h3>
        <hr />
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 text-sm bg-red-300">
          <p>4000 1234 5678 9010</p>
          <p>JAVIER ARQUES TORTOSA</p>
          <p>12/24</p>
          <p>XXX</p>
        </div>
        <div className="w-1/2 bg-green-300 flex justify-end pb-10 items-end">
          <img src="src/front/img/visa.png" width={50} alt="Visa" />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 text-sm bg-red-300">
          <p>4000 1234 5678 9010</p>
          <p>JAVIER ARQUES TORTOSA</p>
          <p>12/24</p>
          <p>XXX</p>
        </div>
        <div className="w-1/2 bg-green-300 flex justify-end pb-10 items-end">
          <img src="src/front/img/visa.png" width={50} alt="Visa" />
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={handleAddCard}
          className="w-full text-2xl text-white rounded-full bg-shape_border_button mt-4"
        >
          AÑADIR UNA TARJETA
        </button>
      </div>
      {addCard && renderChangeBanking()}
    </div>
  );
};
