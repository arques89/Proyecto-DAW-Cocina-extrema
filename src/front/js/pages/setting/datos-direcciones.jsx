import { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const DatosDirecciones = () => {
  const { store, actions } = useContext(Context);
  const [change, setChange] = useState(false);
  const [editing, setEditing] = useState(false);
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
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    actions.getAddresses();
  }, []);

  const handleChange = (address = null) => {
    if (address) {
      setNewAddress(address);
      setCurrentId(address.id);
      setEditing(true);
    } else {
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
      setEditing(false);
    }
    setChange(!change);
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    if (editing) {
      actions.updateAddress(currentId, newAddress).then(() => {
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
        console.error("Error updating address:", error);
      });
    } else {
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
    }
  };

  const handleSetDefault = (id) => {
    actions.setDefaultBillingAddress(id).then(() => {
      actions.getAddresses();
    }).catch(error => {
      console.error("Error setting default billing address:", error);
    });
  };

  const handleDeleteAddress = (id) => {
    actions.deleteAddress(id).then(() => {
      actions.getAddresses();
    }).catch(error => {
      console.error("Error deleting address:", error);
    });
  };

  const addresses = store.addresses || [];
  const defaultBillingAddress = addresses.find(address => address.is_billing_default);
  const otherAddresses = addresses.filter(address => !address.is_billing_default);

  return (
    <div className="me-20">
      <div className="text-xl">
        <h3 className="pb-3 text-shape_border_button">
          MIS DIRECCIONES
        </h3>
        <hr />
      </div>
      <div className="flex my-4">
        <div className="w-1/2">
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
        <div className="w-1/2">
          <p className="mb-3 font-thin">Dirección de Envío</p>
          <p>Como dirección de facturación</p>
        </div>
      </div>
      <hr />
      {otherAddresses.length > 0 ? (
        otherAddresses.map((address, index) => (
          <div key={index} className="flex mt-4">
            <div className="w-1/2">
              <p className="mb-3 font-thin">Otras Direcciones</p>
              <p>{address.name}</p>
              <p>{address.surname}</p>
              <p>{address.cif_nif}</p>
              <p>{address.address}</p>
              <p>{address.postal_code} {address.city}</p>
              <p>{address.phone}</p>
            </div>
            <div className="w-1/2">
              <span className="flex font-thin mb-3">Usar como</span>
              <button
                onClick={() => handleSetDefault(address.id)}
                className="justify-end text-shape_red"
              >
                Dirección de Facturación predeterminada
              </button>
              <br />
              <button
                onClick={() => handleChange(address)}
                className="justify-end text-shape_red"
              >
                Editar
              </button>
              <br />
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="justify-end text-shape_red"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay direcciones disponibles</p>
      )}
      {!change && (
        <button
          className="mt-4 text-shape_border_button rounded-full border p-2 bg-shape_border_button text-white hover:bg-shape_red"
          onClick={() => handleChange()}
        >
          Agregar Nueva Dirección
        </button>
      )}
      {change && (
        <div className="w-full">
          <div className="border rounded-3xl w-4/5 mt-4">
            <div className="w-full">
              <button className="border w-full text-center rounded-full pr-44 py-1.5 pl-6 ">
                {editing ? "EDITAR DIRECCIÓN" : "AGREGAR DIRECCIÓN"}
              </button>
              <div className="block ms-7 mt-4">
                <div className="border-shape_border_button">
                  <label>
                    Nombre
                    <input
                      type="text"
                      name="name"
                      value={newAddress.name}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    Apellido
                    <input
                      type="text"
                      name="surname"
                      value={newAddress.surname}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    CIF/NIF
                    <input
                      type="text"
                      name="cif_nif"
                      value={newAddress.cif_nif}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    Dirección
                    <input
                      type="text"
                      name="address"
                      value={newAddress.address}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    Código Postal
                    <input
                      type="text"
                      name="postal_code"
                      value={newAddress.postal_code}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    Ciudad
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    Teléfono
                    <input
                      type="text"
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
                <div className="border-shape_border_button">
                  <label>
                    Usar como
                    <input
                      type="text"
                      name="use_as"
                      value={newAddress.use_as}
                      onChange={handleInputChange}
                      className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-4/5 text-2xl text-white rounded-full bg-shape_border_button mt-4 hover:bg-shape_red"
            onClick={handleSaveAddress}
          >
            {editing ? "GUARDAR CAMBIOS" : "GUARDAR DIRECCIÓN"}
          </button>
          <br />
          <button
            className="mt-4 text-shape_border_button hover:text-shape_red"
            onClick={() => handleChange()}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
