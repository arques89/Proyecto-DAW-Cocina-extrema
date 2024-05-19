import { Slider } from "../../components/slider";
import { Video } from "../../components/video";
import Plaqueta from "../../../img/img_home/icons/rojo_video.png";
import Bandeja from "../../../img/img_home/icons/rojo_bandeja.png";
import Escuela from "../../../img/img_home/icons/educacion.png";
import Tienda from "../../../img/img_home/icons/tienda.png";
import video1 from "../../../img/img_home/canal-cocina-portada-1100x619.jpg";
import { CardDefault } from "../../components/card/index";
import { CarouselDefault } from "../../components/carousel";

import sponsor from "../../../img/img_home/sponsor/bosch.png";
import sponsor1 from "../../../img/img_home/sponsor/elcorteingles.png";
import sponsor2 from "../../../img/img_home/sponsor/arcos.png";
import sponsor3 from "../../../img/img_home/sponsor/lecreuset.png";
import sponsor4 from "../../../img/img_home/sponsor/aeg.png";

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
          className="flex px-32"
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
            <CardDefault />
          </div>
        </div>
      </section>
      <section className="flex px-32 w-full mb-2">
        <div className="text-white font-thin">
          <p className="text-4xl">Inspirate</p>
          <p className="text-sm my-8">
            Consejos de expertos sobre cómo aprovechar al máximo tus utensilios
            de cocina, recomendaciones de regalos perfectos y recetas
            exquisitas.
          </p>
        </div>
      </section>

      <section className="flex  w-full mb-24 justify-center">
        <CarouselDefault />
      </section>

      <section>
        <div
          id="slider"
          className="mb-5 carousel slide-patrocinadores"
          data-ride="carousel"
        >
          <h2 className="patrocinadores">Patrocinadores</h2>
          <div className="imagenes-patrocinadores">
            <a href="http://bosch.es" target="_blank" rel="noopener noreferrer">
              <img src={sponsor} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a
              href="http://elcorteingles.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={sponsor1} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a href="http://arcos.es" target="_blank" rel="noopener noreferrer">
              <img src={sponsor2} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a
              href="http://lecreuset.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={sponsor3} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a href="http://aeg.es" target="_blank" rel="noopener noreferrer">
              <img src={sponsor4} className="img-fluid" alt="Imagen Grande" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
