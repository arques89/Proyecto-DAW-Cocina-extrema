// src/front/js/pages/vlog/VlogDetails.jsx
import { useParams } from "react-router-dom";
import { videos } from './mocks';

export const VlogDetails = () => {
  const { id } = useParams();
  const video = videos.find((video) => video.id === parseInt(id));

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <section className="flex flex-col items-center">
      <div className="w-full max-w-4xl mt-12">
        <video src={video.src} className="w-full" controls />
      </div>
      <div className="w-full max-w-4xl p-4 text-white">
        <h1 className="text-4xl mb-4">{video.description}</h1>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl">Para la masa:</h2>
            <ul>
              <li>250 gramos de Harina de trigo</li>
              <li>15 gramos de Levadura prensada</li>
              <li>1 taza de Agua (240 ml)</li>
              <li>1 pizca de Sal</li>
              <li>1 cucharadita de Aceite</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Para la cubierta:</h2>
            <ul>
              <li>150 centímetros cúbicos de Salsa de tomate</li>
              <li>150 gramos de Queso mozzarella</li>
              <li>1 lata de Atún en aceite</li>
              <li>100 gramos de Aceitunas de Origen</li>
              <li>1 cucharadita de Orégano</li>
              <li>2 cucharadas soperas de Queso rallado</li>
              <li>1 pizca de Sal y Pimienta</li>
              <li>9 Aceitunas (opcional)</li>
              <li>50 centímetros cúbicos de Aceite de oliva</li>
            </ul>
          </div>
        </div>
        <h2 className="text-2xl mt-4">Cómo hacer Pizza de atún:</h2>
        <ol className="list-decimal pl-6">
          <li>
            Para empezar a preparar nuestra pizza casera, empezaremos por cortar la cebolla en juliana fina y entonces
            haremos un sofrito con un poco de aceite y las cebollas. Apagar el fuego, salpimentar y reservar.
          </li>
          <li>
            Para preparar la masa para la pizza amasa todos los ingredientes y cocina ligeramente para hacer la pizza.
          </li>
          <li>
            Agregar la salsa de tomate, las cebollas rehogadas, el atún desmenuzado y esparcir con la mozzarella. Condimentar
            con orégano y si quieres añadir unas cuantas aceitunas negras para decorar.
          </li>
          <li>
            Cocina nuevamente la pizza en el horno durante unos 10 minutos hasta que los bordes estén dorados y el queso
            derretido.
          </li>
          <li>
            Disfruta de la pizza de atún y buen provecho! Este tipo de pizza son perfectas para la hora de la cena y para
            compartir en familia. Esperemos que la disfrutes así que no olvides dejar tus comentarios.
          </li>
        </ol>
        <div className="mt-6">
          <h2 className="text-2xl">258 Comentarios</h2>
          <div className="mt-4">
            <div className="flex items-start space-x-4">
              <img src="/path/to/avatar1.jpg" alt="User avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p><strong>Alejandro Mira</strong></p>
                <p>Los rodales salen muy sabrosos, pero la pasta de harina no solo es muy pesada para nosotros, sino que los celíacos no pueden comerla y además engorda.</p>
                <p className="text-gray-400 text-sm">9 sem</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 mt-4">
              <img src="/path/to/avatar2.jpg" alt="User avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p><strong>David Llorens</strong></p>
                <p>Gracias por compartir esta receta, parece mucho sabrosa! ¿Cuántos minutos sueles dejar la pasta a remojo?</p>
                <p className="text-gray-400 text-sm">1 día</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 mt-4">
              <img src="/path/to/avatar3.jpg" alt="User avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p><strong>Lorena Fajardo</strong></p>
                <p>Recomiendo mucho esta receta, me hace unas pizzas muy ricas y fáciles de hacer para cualquiera.</p>
                <p className="text-gray-400 text-sm">1 semana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
