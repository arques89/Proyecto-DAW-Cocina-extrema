import { UserIcon } from "@heroicons/react/24/outline";

export const Settings = () => {
  return (
    <>
      <div className="bg-shape_primary">
        <section className="flex ps-36 bg-red-300">
          <div className="block mt-16 pt-0 bg-green-200">
            {/* Button UserIcon */}
            <div>
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <UserIcon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div className="text-xl w-52 mt-2">
              <h3 className="mb-2 text-shape_border_button">HOLA !!</h3>
              <h3 className="text-shape_red">JAVIER ARQUES</h3>
              <hr className="mt-3 w-full" />
            </div>
          </div>
          <div className="flex  w-full justify mt-14">
            <div className="block w-full ps-32 px-60 ms-1">
              <div className="flex w-full justify-between ps-72 px-16 text-xl font-thin">
                <span>Home</span>
                <span>Programa</span>
                <span>Escuela</span>
                <span>Vlog</span>
                <span className="pe-32">Tienda</span>
              </div>
              <div className="mt-12 ms-80 ps-6 text-xl">
                <h3 className="mb-3 text-shape_border_button">
                  DATOS PERSONALES
                </h3>
                <hr />
              </div>
            </div>
          </div>
        </section>

        <section className="block ps-36 pb-12 bg-blue-gray-500">
          <div className="mt-6 font-thin">
            <ul className="mt-6">
              <li className="font-bold mb-2">MIS DATOS</li>
              <li className="mb-2">Modificar mis datos</li>
              <li className="mb-2">Mis direcciones</li>
              <li className="mb-2">Mis tarjetas bancarias</li>
            </ul>
            <ul className="mt-6">
              <li className="font-bold mb-2">MIS PEDIDOS</li>
              <li className="mb-2">Ver mis pedidos</li>
              <li className="mb-2">Devoluciones</li>
              <li className="mb-2">Mi lista de deseos</li>
            </ul>
            <ul className="mt-6">
              <li className="font-bold mb-2">MI CONTENIDO</li>
              <li className="mb-2">Contenido compartido</li>
              <li className="mb-2">Mis favoritos</li>
            </ul>
            <ul className="mt-6">
              <li className="font-bold mb-2">¿NECESITAS AYUDA?</li>
              <li>Contactanos</li>
            </ul>
          </div>
          <div className="text-xl w-52">
            <hr className="mt-3 w-full" />
            <img
              className="mt-6 mb-2"
              src="src\front\img\power_button.png"
              width={28}
              alt=""
            />
            <h3 className="mb-3 text-shape_border_button w-60">
              NOS VEMOS PRONTO !!
            </h3>
            <h3 className="text-shape_red">CERRAR SESIÓN</h3>
          </div>
        </section>
      </div>
    </>
  );
};
