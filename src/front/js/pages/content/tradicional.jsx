import Vegetales from "../../../img/img_content/icons/vegetales.png";
import TradicionalHeader from "../../../img/img_content/headers/tradicional-header.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import { videosTradicional } from "../../components/video-player/mocks";
import VideoPlayer from "../../components/video-player";

export const Tradicional = () => {
  return (
    <main>
      <div className="relative">
        <Slider2
          imageSrc={TradicionalHeader}
          imageHeight="400px"
          darken={true}
        />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-5xl tracking-widest text-red-600">
            COMIDA TRADICIONAL
          </p>
          <p className="w-[450px] text-sm mt-4 text-shape_primary">
            Conoce España y su diversidad cultural desde el paladar.
          </p>
        </div>
      </div>
      <div>
        <div className="mb-16 mt-16 flex justify-center w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center h-70 flex flex-col items-center justify-center">
            <img src={Vegetales} className="mb-4 max-h-24" alt="Video" />

            <p className="mb-2 text-2xl">COCINA TRADICIONAL</p>
          </div>
        </div>
      </div>
      <div className="mb-14">
        {videosTradicional.map((video) => (
          <VideoPlayer key={video.id} title={video.title} subtitle={video.subtitle} videoUrl={video.videoUrl} />
        ))}
      </div>
      <Sponsor />
    </main>
  );
};
