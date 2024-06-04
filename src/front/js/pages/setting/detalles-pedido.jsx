import PropTypes from 'prop-types';

export const DetallesPedido = ({ pedido, setDetallePedido }) => {
  const productos = [
    {
      id: 1,
      nombre: "Cacerola Cocotte oval de hierro",
      color: "Rojo",
      diametro: "31 CM/6.3L",
      referencia: "C11178",
      precio: 218.99,
      cantidad: 1,
      importe: 218.99,
    },
    {
      id: 2,
      nombre: "Set de 4 espátulas y bote de gres",
      color: "Rojo",
      referencia: "621592",
      precio: 37.5,
      cantidad: 2,
      importe: 45,
    },
    {
      id: 3,
      nombre: "Mortero de gres",
      color: "Rojo",
      referencia: "M11467",
      precio: 37.5,
      cantidad: 1,
      importe: 37.5,
    },
  ];

  const gastosDeEnvio = 10;
  const total =
    productos.reduce((total, producto) => total + producto.importe, 0) +
    gastosDeEnvio;

  return (
    <div>
      <div className="text-xl">
        <h3 className=" pb-3 text-shape_border_button">PEDIDO #{pedido.id}</h3>
        <hr />
      </div>

      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <p className="font-bold">CONFIRMACIÓN DEL PEDIDO</p>
          <p>Fecha: {pedido.fecha}</p>
        </div>
        <div className="w-1/2">
          <p className="font-bold">DIRECCIÓN DE ENVÍO</p>
          <p>CALLE DEL MEZOUITE 2</p>
          <p>BAJO COMERCIAL</p>
          <p>28008 MADRID</p>
          <p>ESPAÑA</p>
        </div>
        <div className="w-1/2">
          <p className="font-bold">MÉTODO DE PAGO</p>
          <p>Tarjeta de crédito</p>
        </div>
      </div>

      <table className="w-full">
        <thead className="">
          <tr>
            <th className="text-left">PRODUCTO</th>
            <th className="text-left">PRECIO</th>
            <th className="text-left">CANTIDAD</th>
            <th className="text-left">IMPORTE</th>
          </tr>
        </thead>
        <tbody className="">
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="pb-4">
                <p className="text-sm">{producto.nombre}</p>
                <p className="text-sm">{producto.color && ` (${producto.color})`}</p>
                <p className="text-sm">{producto.diametro && ` - ${producto.diametro}`}</p>
                <p className="text-sm">{producto.referencia && ` (Ref: ${producto.referencia})`}</p>
              </td>
              <td className="text-left p-2 align-top">
                {producto.precio.toFixed(2)} €
              </td>
              <td className="text-left p-2 align-top">{producto.cantidad}</td>
              <td className="text-left p-2 align-top">
                {producto.importe.toFixed(2)} €
              </td>
            </tr>
          ))}
          <hr className="w-full bg-red-600" />
          <tr>
            <td className="p-2 border-t"></td>
            <td className="p-2 border-t"></td>
            <td className="p-2 border-t text-righ">Importe</td>
            <td className="p-2 border-t text-left">{total.toFixed(2)} €</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="p-2 text-left">Gastos de envío</td>
            <td className="p-2 text-left">
              {gastosDeEnvio.toFixed(2)} €
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="p-2 text-left font-bold">TOTAL</td>
            <td className="p-2 text-left font-bold">
              {total.toFixed(2)} €
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-full"
          onClick={() => setDetallePedido(null)}
        >
          Volver atrás
        </button>
        <span className="text-shape_red py-2 pe-14">
          ¿Deseas devolveralgún articulo de este pedido?
        </span>
      </div>

      <div className="flex justify-start mt-8">
      </div>
    </div>
  );
};
DetallesPedido.propTypes = {
  pedido: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fecha: PropTypes.string.isRequired,
  }).isRequired,
  setDetallePedido: PropTypes.func.isRequired,
};