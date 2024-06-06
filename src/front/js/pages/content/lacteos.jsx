import Quesos from "../../../img/img_content/icons/vegetales.png";
import Lact from "../../../img/img_content/icons/vegetales.png";
import LacteosHeader from "../../../img/img_content/headers/lacteos-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import { videosLacteos } from "../../components/video-player/mocks";
import VideoPlayer from "../../components/video-player";

export const Lacteos = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={LacteosHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            QUESOS Y LÁCTEOS
          </p>
          <p className="w-[400px] text-sm mt-4 text-shape_primary">
            Entra en el mundo de los quesos y los lácteos: las variedades, sus
            cortes, o cómo se hace mantequilla y yogurt.
          </p>
        </div>
      </div>
      {/* <!-- Contenido principal --> */}
      <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
        {/* <!-- Primera columna de imagen --> */}
        <div className="text-center w-1/2 h-70 flex flex-col items-center justify-center">
          <img src={Quesos} className="mb-4 max-h-24" alt="aves" />

          <p className="mb-2 text-2xl">QUESOS</p>
        </div>

        {/* <!-- Segunda columna de imagen --> */}
        <div className="text-center w-1/2 h-70 flex flex-col items-center justify-center">
          <img src={Lact} className="mb-4 max-h-24" alt="huevos" />

          <p className="mb-2 text-2xl">LÁCTEOS</p>
        </div>
      </div>
      <div className="mb-14">
        {videosLacteos.map((video) => (
          <VideoPlayer key={video.id} title={video.title} subtitle={video.subtitle} videoUrl={video.videoUrl} />
        ))}
      </div>
      <Sponsor />
    </main>
  );
};
