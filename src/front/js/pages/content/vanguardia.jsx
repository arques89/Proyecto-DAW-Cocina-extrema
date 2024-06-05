import Vegetales from "../../../img/img_content/icons/vegetales.png";
import VanguardiaHeader from "../../../img/img_content/headers/vanguardia-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";

export const Vanguardia = () => {
  return (
    <main>
      <div className="relative">
        <Slider2
          imageSrc={VanguardiaHeader}
          imageHeight="400px"
          darken={true}
        />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            COCINA DE VANGUARDIA
          </p>
          <p className="w-[450px] text-sm mt-4 text-shape_primary">
            ¿Quieres dar un paso más en la cocina para sorprender a tu familia o
            amigos?
          </p>
        </div>
      </div>
      <div>
        <div className="mb-16 mt-16 flex justify-center w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Vegetales} className="mb-4 max-h-24" alt="Video" />
            </a>
            <p className="mb-2 text-2xl">COCINA TRADICIONAL</p>
          </div>
        </div>
      </div>
      <Sponsor />
    </main>
  );
};
