export const Contact = () => {
  return (
    <div className="me-20">
      <div className="text-xl">
        <h3 className=" pb-3 text-shape_border_button">
          DATOS PERSONALES
        </h3>
        <hr />
      </div>
      <div className="flex mt-4">
        <div className="w-1/2">
          <p className="mb-3 font-thin">DIRECCION</p>
          <p>Calle Cadarso 8,</p>
          <p>28011, Madrid</p>
          <p>+34 629 679 534</p>
        </div>
        <div className="w-1/2">
          <p>hello@cocinaextrema.es</p>
          <br />
          <p>
            En Cocina Extrema siempre estamos abiertos a descubrir nuevos retos
            y oportunidades. Si te gustaría descubrir qué podemos hacer juntos
            ¡escríbenos!
          </p>
          <br />
          <p>escuela@cocinaextrema.es</p>
          <br />
          <p>Si quieres aprender de cocina en nuestra escuela y aún te tienes dudas ¡contáctanos!</p>
        </div>
      </div>
    </div>
  );
};
