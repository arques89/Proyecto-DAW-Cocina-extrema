import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const DatosDirecciones = () => {
  const { store, actions } = useContext(Context);
  const [change, setChange] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    surname: "",
    cif_nif: "",
    address: "",
    postal_code: "",
    city: "",
    phone: "",
    use_as: ""
  });

  useEffect(() => {
    actions.getAddresses();
  }, []);

  const handleChange = () => {
    setChange(!change);
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    actions.addAddress(newAddress).then(() => {
      setNewAddress({
        name: "",
        surname: "",
        cif_nif: "",
        address: "",
        postal_code: "",
        city: "",
        phone: "",
        use_as: ""
      });
      setChange(false);
      actions.getAddresses();
    }).catch(error => {
      console.error("Error adding address:", error);
    });
  };

  const handleSetDefault = (id) => {
    actions.setDefaultBillingAddress(id).then(() => {
      actions.getAddresses();
    }).catch(error => {
      console.error("Error setting default billing address:", error);
    });
  };

  const addresses = store.addresses || [];
  const defaultBillingAddress = addresses.find(address => address.is_billing_default);
  const otherAddresses = addresses.filter(address => !address.is_billing_default);

  return (
    <div className="">
      <div className="text-xl">
        <h3 className="pb-3 text-shape_border_button bg-pink-600">
          MIS DIRECCIONES
        </h3>
        <hr />
      </div>
      <div className="flex">
        <div className="w-1/2 bg-red-300">
          <p className="mb-3 font-thin">Dirección de Facturación</p>
          {defaultBillingAddress ? (
            <>
              <p>{defaultBillingAddress.name}</p>
              <p>{defaultBillingAddress.surname}</p>
              <p>{defaultBillingAddress.cif_nif}</p>
              <p>{defaultBillingAddress.address}</p>
              <p>{defaultBillingAddress.postal_code} {defaultBillingAddress.city}</p>
              <p>{defaultBillingAddress.phone}</p>
            </>
          ) : (
            <p>No hay dirección de facturación predeterminada</p>
          )}
        </div>
        <div className="w-1/2 bg-green-300">
          <p className="mb-3 font-thin">Dirección de Envío</p>
          <p>Como dirección de facturación</p>
        </div>
      </div>
      <hr />
      {otherAddresses.length > 0 ? (
        otherAddresses.map((address, index) => (
          <div key={index} className="flex mt-4">
            <div className="w-1/2 bg-red-300">
              <p className="mb-3 font-thin">Otras Direcciones</p>
              <p>{address.name}</p>
              <p>{address.surname}</p>
              <p>{address.cif_nif}</p>
              <p>{address.address}</p>
              <p>{address.postal_code} {address.city}</p>
              <p>{address.phone}</p>
            </div>
            <div className="w-1/2 bg-green-300">
              <span className="flex font-thin mb-3">Usar como</span>
              <p>{address.use_as}</p>
              <div className="">
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="justify-end text-shape_red"
                >
                  Dirección de Facturación predeterminada
                </button>
                <button
                  onClick={handleChange}
                  className="justify-end text-shape_red"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay direcciones disponibles</p>
      )}
      {!change && (
        <button
          className="mt-4 text-shape_border_button"
          onClick={handleChange}
        >
          Agregar Nueva Dirección
        </button>
      )}
      {change && (
        <div className="w-full">
          <div className="border rounded-3xl w-full mt-4">
            <div className="w-full">
              <span className="border border-shape_border_button w-full text-center rounded-full pr-44 py-1.5 pl-6 inline-block">
                AGREGAR DIRECCIÓN
              </span>
              <div className="block ms-7 mt-4">
                {Object.keys(newAddress).map((key) => (
                  <div key={key} className="border-shape_border_button">
                    <label>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
                      <input
                        type="text"
                        name={key}
                        value={newAddress[key]}
                        onChange={handleInputChange}
                        className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-1/2 text-2xl text-white rounded-full bg-shape_border_button mt-4"
            onClick={handleSaveAddress}
          >
            GUARDAR DIRECCIÓN
          </button>
          <button
            className="mt-4 text-shape_border_button"
            onClick={handleChange}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
