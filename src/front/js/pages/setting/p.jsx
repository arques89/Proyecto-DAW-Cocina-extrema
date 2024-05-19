
export const Settings = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Prosalud</h1>
          <nav className="mt-4">
            <ul className="flex flex-row gap-4">
              <li className="text-gray-600 hover:text-gray-800 transition-colors">
                <a href="#">Home</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 transition-colors">
                <a href="#">Programa</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 transition-colors">
                <a href="#">Escuela</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 transition-colors">
                <a href="#">Vlog</a>
              </li>
              <li className="text-gray-600 hover:text-gray-800 transition-colors">
                <a href="#">Tienda</a>
              </li>
            </ul>
          </nav>
        </div>
  
        <div className="flex flex-col justify-start mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">HOLA!!</h2>
          <h3 className="text-xl font-medium text-gray-600">JAVIER ARQUES</h3>
          <div className="flex flex-row items-center gap-4 mt-4">
            <p className="text-gray-600">Datos Personales</p>
            <button className="rounded-full bg-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-300 transition-colors">
              Editar
            </button>
          </div>
        </div>
  
        <div className="flex flex-col items-center justify-between mb-12">
          <h4 className="text-lg font-medium text-gray-800">MIS DATOS</h4>
          <div className="flex flex-row items-center gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Apellido</label>
              <input
                type="text"
                className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Arques"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Mis Pedidos</label>
              <input
                type="text"
                className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ver pedidos"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-gray-600">Devoluciones</label>
              <input
                type="text"
                className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ver devoluciones"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600">Teléfono</label>
              <input
                type="text"
                className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(555) 555-5555"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  