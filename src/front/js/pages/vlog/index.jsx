// src/front/js/pages/vlog/index.jsx
import { CardVideo } from '../../components/card/card_video';
import { videos } from './mocks';
import Appetizer from "../../../icon/vlog/appetizer.png";
import Fish from "../../../icon/vlog/fish.png";
import Meet from "../../../icon/vlog/meet.png";
import Dessert from "../../../icon/vlog/dessert.png";
import { Slider } from "../../components/vlog_slider";

export const Vlog = () => {
  return (
    <main>
      <Slider />
      <div className="mb-12 flex justify-between w-full text-white px-32">
        {/* Primera columna de imagen */}
        <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
          <a href="/">
            <img src={Appetizer} className="mb-12 max-h-20" alt="Appetizer" />
          </a>
          <p className="mb-6 text-2xl">APERITIVO</p>
          <p className="text-font_icon text-sm">Entrantes Para Compartir</p>
        </div>

        {/* Segunda columna de imagen */}
        <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
          <a href="/">
            <img src={Fish} className="img-fluid mb-8 max-h-24" alt="Fish" />
          </a>
          <p className="mb-6 text-2xl">PESCADO</p>
          <p className="text-font_icon text-sm">Recetas de Pescados y Mariscos</p>
        </div>

        {/* Tercera columna de imagen */}
        <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
          <a href="/">
            <img src={Meet} className="img-fluid mb-12 max-h-20" alt="Meet" />
          </a>
          <p className="mb-6 text-2xl">CARNE</p>
          <p className="text-font_icon text-sm">Sabrosos platos de Carnes</p>
        </div>

        {/* Cuarta columna de imagen */}
        <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
          <a href="/">
            <img src={Dessert} className="img-fluid mb-12 max-h-20" alt="Dessert" />
          </a>
          <p className="mb-6 text-2xl">POSTRE</p>
          <p className="text-font_icon text-sm">Deliciosos Dulces para Terminar</p>
        </div>
      </div>

      <section className="flex px-28 mt-24 w-full mb-4">
        <div className="text-white font-thin">
          <p className="text-4xl">Publicaciones</p>
          <p className="text-sm my-8">Recetas Compartidas</p>
        </div>
      </section>
      
      <div>
        <CardVideo videos={videos} />
      </div>
    </main>
  );
};
