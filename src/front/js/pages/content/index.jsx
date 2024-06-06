import Creatividad from "../../../img/img_content/icons/creatividad.png";
import Tecnicas from "../../../img/img_content/icons/tecnicas.png";
import Practica from "../../../img/img_content/icons/practica.png";
import ContentHeader from "../../../img/img_content/headers/content-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import ContentCard from "../../components/ContentCard";

export const Content = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={ContentHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-4xl tracking-widest text-red-600">CONTENIDO</p>
          <p className="w-52 text-xl mt-2">Curso Cocina Extrema</p>
          <p className="w-w-75 text-sm mt-2 text-shape_primary">
            Aprende con los mejores chefs practicando en tu cocina ¿Qué puedes
            esperar de nuestro curso?
          </p>
        </div>
      </div>
      {/* <!-- Contenido principal --> */}
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Tecnicas} className="mb-4 max-h-24" alt="Video" />

            <p className="mb-2 text-2xl">TÉCNICAS AVANZADAS</p>
            <p className="text-font_icon text-sm">
              Métodos de cocina sofisticados y vanguardistas
            </p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Creatividad} className="mb-4 max-h-24" alt="Bandeja" />

            <p className="mb-2 text-2xl">CREATIVIDAD</p>
            <p className="text-font_icon text-sm">
              Capacidad de innovación en cada plato
            </p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Practica} className="mb-4 max-h-24" alt="Sombrero" />

            <p className="mb-2 text-2xl">PRÁCTICA</p>
            <p className="text-font_icon text-sm">
              Trabaja en condiciones reales de presión
            </p>
          </div>
        </div>
      </div>

      <section className="px-20 w-full mb-2">
        <ContentCard />
      </section>

      <Sponsor />
    </main>
  );
};
