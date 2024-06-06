import { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const DatosBancarios = () => {
  const { store, actions } = useContext(Context);
  const [change, setChange] = useState(false);
  const [newCard, setNewCard] = useState({
    card_number: "",
    cardholder_name: "",
    expiry_date: "",
    cvv: "",
    is_default: false
  });

  useEffect(() => {
    actions.getBankData();
  }, []);

  const handleChange = () => {
    setChange(!change);
  };

  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleSaveCard = () => {
    if (newCard.id) {
      actions.updateBankData(newCard.id, newCard).then(() => {
        setNewCard({
          card_number: "",
          cardholder_name: "",
          expiry_date: "",
          cvv: "",
          is_default: false
        });
        setChange(false);
        actions.getBankData();
      }).catch(error => {
        console.error("Error updating card:", error);
      });
    } else {
      actions.addBankData(newCard).then(() => {
        setNewCard({
          card_number: "",
          cardholder_name: "",
          expiry_date: "",
          cvv: "",
          is_default: false
        });
        setChange(false);
        actions.getBankData();
      }).catch(error => {
        console.error("Error adding card:", error);
      });
    }
  };

  const handleSetDefault = (id) => {
    actions.setDefaultBankData(id).then(() => {
      actions.getBankData();
    }).catch(error => {
      console.error("Error setting default card:", error);
    });
  };

  const handleDeleteCard = (id) => {
    actions.deleteBankData(id).then(() => {
      actions.getBankData();
    }).catch(error => {
      console.error("Error deleting card:", error);
    });
  };

  const bankData = store.bankData || [];
  const defaultCard = bankData.find(card => card.is_default);
  const otherCards = bankData.filter(card => !card.is_default);

  return (
    <div className="me-20">
      <div className="text-xl">
        <h3 className="pb-3 text-shape_border_button">
          MIS TARJETAS BANCARIAS
        </h3>
        <hr />
      </div>
      <div className="flex my-4">
        <div className="w-full p-4">
          <p className="mb-3 font-thin">Tarjeta Predeterminada</p>
          {defaultCard ? (
            <div className="flex justify-between items-center">
              <div>
                <p>**** **** **** {defaultCard.card_number.slice(-4)}</p>
                <p>{defaultCard.cardholder_name}</p>
                <p>{defaultCard.expiry_date}</p>
              </div>
              <img src="src/front/img/visa.png" width={50} alt="Visa" />
            </div>
          ) : (
            <p>No hay tarjeta predeterminada</p>
          )}
        </div>
      </div>
      <hr />
      {otherCards.length > 0 ? (
        otherCards.map((card, index) => (
          <div key={index} className="flex mt-4">
            <div className="w-full p-4">
              <p className="mb-3 font-thin">Otras Tarjetas</p>
              <div className="flex justify-between items-center">
                <div>
                  <p>**** **** **** {card.card_number.slice(-4)}</p>
                  <p>{card.cardholder_name}</p>
                  <p>{card.expiry_date}</p>
                  <button
                    onClick={() => handleSetDefault(card.id)}
                    className="hover:text-shape_red text-shape_border_button"
                  >
                    Establecer como predeterminada
                  </button>
                  <button
                    onClick={() => setNewCard(card) & setChange(true)}
                    className="hover:text-shape_red ml-4 text-shape_border_button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-shape_red ml-4"
                  >
                    Eliminar
                  </button>
                </div>
                <img src="src/front/img/visa.png" width={50} alt="Visa" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay otras tarjetas disponibles</p>
      )}
      {!change && (
        <button
          className="mt-4 text-white bg-gray-500 rounded-full py-2 px-4"
          onClick={handleChange}
        >
          AÑADIR UNA TARJETA
        </button>
      )}
      {change && (
        <div className="w-full">
          <div className="border rounded-3xl w-4/5 mt-4 p-4 bg-shape_primary">
            <div className="w-full">
              <h3 className="text-center font-bold">AÑADE UNA TARJETA PARA FUTURAS COMPRAS</h3>
              <div className="block mt-4">
                <label className="block mb-2">
                  Número de tarjeta *
                  <input
                    type="text"
                    name="card_number"
                    value={newCard.card_number}
                    onChange={handleInputChange}
                    className="block mt-2 mb-4 w-full rounded-full py-2 px-4 bg-shape_input border"
                  />
                </label>
                <label className="block mb-2">
                  Nombre en la tarjeta *
                  <input
                    type="text"
                    name="cardholder_name"
                    value={newCard.cardholder_name}
                    onChange={handleInputChange}
                    className="block mt-2 mb-4 w-full rounded-full py-2 px-4 bg-shape_input border"
                  />
                </label>
                <label className="block mb-2">
                  Fecha de vencimiento *
                  <input
                    type="text"
                    name="expiry_date"
                    value={newCard.expiry_date}
                    onChange={handleInputChange}
                    className="block mt-2 mb-4 w-full rounded-full py-2 px-4 bg-shape_input border"
                  />
                </label>
                <label className="block mb-2">
                  CVV *
                  <input
                    type="text"
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleInputChange}
                    className="block mt-2 mb-4 w-full rounded-full py-2 px-4 bg-shape_input border"
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-4/5 text-xl text-white rounded-full bg-shape_border_button mt-4 py-2 hover:bg-shape_red"
            onClick={handleSaveCard}
          >
            AÑADE TU TARJETA
          </button>
          <br />
          <button
            className="mt-4 hover:text-shape_red"
            onClick={handleChange}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
