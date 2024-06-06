import Rojas from "../../../img/img_content/icons/rojas.png";
import Blancas from "../../../img/img_content/icons/blancas.png";
import Cerdo from "../../../img/img_content/icons/cerdo.png";
import Casqueria from "../../../img/img_content/icons/casqueria.png";
import CarnesHeader from "../../../img/img_content/headers/carnes-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import VideoPlayer from "../../components/video-player";
import { videosCarnes } from "../../components/video-player/mocks";

export const Carnes = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={CarnesHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            CARNES Y CASQUERÍA
          </p>
          <p className="w-[450px] text-sm mt-4 text-shape_primary">
            Te acercamos la riqueza de este mundo en un completo recorrido que
            incluye carnes rojas, blancas, de cerdo, de caza y casquería.
          </p>
        </div>
      </div>
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Rojas} className="mb-4 max-h-24" alt="Video" />

            <p className="mb-2 text-2xl">
              ORGANIZACIÓN E<br /> Rojas
            </p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Blancas} className="mb-4 max-h-24" alt="Bandeja" />

            <p className="mb-2 text-2xl">
              MENAJE Y<br /> MAQUINARIA
            </p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Cerdo} className="mb-4 max-h-24" alt="Sombrero" />

            <p className="mb-2 text-2xl">CUCHILLOS</p>
          </div>
          {/* <!-- Cuarta columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Casqueria} className="mb-4 max-h-24" alt="Sombrero" />

            <p className="mb-2 text-2xl">ESPACIOS DE CONSERVACIÓN</p>
          </div>
        </div>
      </div>
      <div className="mb-14">
        {videosCarnes.map((video) => (
          <VideoPlayer key={video.id} title={video.title} subtitle={video.subtitle} videoUrl={video.videoUrl} />
        ))}
      </div>
      <Sponsor />
    </main>
  );
};
