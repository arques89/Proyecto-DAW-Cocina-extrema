import Panes from "../../../img/img_content/icons/huevos.png";
import Bolleria from "../../../img/img_content/icons/aves.png";
import PanesHeader from "../../../img/img_content/headers/panes-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";

export const Panaderia = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={PanesHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            PANADERÍA Y BOLLERÍA
          </p>
          <p className="w-[400px] text-sm mt-4 text-shape_primary">
            Aprende a hacer deliciosos panes y bollos artesanales.
          </p>
        </div>
      </div>
      {/* <!-- Contenido principal --> */}
      <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
        {/* <!-- Primera columna de imagen --> */}
        <div className="text-center w-1/2 h-70 flex flex-col items-center justify-center">
          <a href="/">
            <img src={Panes} className="mb-4 max-h-24" alt="aves" />
          </a>
          <p className="mb-2 text-2xl">PANES</p>
        </div>

        {/* <!-- Segunda columna de imagen --> */}
        <div className="text-center w-1/2 h-70 flex flex-col items-center justify-center">
          <a href="/">
            <img src={Bolleria} className="mb-4 max-h-24" alt="huevos" />
          </a>
          <p className="mb-2 text-2xl">BOLLERIA</p>
        </div>
      </div>
      <Sponsor />
    </main>
  );
};
