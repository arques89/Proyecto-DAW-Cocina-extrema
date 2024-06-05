import { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";

export const DatosBancarios = () => {
    const { store, actions } = useContext(Context);
    const [change, setChange] = useState(false);
    const [newBankData, setNewBankData] = useState({
        card_number: "",
        cardholder_name: "",
        expiry_date: "",
        cvv: "",
        is_default: false
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        actions.getBankData();
    }, []);

    const handleChange = () => {
        setChange(!change);
    };

    const handleInputChange = (e) => {
        setNewBankData({ ...newBankData, [e.target.name]: e.target.value });
    };

    const handleSaveBankData = () => {
        if (editId) {
            actions.updateBankData(editId, newBankData).then(() => {
                setNewBankData({
                    card_number: "",
                    cardholder_name: "",
                    expiry_date: "",
                    cvv: "",
                    is_default: false
                });
                setChange(false);
                setEditId(null);
                actions.getBankData();
            }).catch(error => {
                console.error("Error updating bank data:", error);
            });
        } else {
            actions.addBankData(newBankData).then(() => {
                setNewBankData({
                    card_number: "",
                    cardholder_name: "",
                    expiry_date: "",
                    cvv: "",
                    is_default: false
                });
                setChange(false);
                actions.getBankData();
            }).catch(error => {
                console.error("Error adding bank data:", error);
            });
        }
    };

    const handleSetDefault = (id) => {
        actions.setDefaultBankData(id).then(() => {
            actions.getBankData();
        }).catch(error => {
            console.error("Error setting default bank data:", error);
        });
    };

    const handleEdit = (bankData) => {
        setNewBankData(bankData);
        setEditId(bankData.id);
        setChange(true);
    };

    const handleDeleteBankData = (id) => {
        actions.deleteBankData(id).then(() => {
            actions.getBankData();
        }).catch(error => {
            console.error("Error deleting bank data:", error);
        });
    };

    const bankDataList = store.bankData || [];
    const defaultBankData = bankDataList.find(data => data.is_default);
    const otherBankData = bankDataList.filter(data => !data.is_default);

    return (
        <div className="me-20">
            <div className="text-xl">
                <h3 className="pb-3 text-shape_border_button">
                    DATOS BANCARIOS
                </h3>
                <hr />
            </div>
            <div className="flex my-4">
                <div className="w-1/2">
                    <p className="mb-3 font-thin">Tarjeta Predeterminada</p>
                    {defaultBankData ? (
                        <>
                            <p>{defaultBankData.card_number}</p>
                            <p>{defaultBankData.cardholder_name}</p>
                            <p>{defaultBankData.expiry_date}</p>
                            <p>{defaultBankData.cvv}</p>
                        </>
                    ) : (
                        <p>No hay tarjeta predeterminada</p>
                    )}
                </div>
                <div className="w-1/2">
                    <p className="mb-3 font-thin">Tarjeta de Envío</p>
                    <p>Como tarjeta predeterminada</p>
                </div>
            </div>
            <hr />
            {otherBankData.length > 0 ? (
                otherBankData.map((data, index) => (
                    <div key={index} className="flex mt-4">
                        <div className="w-1/2">
                            <p className="mb-3 font-thin">Otras Tarjetas</p>
                            <p>{data.card_number}</p>
                            <p>{data.cardholder_name}</p>
                            <p>{data.expiry_date}</p>
                            <p>{data.cvv}</p>
                        </div>
                        <div className="w-1/2">
                            <span className="flex font-thin mb-3">Usar como</span>
                            <button
                                onClick={() => handleSetDefault(data.id)}
                                className="justify-end text-shape_red"
                            >
                                Tarjeta Predeterminada
                            </button>
                            <br />
                            <button
                                onClick={() => handleEdit(data)}
                                className="justify-end text-shape_red"
                            >
                                Editar
                            </button>
                            <br />
                            <button
                                onClick={() => handleDeleteBankData(data.id)}
                                className="justify-end text-shape_red"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay tarjetas disponibles</p>
            )}
            {!change && (
                <button
                    className="mt-4 text-shape_border_button rounded-full border p-2 bg-shape_border_button text-white hover:bg-shape_red"
                    onClick={handleChange}
                >
                    Añadir una Tarjeta
                </button>
            )}
            {change && (
                <div className="w-full">
                    <div className="border rounded-3xl w-4/5 mt-4">
                        <div className="w-full">
                            <button className="border w-full text-center rounded-full pr-44 py-1.5 pl-6 ">
                                {editId ? "EDITAR TARJETA" : "AGREGAR TARJETA"}
                            </button>
                            <div className="block ms-7 mt-4">
                                <label>
                                    Número de Tarjeta
                                    <input
                                        type="text"
                                        name="card_number"
                                        value={newBankData.card_number}
                                        onChange={handleInputChange}
                                        className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </label>
                                <label>
                                    Nombre del Titular
                                    <input
                                        type="text"
                                        name="cardholder_name"
                                        value={newBankData.cardholder_name}
                                        onChange={handleInputChange}
                                        className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </label>
                                <label>
                                    Fecha de Expiración
                                    <input
                                        type="text"
                                        name="expiry_date"
                                        value={newBankData.expiry_date}
                                        onChange={handleInputChange}
                                        className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </label>
                                <label>
                                    CVV
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={newBankData.cvv}
                                        onChange={handleInputChange}
                                        className="block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-4/5 text-2xl text-white rounded-full bg-shape_border_button mt-4 hover:bg-shape_red"
                        onClick={handleSaveBankData}
                    >
                        {editId ? "GUARDAR CAMBIOS" : "GUARDAR TARJETA"}
                    </button>
                    <br />
                    <button
                        className="mt-4 text-shape_border_button hover:text-shape_red"
                        onClick={handleChange}
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};
