import { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Sponsor } from "../../components/sponsor";
import Heart from "../../../img/icons/blanco_corazon.png";
import Send from "../../../img/icons/blanco_send.png";
import Speech from "../../../img/icons/blanco_speech.png";
import { useParams } from "react-router-dom";

export const VlogDetails = () => {
  const { store, actions } = useContext(Context);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);
  const { videoId } = useParams();

  useEffect(() => {
    console.log("Video ID from params:", videoId);
    if (videoId) {
      actions.getComments(videoId);
    }
  }, [videoId]);

  const handleAddComment = () => {
    console.log("handleAddComment called with:", { videoId, newComment });
    if (videoId && newComment) {
      actions.addComment(videoId, newComment);
      setNewComment("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  const showMoreComments = () => {
    setVisibleComments(visibleComments + 5);
  };

  const comments = store.comments || [];

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <div className="flex">
          <img src={Heart} alt="Heart" className="flex cursor-pointer w-12 bg-slate-400" />
        </div>
        <div className="flex flex-wrap mt-16 mb-60 flex-grow">
          <div className="bg-red-500 w-2/6 ps-28">
            <div className="bg-grey_span">
              <video className="w-full h-full" controls />
            </div>
            <div className="flex space-x-10 mt-4">
              <img
                src={Heart}
                alt="Heart"
                className="cursor-pointer w-12"
                onClick={() => actions.addLike(videoId)}
              />
              <img
                src={Send}
                alt="Send"
                className="cursor-pointer w-12"
                onClick={() => actions.addFavorite(videoId)}
              />
              <img src={Speech} alt="Speech" className="cursor-pointer w-12" />
            </div>
            <div className="bg-pink-600 h-"></div>
          </div>
          <div className="flex flex-col bg-blue-500 w-4/6 text-white">
            <div className="ps-12 bg-pink-200 w-1/2">
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
            <div className="bg-pink-600 w-1/2 text-sm">
              <div>
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
            </div>
            <div className="bg-pink-800 w-full ps-12 pe-28 flex-grow overflow-auto">
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
              <div className="mt-6 ms-2 w-5/6 flex-grow">
                <h2 className="text-2xl">{comments.length} Comentarios</h2>
                <div className="mt-4 overflow-auto">
                  {comments.slice(0, visibleComments).map((comment, index) => (
                    <div key={index} className="flex items-start space-x-4 mt-4">
                      <img src="../../img/img_home/bottle.webp" alt="User avatar" className="w-12 h-12 rounded-full" />
                      <div>
                        <p><strong>{comment.user?.name ?? "Anónimo"} {comment.user?.surname ?? ""}</strong></p>
                        <p className="text-gray-400 text-sm">{new Date(comment.timestamp).toLocaleString()}</p>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  {comments.length > visibleComments && (
                    <button onClick={showMoreComments} className="mt-4 text-blue-500">
                      Mostrar más
                    </button>
                  )}
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full ps-4 pt-2 bg-black text-white rounded-3xl h-20 border border-white"
                  placeholder="Añade un comentario ..."
                />
                <button onClick={handleAddComment} className="mt-2 text-blue-500">
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Sponsor />
    </>
  );
};
