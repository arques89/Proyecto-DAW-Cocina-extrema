import Vegetales from "../../../img/img_content/icons/vegetales.png";
import Setas from "../../../img/img_content/icons/setas.png";
import Frutas from "../../../img/img_content/icons/frutas.png";
import Especias from "../../../img/img_content/icons/vegetales.png";
import VerdurasHeader from "../../../img/img_content/headers/verduras-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";

export const Verduras = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={VerdurasHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">MUNDO VEGETAL</p>
          <p className="w-[450px] text-sm mt-4 text-shape_primary">
            Profundiza y cocina con imaginación las Vegetales, hortalizas,
            setas, hongos, hierbas y especias, que más se utilizan en la cocina.
          </p>
        </div>
      </div>
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Vegetales} className="mb-4 max-h-24" alt="Video" />
            </a>
            <p className="mb-2 text-2xl">VERDURAS</p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Setas} className="mb-4 max-h-24" alt="Bandeja" />
            </a>
            <p className="mb-2 text-2xl">SETAS Y HONGOS</p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Frutas} className="mb-4 max-h-24" alt="Sombrero" />
            </a>
            <p className="mb-2 text-2xl">FRUTAS</p>
          </div>
          {/* <!-- Cuarta columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Especias} className="mb-4 max-h-24" alt="Sombrero" />
            </a>
            <p className="mb-2 text-2xl">ESPECIAS</p>
          </div>
        </div>
      </div>
      <Sponsor />
    </main>
  );
};
