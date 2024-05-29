// src/front/js/pages/vlog/VlogDetails.jsx

import { Sponsor } from "../../components/sponsor";

export const VlogDetails = () => {
  return (
    <>
    <main className="">
    <div className="flex flex-wrap h-screen mt-16 mb-60">
      <div className="bg-red-500 w-2/6 h-5/6 ps-28">
        <div className="bg-grey_span h-5/6">
          <video className="w-full h-full" controls />
        </div>
        <div className="bg-pink-600 h-"></div>
      </div>
      <div className="flex flex-wrap bg-blue-500 w-4/6 h-full text-white">
        <div className="ps-12 bg-pink-200 w-1/2 h-2/5">
          <h2 className="text-3xl mb-10">Pizza de atún:</h2>
          <div className="text-sm">
            <p className="mb-4">Para la masa:</p>
            <ul>
              <li>250 gramos de Harina de trigo</li>
              <li>15 gramos de Levadura prensada</li>
              <li>1 taza de Agua (240 ml)</li>
              <li>1 pizca de Sal</li>
              <li>1 cucharadita de Aceite</li>
            </ul>
          </div>
        </div>
        <div className="bg-pink-600 w-1/2 h-2/5 text-sm">
          <p>Santiago Durá</p>
          <p>Audio original</p>
          <div>
            <h2 className="mb-4 mt-10">Para la cubierta:</h2>
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
        <div className="bg-pink-800 w-full h-full ps-12 pe-28">
          <h2 className="mb-10">Cómo hacer Pizza de atún:</h2>
          <ol className="list-decimal pl-6">
            <li className="my-4">
              Para empezar a preparar nuestra pizza casera, empezaremos por
              cortar la cebolla en juliana fina y entonces haremos un sofrito
              con un poco de aceite y las cebollas. Apagar el fuego, salpimentar
              y reservar.
            </li>
            <li className="my-4">
              Para preparar la masa para la pizza amasa todos los ingredientes y
              cocina ligeramente para hacer la pizza.
            </li>
            <li className="my-4">
              Agregar la salsa de tomate, las cebollas rehogadas, el atún
              desmenuzado y esparcir con la mozzarella. Condimentar con orégano
              y si quieres añadir unas cuantas aceitunas negras para decorar.
            </li>
            <li className="my-4">
              Cocina nuevamente la pizza en el horno durante unos 10 minutos
              hasta que los bordes estén dorados y el queso derretido.
            </li>
            <li className="my-4"> 
              Disfruta de la pizza de atún y buen provecho! Este tipo de pizza
              son perfectas para la hora de la cena y para compartir en familia.
              Esperemos que la disfrutes así que no olvides dejar tus
              comentarios.
            </li>
          </ol>
          <hr className="h-1 bg-white " />
          <div className="mt-6 ms-2 w-5/6">
          <h2 className="text-2xl">258 Comentarios</h2>
          <div className="mt-4">
            <div className="flex justify-center items-start space-x-10 w-4/6">
              <img src="../../img/img_home/bottle.webp" alt="User avatar" className="w-12 h-12 rounded-full" />
              <div className="">
                <p><strong>Alejandro Mira</strong></p>
                <p className="text-gray-400 text-sm">9 sem</p>
                <p>Los rodales salen muy sabrosos, pero la pasta de harina no solo es muy pesada para nosotros, sino que los celíacos no pueden comerla y además engorda.</p>
              <textarea name="" className="w-full ps-4 pt-2 bg-black text-white rounded-3xl h-20 border border-white" id="" placeholder="Añade un comentario ..."></textarea>
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
      </div>
      {/* <div className="bg-green-500 w-2/6 h-2/5"></div> */}
      {/* <div className="bg-yellow-500 w-4/6 h-5/6"></div> */}
    </div>
    </main>
    <Sponsor />
    </>
  );
};