
import { Sponsor } from "../../components/sponsor";
import { CarouselSchool } from "../../components/carouselSchool";
import video1 from "../../../img/img_home/canal-cocina-portada-1100x619.jpg";
import ProgramaCard from "../../components/programa-card";
import { programasContent } from "../../components/programa-card/mocks";
import { VideoPagina } from "../../components/videoPagina.jsx";

export const Programa = () => {
  return (
    <main>
        <VideoPagina
        className="flex px-28"
        title="Una receta para chuparte los dedos"
        season="Programa 10"
        chapter="ÚLTIMO PROGRAMA"
        go="Ver ahora"
        image={video1}
        videoUrl="https://res.cloudinary.com/dztgp8g6w/video/upload/v1718151961/programa10_aydn1n.mp4"
      />
     
     <section className="">
        <div className="text-white font-thin px-32 w-full mb-2 mt-24">
          <p className="text-4xl">Todos los programas</p>
          <p className="text-base mt-8">
            Cocina Extrema TEMPORADA 5
          </p>
        </div>
        <div className="">
        <div className="flex flex-wrap justify-center -mx-4 px-32">
          {programasContent.map((programa) => (
            <ProgramaCard
              key={programa.id}
              image={programa.image}
              title={programa.title}
              description={programa.description}
              duration={programa.duration}
              videoUrl={programa.videoUrl}
            />
          ))}
        </div>
      </div>
   </section>
  
      

      <div className="text-white font-thin px-32 w-full mb-2 mt-24">
          <p className="text-4xl mb-16">Último Expulsado del programa 10</p>
        </div>
        

  <div className="flex flex-wrap items-stretch my-4 px-32">
    <div className="w-1/2">
      <img src='src/front/img/img_programa/chica.jpg' alt="Imagen 1" className="w-full h-80 object-contain object-center" />
    </div>
    <div className="w-1/2 p-4 text-white">
        <p>Irene Gonzalez</p>
      <p className="text-2xl mb-6 mt-8"><em>Lady Bechamel</em></p>
      <p className="text-sm">Una desastrosa salsa bechamel deja fuera del concurso a Irene Balderrama. 
A pesar de haber mostrado buena mano para la cocina, la actriz catalana se vio obligada anoche a colgar el delantal del concurso tras un reto fallido en la prueba final de eliminación. “¡A partir de ahora voy a ser Lady Bechamel!”, se lamentaba Abril, a medio camino entre las lágrimas y su magnífico sentido del humor.</p>
    </div>
  </div>

  
  <div className="flex flex-wrap items-stretch my-4 px-32">
    <div className="w-1/2 pr-4 text-white">
        <p className="mt-36">Pablo Motos</p>
      <p className="text-2xl mb-6 mt-8"><em>Me encanta el pitiminí, en la vida y en los platos</em></p>
      <p className="text-sm">El concursante Pablo Motos se enfrenta al reto de preparar un plato delicioso y refinado para una ocasión especial. Después de las dos horas de trabajo, Pablo presenta su plato con una sonrisa pícara. <em>Me encanta el pitiminí, en la vida y en los platos</em>, exclama. </p>
    </div>
    <div className="w-1/2">
        <p className="text-white mt-20 mb-6 text-right text-2xl">Ganador de la primera prueba de la noche</p>
      <img src='src/front/img/img_programa/salmon.jpg' alt="Imagen 1" className="w-full h-80 object-cover" />
    </div>
  </div>

  
  <div className="flex flex-wrap items-stretch my-4 px-32">
    <div className="w-1/2">
        <p className="text-white mt-20 mb-6 text-left text-2xl">En la cuerda floja</p>
        <img src='src/front/img/img_programa/concursantes.jpg' alt="Imagen 1" className="w-full h-80 object-contain object-center" />
    </div>
    <div className="w-1/2 p-4 text-white">
        <p className="mt-36">Carlos Silvestre, Rocio Molina y Sara Rilo</p>
      <p className="text-2xl mb-6 mt-8"><em>Temido postre</em></p>
      <p className="text-sm">Una desastrosa prueba de exteriores, lleva a nuestros aspirantes, Carlos, Rocio y Sara a la batalla final, donde se enfrentan con muchos nervios al <em>Temido</em> postre. 
Generar una tarta de chocolate de tres pisos, con ligeros aromas a naranja, hace que los concursantes suden la gota gorda por mantener su puesto en el programa. 
Ente tanto dulce estos fuertes aspirantes se encuentran en la cuerda floja. 
 </p>
    </div>
  </div>
  
      

      <section>
        <div className="px-44 w-full mb-2 mt-24">
          <div className="text-white font-thin">
            <p className="text-4xl">Nuestras recetas más populares</p>
            
          </div>
        </div>
        <div className="flex w-full px-16 mb-20 justify-center">
          <CarouselSchool />
        </div>
      </section>

      
      <Sponsor />
    </main>
  );
};
