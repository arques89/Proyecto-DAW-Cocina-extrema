import { Slider2 } from "../../components/slider2";
import Plaqueta from "../../../img/img_home/icons/rojo_video.png";
import Bandeja from "../../../img/img_home/icons/rojo_bandeja.png";
import Escuela from "../../../img/img_home/icons/educacion.png";
import { Card } from "../../components/card/index";
import { Sponsor } from "../../components/sponsor";
import { Carousel } from "../../components/carousel";
import { CarouselHome } from "../../components/carousel-home";
import Portada from "../../../img/img_home/portada_cocina.jpg";

export const Home = () => {
  return (
    <main>
      <Slider2 imageSrc={Portada} imageHeight="full" darken={false} />
      {/* <!-- Contenido principal --> */}
      <div>
        <div className="mb-12 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/programa">
              <img src={Plaqueta} className="mb-12 max-h-20" alt="Video" />
            </a>
            <p className="mb-6 text-2xl">PROGRAMA</p>
            <p className="text-font_icon text-sm">
              Acceso a todas las temporadas
            </p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/school">
              <img
                src={Escuela}
                className="img-fluid mb-8 max-h-24"
                alt="Sombrero"
              />
            </a>
            <p className="mb-6 text-2xl">ESCUELA</p>
            <p className="text-font_icon text-sm">+ 500 cursos para aprender</p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/vlog">
              <img
                src={Bandeja}
                className="img-fluid mb-12 max-h-20"
                alt="Bandeja"
              />
            </a>
            <p className="mb-6 text-2xl">VLOG</p>
            <p className="text-font_icon text-sm">Comparte tus recetas</p>
          </div>
        </div>

        <div className="flex w-full px-14 mb-20 justify-center">
          <CarouselHome />
        </div>

      </div>

      <section className="flex px-28 mt-24 w-full mb-24">
        <div className="block w-full">
          <div className="text-white font-thin">
            <p className="text-4xl">Una selección para ti</p>
            <p className="text-sm my-8">
              Descubre los últimos lanzamientos, ofertas y los favoritos de
              nuestros clientes.
            </p>
          </div>

          <div className="mt-16 flex w-full justify-between">
            <Card />
          </div>
        </div>
      </section>
      <section className="flex px-28 w-full mb-2">
        <div className="text-white font-thin">
          <p className="text-4xl">Inspírate</p>
          <p className="text-sm mt-8">
            Consejos de expertos sobre cómo aprovechar al máximo tus utensilios
            de cocina, recomendaciones de regalos perfectos y recetas
            exquisitas.
          </p>
        </div>
      </section>

      <section className="flex  w-full mb-20 justify-center">
        <Carousel />
      </section>
      <Sponsor />
      
    </main>
  );
};


