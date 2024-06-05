import Menaje from "../../../img/img_content/icons/menaje.png";
import Higiene from "../../../img/img_content/icons/higiene.png";
import Cuchillo from "../../../img/img_content/icons/cuchillo.png";
import Conservacion from "../../../img/img_content/icons/conservacion.png";
import IntroductionHeader from "../../../img/img_content/headers/introduction-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";

export const Introduction = () => {
  return (
    <main>
      <div className="relative">
        <Slider2
          imageSrc={IntroductionHeader}
          imageHeight="400px"
          darken={true}
        />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            INTRODUCCIÓN A LA COCINA
          </p>
          <p className="w-[400px] text-sm mt-4 text-shape_primary">
            Conoce el menaje indispensable y los electrodomésticos básicos, los
            distintos cuchillos y cómo hacer los principales cortes.
          </p>
        </div>
      </div>
      {/* <!-- Contenido principal --> */}
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Higiene} className="mb-4 max-h-24" alt="Video" />
            </a>
            <p className="mb-2 text-2xl">ORGANIZACIÓN E<br/> HIGIENE</p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Menaje} className="mb-4 max-h-24" alt="Bandeja" />
            </a>
            <p className="mb-2 text-2xl">MENAJE Y<br/> MAQUINARIA</p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Cuchillo} className="mb-4 max-h-24" alt="Sombrero" />
            </a>
            <p className="mb-2 text-2xl">CUCHILLOS</p>
          </div>
          {/* <!-- Cuarta columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img
                src={Conservacion}
                className="mb-4 max-h-24"
                alt="Sombrero"
              />
            </a>
            <p className="mb-2 text-2xl">ESPACIOS DE CONSERVACIÓN</p>
          </div>
        </div>
      </div>

      <Sponsor />
    </main>
  );
};
