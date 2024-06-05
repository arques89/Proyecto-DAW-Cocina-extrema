import Bandeja from "../../../img/img_school/icons/rojo_bandeja.png";
import Tiempo from "../../../img/img_school/icons/tiempo.png";
import Sombrero from "../../../img/img_school/icons/rojo_sombrero.png";
import Calendario from "../../../img/img_school/icons/calendario.png";
import Reloj from "../../../img/img_school/icons/reloj.png";
import Ubicacion from "../../../img/img_school/icons/ubicacion.png";
import Euro from "../../../img/img_school/icons/euro.png";
import SchoolHeader from "../../../img/img_school/header.jpg";
import SchoolEnd from "../../../img/img_school/end.jpg";
import { Sponsor } from "../../components/sponsor";
import { Slider2 } from "../../components/slider2";
import SubscriptionPlans from "../../components/subscriptionPlans";
import { CarouselSchool } from "../../components/carouselSchool";
import ChefsSchool from "../../components/chefs-school";

export const School = () => {
  return (
    <main>
      <div className="relative">
        <Slider2 imageSrc={SchoolHeader} imageHeight="400px" darken={true} />
        <div
          className="absolute top-0 right-0 bottom-0 flex flex-col justify-center items-center text-center lg:text-right text-white p-16 opacity-100 z-10"
          style={{ width: "33.33%", right: 100 }}
        >
          <p className="text-4xl tracking-widest text-red-600">ESCUELA</p>
          <p className="w-52 text-2xl mt-2">Cocina Extrema</p>
          <p className="w-52 text-sm mt-2 text-shape_primary">
            Dirigida por Fernando Cruz
          </p>
          <div className="mt-4 flex justify-center w-full space-x-5">
            <button className="bg-white text-black py-2 px-4 rounded-full text-xs flex-1 text-center">
              MATRICÚLATE
            </button>
            <button className="bg-white text-black py-2 px-4 rounded-full text-xs flex-1 text-center">
              TARJETA REGALO
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Contenido principal --> */}
      <div>
        <div className="mb-16 mt-16 flex justify-between w-full text-white px-32">
          {/* <!-- Primera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Tiempo} className="mb-4 max-h-24" alt="Video" />
            </a>
            <p className="mb-2 text-2xl">ACCESO ILIMITADO</p>
            <p className="text-font_icon text-sm">Al contenido del curso</p>
          </div>

          {/* <!-- Segunda columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Bandeja} className="mb-4 max-h-24" alt="Bandeja" />
            </a>
            <p className="mb-2 text-2xl">+ 300 RECETAS</p>
            <p className="text-font_icon text-sm">Para aprender</p>
          </div>

          {/* <!-- Tercera columna de imagen --> */}
          <div className="text-center w-1/4 h-70 flex flex-col items-center justify-center">
            <a href="/">
              <img src={Sombrero} className="mb-4 max-h-24" alt="Sombrero" />
            </a>
            <p className="mb-2 text-2xl">LOS MEJORES CHEF</p>
            <p className="text-font_icon text-sm">Y concursantes</p>
          </div>
        </div>
      </div>

      <section className="px-44">
        <div className="flex mt-16 w-full mb-24">
          <div className="w-1/2 text-white font-thin pr-4">
            <p className="text-sm my-8">¿En qué consiste?</p>
            <p className="text-5xl tracking-widest text-shape_red">
              Curso De Cocina
              <br /> Profesional
            </p>
          </div>
          <div className="w-1/2 text-white font-thin pl-4">
            <p className="text-sm mt-24">
              Para amateurs y para profesionales que busquen otros puntos de
              vista, la Escuela Cocina Extrema es una profundización en la
              cocina hecha desde el rigor y la coherencia. Técnicas, consejos,
              recetas… Aquí encontrarás todo lo necesario para aprender a
              cocinar: más de 160 lecciones magistrales impartidas por un equipo
              de cocineros profesionales dirigido por Fernando Cruz.
              <br />
              <br />
              El funcionamiento de la Escuela Cocina Extrema es muy sencillo.
              Una vez que estés matriculado e introduzcas tu nombre de usuario y
              contraseña, verás que nuestro sistema es muy intuitivo y fácil de
              utilizar, por lo que te será muy cómodo manejarte por la Escuela.
            </p>
          </div>
        </div>
        <div className="flex justify-between space-x-32 mt-12">
          <div className="w-1/4 flex items-center justify-center text-white">
            <img src={Calendario} className="mr-6 max-h-11" alt="Calendario" />
            <p className="text-sm tracking-wider">Acceso Ilimitado</p>
          </div>
          <div className="w-1/4 flex items-center justify-center text-white">
            <img src={Reloj} className="mr-6 max-h-11" alt="Reloj" />
            <p className="text-sm tracking-wider">+300 Recetas</p>
          </div>
          <div className="w-1/4 flex items-center justify-center text-white">
            <img src={Ubicacion} className="mr-6 max-h-11" alt="Ubicacion" />
            <p className="text-sm tracking-wider">Los Mejores Chefs</p>
          </div>
          <div className="w-1/4 flex items-center justify-center text-white">
            <img src={Euro} className="mr-6 max-h-11" alt="Euro" />
            <p className="text-sm tracking-wider">Tienda Exclusiva</p>
          </div>
        </div>
      </section>

      <section className="px-44 w-full mb-2 mt-24">
        <div className="text-white font-thin">
          <p className="text-4xl">Elige un plan de suscripción</p>
          <p className="text-sm mt-8">
            Puedes suscribirte a todos los cursos de la Escuela Cocina Extrema
            seleccionando un plan de suscripción con renovación automática.
            Podrás aprender a tu ritmo y cancelar en cualquier momento.
          </p>
        </div>
        <SubscriptionPlans />
      </section>

      <section>
        <div className="px-44 w-full mb-2 mt-24">
          <div className="text-white font-thin">
            <p className="text-4xl">Contenido del curso</p>
            <p className="text-sm mt-8">
              Nuestros cursos no solo se centran en la técnica culinaria, sino
              también en la inspiración detrás de cada plato. Aprende a
              seleccionar los mejores ingredientes, a entender la calidad de los
              alimentos y a presentar tus creaciones de manera excepcional. En
              escuela de Cocina Extrema, no solo enseñamos a cocinar, sino a
              crear experiencias culinarias inolvidables.
            </p>
          </div>
        </div>
        <div className="flex w-full px-16 mb-20 justify-center">
          <CarouselSchool />
        </div>
      </section>

      <section className="mb-10">
        <div className="px-44 w-full mb-2 mt-20">
          <div className="text-white font-thin">
            <p className="text-4xl">Los mejores docentes</p>
            <p className="text-sm mt-8">
              Los profesores de 24studio son profesionales especializados,
              reconocidos con una sólida trayectoria, que combinan la profesión
              y la enseñanza. De esta forma, los conocimientos que adquieras en
              el máster no solo estarán actualizados si no que serán totalmente
              aplicables al mundo laboral.
            </p>
          </div>
        </div>
        <ChefsSchool />
      </section>

      <div className="relative">
        <Slider2 imageSrc={SchoolEnd} imageHeight="300px" darken={true} />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white opacity-100 z-10">
          <p className="text-4xl tracking-widest text-red-600">CERTIFICADO</p>
          <p className="text-2xl mt-2">
            ¡¡Demuestra que eres un auténtico maestro de la cocina!!
          </p>
          <p className="text-sm mt-2 text-shape_primary">
            Si completas todas las lecciones disponibles en la escuela podrás
            descargar un certificado que acreditará tu pasión por la cocina.
            <br />
            ¡A qué esperas! ¡Completa todas las lecciones!
          </p>
          <div className="mt-4">
            <button className="bg-white text-black py-2 px-4 rounded-full mr-4 text-xs">
              MATRICÚLATE
            </button>
          </div>
        </div>
      </div>

      <Sponsor />
    </main>
  );
};
