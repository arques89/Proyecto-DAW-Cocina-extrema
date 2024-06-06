import Vegetales from "../../../img/img_content/icons/vegetales.png";
import Setas from "../../../img/img_content/icons/setas.png";
import Bizcochos from "../../../img/img_content/icons/bizcochos.png";
import Especias from "../../../img/img_content/icons/vegetales.png";
import ReposteriaHeader from "../../../img/img_content/headers/reposteria-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import { videosReposteria } from "../../components/video-player/mocks";
import VideoPlayer from "../../components/video-player";

export const Reposteria = () => {
  return (
    <main>
      <div className="relative">
        <Slider2
          imageSrc={ReposteriaHeader}
          imageHeight="400px"
          darken={true}
        />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            UNIVERSO DULCE
          </p>
          <p className="w-[450px] text-sm mt-4 text-shape_primary">
            Un completo recorrido sobre “lo dulce” destinado a los más golosos
            que no dejarán de salivar desde el primer momento.
          </p>
        </div>
      </div>
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Vegetales} className="mb-4 max-h-24" alt="Video" />

            <p className="mb-2 text-2xl">CHOCOLATE</p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Setas} className="mb-4 max-h-24" alt="Bandeja" />

            <p className="mb-2 text-2xl">GALLETAS</p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Bizcochos} className="mb-4 max-h-24" alt="Bizcochos" />

            <p className="mb-2 text-2xl">BIZCOCHOS</p>
          </div>
          {/* <!-- Cuarta columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <img src={Especias} className="mb-4 max-h-24" alt="Sombrero" />

            <p className="mb-2 text-2xl">FLAN Y NATILLAS</p>
          </div>
        </div>
      </div>
      <div className="mb-14">
        {videosReposteria.map((video) => (
          <VideoPlayer key={video.id} title={video.title} subtitle={video.subtitle} videoUrl={video.videoUrl} />
        ))}
      </div>
      <Sponsor />
    </main>
  );
};
