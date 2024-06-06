import Blancos from "../../../img/img_content/icons/blancos.png";
import Azules from "../../../img/img_content/icons/azules.png";
import Mariscos from "../../../img/img_content/icons/mariscos.png";
import PastasHeader from "../../../img/img_content/headers/pasta-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import { videosPastas } from "../../components/video-player/mocks";
import VideoPlayer from "../../components/video-player";

export const Pastas = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={PastasHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            PASTAS Y CEREALES
          </p>
          <p className="w-[450px] text-sm mt-4 text-shape_primary">
            Aprende a trabajar la pasta fresca, y a hacer arroces secos,
            caldosos o risottos. Y haz de tu cocina una pequeña panadería.
          </p>
        </div>
      </div>
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Blancos} className="mb-4 max-h-24" alt="Video" />

            <p className="mb-2 text-2xl">PASTAS</p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Azules} className="mb-4 max-h-24" alt="Bandeja" />

            <p className="mb-2 text-2xl">ARROCES</p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Mariscos} className="mb-4 max-h-24" alt="Sombrero" />

            <p className="mb-2 text-2xl">PANES</p>
          </div>
        </div>
      </div>
      <div className="mb-14">
        {videosPastas.map((video) => (
          <VideoPlayer key={video.id} title={video.title} subtitle={video.subtitle} videoUrl={video.videoUrl} />
        ))}
      </div>
      <Sponsor />
    </main>
  );
};
