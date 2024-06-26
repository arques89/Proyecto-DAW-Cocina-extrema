import Huevos from "../../../img/img_content/icons/huevos.png";
import Aves from "../../../img/img_content/icons/aves.png";
import AvesHeader from "../../../img/img_content/headers/aves-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import VideoPlayer from "../../components/video-player";
import { videosAves } from "../../components/video-player/mocks";

export const AvesHuevos = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={AvesHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">AVES Y HUEVOS</p>
          <p className="w-[400px] text-sm mt-4 text-shape_primary">
            Descubre las bondades de una carne tan sana como la de ave. Domina
            el huevo y trabaja ese manjar tan especial: el foie-gras.
          </p>
        </div>
      </div>
      {/* <!-- Contenido principal --> */}
      <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
        {/* <!-- Primera columna de imagen --> */}
        <div className="text-center w-1/2 h-70 flex flex-col items-center justify-center">
          <img src={Aves} className="mb-4 max-h-24" alt="aves" />

          <p className="mb-2 text-2xl">AVES</p>
        </div>

        {/* <!-- Segunda columna de imagen --> */}
        <div className="text-center w-1/2 h-70 flex flex-col items-center justify-center">
          <img src={Huevos} className="mb-4 max-h-24" alt="huevos" />

          <p className="mb-2 text-2xl">HUEVOS</p>
        </div>
      </div>
      <div className="mb-14">
        {videosAves.map((video) => (
          <VideoPlayer key={video.id} title={video.title} subtitle={video.subtitle} videoUrl={video.videoUrl} />
        ))}
      </div>
      <Sponsor />
    </main>
  );
};
