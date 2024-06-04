import { useState } from "react";
import { DetallesPedido } from "./detalles-pedido";

export const DatosPedidos = () => {
  const [detallePedido, setDetallePedido] = useState(null);

  const handleVerDetalle = (pedido) => {
    setDetallePedido(pedido);
  };

  const pedidos = [
    {
      id: 889714472,
      estado: "En reparto",
      fecha: "16/04/2024",
      importe: 348.99,
      acciones: "Ver",
    },
    {
      id: 827644892,
      estado: "Entregado",
      fecha: "05/02/2024",
      importe: 94.95,
      acciones: "Ver",
    },
    {
      id: 872885492,
      estado: "Entregado",
      fecha: "20/11/2023",
      importe: 1068.39,
      acciones: "Ver",
    },
    {
      id: 817825162,
      estado: "Entregado",
      fecha: "18/03/2023",
      importe: 295.67,
      acciones: "Ver",
    },
    {
      id: 851233462,
      estado: "Entregado",
      fecha: "09/12/2022",
      importe: 12615,
      acciones: "Ver",
    },
    {
      id: 808868831,
      estado: "Entregado",
      fecha: "25/06/2022",
      importe: 51.95,
      acciones: "Ver",
    },
  ];

  return (
    <div className="">
      {detallePedido ? (
        <DetallesPedido pedido={detallePedido} setDetallePedido={setDetallePedido} />
      ) : (
        <>
          <div className="text-xl">
            <h3 className=" pb-3 text-shape_border_button">MIS PEDIDOS</h3>
            <hr />
          </div>
          <div className="mx-auto">
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left p-2">N° PEDIDO</th>
                  <th className="text-left p-2">ESTADO</th>
                  <th className="text-left p-2">FECHA</th>
                  <th className="text-left p-2">IMPORTE</th>
                  <th className="text-left p-2">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td className="p-2">{pedido.id}</td>
                    <td className="p-2">{pedido.estado}</td>
                    <td className="p-2">{pedido.fecha}</td>
                    <td className="p-2 text-left">{pedido.importe.toFixed(2)} €</td>
                    <td className="p-2 text-left">
                      <button
                        className="text-shape_red px-3 py-2 rounded"
                        onClick={() => handleVerDetalle(pedido)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
