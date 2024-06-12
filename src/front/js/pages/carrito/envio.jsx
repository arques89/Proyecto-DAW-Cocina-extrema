import { Sponsor } from "../../components/sponsor";
import IconoCesta from "../../../img/img_carrito/icons/cesta.png";
import IconoEnvio from "../../../img/img_carrito/icons/envio.png";
import IconoPago from "../../../img/img_carrito/icons/envio.png";
import { useState } from 'react';

export const Envio = () => {
    const [tarjetaRegalo, setTarjetaRegalo] = useState(false);
    const [necesitaFactura, setNecesitaFactura] = useState(false);
  
    const toggleTarjetaRegalo = () => {
      setTarjetaRegalo(!tarjetaRegalo);
    };
  
    const toggleNecesitaFactura = () => {
      setNecesitaFactura(!necesitaFactura);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
  
      if (!form.checkValidity()) {
        form.reportValidity();
      } else {
        // Aquí puedes manejar el envío del formulario
        console.log('Formulario enviado');
      }
    };
  
    return (
      <main className="bg-shape_primary">
        <section>
          <div className="container mx-auto py-16">
            <div className="flex justify-around items-center">
              {/* Primera columna */}
              <div className="flex flex-col items-center">
                <img src={IconoCesta} alt="Icon 1" className="h-16 w-16 mb-4" />
                <p className="text-xl mb-2">MI CESTA</p>
                <div className="w-full border-t-2 border-gray-400"></div>
              </div>
  
              {/* Segunda columna */}
              <div className="flex flex-col items-center">
                <img src={IconoEnvio} alt="Icon 2" className="h-16 w-16 mb-4" />
                <p className="text-xl font-bold mb-2 text-shape_red">ENVÍO</p>
                <div className="w-full border-t-4 border-gray-600"></div>{" "}
                {/* Línea más oscura */}
              </div>
  
              {/* Tercera columna */}
              <div className="flex flex-col items-center">
                <img src={IconoPago} alt="Icon 3" className="h-16 w-16 mb-4" />
                <p className="text-xl mb-2">PAGO</p>
                <div className="w-full border-t-2 border-gray-400"></div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto">
          <div className="bg-shape_primary p-8 rounded-lg">
            <form className="space-y-6 bg-shape_primary" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input type="text" className="bg-shape_input w-full p-2 rounded-full border" required />
              </div>
              <div>
                <label className="block text-gray-700 mt-2 mb-2">Apellido</label>
                <input type="text" className="bg-shape_input w-full p-2 rounded-full border" required />
              </div>
              <div>
                <label className="block text-gray-700 mt-2 mb-2">Dirección de Envío</label>
                <input type="text" className="bg-shape_input w-full p-2 rounded-full border" required />
              </div>
              <div>
                <label className="block text-gray-700 mt-2 mb-2">Teléfono</label>
                <input type="text" className="bg-shape_input w-full p-2 rounded-full border" required />
              </div>
              <div>
                <label className="block text-gray-700 mt-2 mb-2">Email</label>
                <input type="email" className="bg-shape_input w-full p-2 rounded-full border" required />
              </div>
              <div className="flex justify-between items-center">
                <div
                  onClick={toggleTarjetaRegalo}
                  className={`cursor-pointer px-4 py-2 rounded-full border mt-4 ${tarjetaRegalo ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  ¿Quiere tarjeta regalo?
                </div>
                <div
                  onClick={toggleNecesitaFactura}
                  className={`cursor-pointer px-4 py-2 rounded-full border mt-4 ${necesitaFactura ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  ¿Necesita factura?
                </div>
              </div>
              {necesitaFactura && (
                <>
                  <div>
                    <label className="block text-gray-700">Razón Social</label>
                    <input type="text" className="w-full p-3 rounded-lg border border-gray-300" required />
                  </div>
                  <div>
                    <label className="block text-gray-700">CIF</label>
                    <input type="text" className="w-full p-3 rounded-lg border border-gray-300" required />
                  </div>
                  <div>
                    <label className="block text-gray-700">Dirección de Facturación</label>
                    <input type="text" className="w-full p-3 rounded-lg border border-gray-300" required />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full p-3 rounded-lg border border-gray-300" required />
                  </div>
                </>
              )}
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg">Enviar</button>
              </div>
            </form>
          </div>
        </div>
        <section>
        </section>
        <Sponsor />
      </main>
    );
  };