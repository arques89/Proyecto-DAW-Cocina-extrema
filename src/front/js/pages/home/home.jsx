import { Slider } from "../../components/slider";
import { Video } from "../../components/video";
import Plaqueta from "../../../img/img_home/icons/rojo_video.png";
import Bandeja from "../../../img/img_home/icons/rojo_bandeja.png";
import Escuela from "../../../img/img_home/icons/educacion.png";
import Tienda from "../../../img/img_home/icons/tienda.png";
import video1 from "../../../img/img_home/canal-cocina-portada-1100x619.jpg";
import { Card } from "../../components/card/index";
import { Sponsor } from "../../components/sponsor";
import { Carousel } from "../../components/carousel";

const Home = () => {
  return (
    <main>
      <Slider />
      {/* <!-- Contenido principal --> */}
      <div>
        <div className="mb-12 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Plaqueta} className="mb-12 max-h-20" alt="Video" />
            </a>
            <p className="mb-6 text-2xl">PROGRAMA</p>
            <p className="text-font_icon text-sm">
              Acceso a todas las temporadas
            </p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
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
            <a href="/">
              <img
                src={Bandeja}
                className="img-fluid mb-12 max-h-20"
                alt="Bandeja"
              />
            </a>
            <p className="mb-6 text-2xl">VLOG</p>
            <p className="text-font_icon text-sm">Comparte tus recetas</p>
          </div>

          {/* <!-- Cuarta columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img
                src={Tienda}
                className="img-fluid mb-12 max-h-20"
                alt="Tienda"
              />
            </a>
            <p className="mb-6 text-2xl">TIENDA</p>
            <p className="text-font_icon text-sm">
              Nuestra selección de artículos
            </p>
          </div>
        </div>

        <Video
          className="flex px-28"
          title="Una receta para chuparte los dedos"
          season="Programa 10"
          chapter="ÚLTIMO PROGRAMA"
          go="Ver ahora"
          image={video1}
        />
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
          <p className="text-4xl">Inspirate</p>
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

export default Home;
