export const Settings = () => {
  return (
    <>
      <div className="bg-shape_primary">
        <section className="flex">
          <div className="block ms-32">
            <img src="" alt="" />
            <h3>Hola!!</h3>
            <h3>JAVIER ARQUES</h3>
            <hr />
          </div>
          <div className="flex  w-full justify mt-14">
            <div className="block w-full px-60 ms-10">
              <div className="flex w-full justify-between ms-72 px-14 text-xl">
                <span>Home</span>
                <span>Programa</span>
                <span>Escuela</span>
                <span>Vlog</span>
                <span className="pe-32">Tienda</span>
              </div>
              <div className="mt-16 ms-80 ps-6">
                <h3 className="mb-3">DATOS PERSONALES</h3>
                <hr/>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div>
            <ul>
              <li>MIS DATOS</li>
              <li>Modificar mis datos</li>
              <li>Mis direcciones</li>
              <li>Mis tarjetas bancarias</li>
            </ul>
            <ul>
              <li>MIS PEDIDOS</li>
              <li>Ver mis pedidos</li>
              <li>Devoluciones</li>
              <li>Mi lista de deseos</li>
            </ul>
            <ul>
              <li>MI CONTENIDO</li>
              <li>Contenido compartido</li>
              <li>Mis favoritos</li>
            </ul>
            <ul>
              <li>¿NECESITAS AYUDA?</li>
              <li>Contactanos</li>
            </ul>
          </div>
          <div>
            <img src="" alt="" />
            <h2>NOS VEMOS PRONTO !!</h2>
            <h2>CERRAR SESION</h2>
          </div>
        </section>
      </div>
    </>
  );
};
