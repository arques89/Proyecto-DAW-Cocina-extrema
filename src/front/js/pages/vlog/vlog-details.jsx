import { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Sponsor } from "../../components/sponsor";
import Heart from "../../../icon/vlog-details/blanco_corazon.png";
import HeartRed from "../../../icon/vlog-details/heart_true.png";
import Send from "../../../icon/vlog-details/blanco_send.png";
import Speech from "../../../icon/vlog-details/blanco_speech.png";
import Equis from "../../../icon/vlog-details/x.png";
import { useParams } from "react-router-dom";

export const VlogDetails = () => {
  const { store, actions } = useContext(Context);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);
  const { videoId } = useParams();
  const video = store.videoDetails;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (videoId) {
      actions.getVideoVlogDetails(videoId);
      actions.getCommentsVlogDetails(videoId);
      actions.getFavoritesVlogDetails(videoId);
      actions.getLikesVlogDetails(videoId);
      setIsFavorite(store.favorites.includes(parseInt(videoId)));
    }
  }, [videoId, store.favorites]);

  const handleAddComment = () => {
    if (videoId && newComment) {
      actions.addCommentVlogDetails(videoId, newComment, store.user.id);
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

  const handleFavoriteClick = () => {
    if (isFavorite) {
      actions.removeFavoriteVlogDetails(videoId, store.user.id);
    } else {
      actions.addFavoriteVlogDetails(videoId, store.user.id);
    }
    setIsFavorite(!isFavorite);
  };

  const comments = store.comments || [];

  return (
    <>
      <main className="flex flex-col min-h-screen text-white">
        <div className="flex flex-wrap mb-60 flex-grow">
          <div className="flex flex-col w-2/6 ps-28 flex-grow">
            <div className="flex justify-center items-center">
              {video && (
                <video className="w-full h-auto" controls src={video.src} />
              )}
            </div>
            <div className="flex space-x-10 mt-4">
              <img
                src={isFavorite ? HeartRed : Heart}
                alt="Heart"
                className="cursor-pointer w-12"
                onClick={handleFavoriteClick}
              />
              <img
                src={Send}
                alt="Send"
                className="cursor-pointer w-12"
                onClick={() => actions.addFavoriteVlogDetails(videoId, store.user.id)}
              />
              <img src={Speech} alt="Speech" className="cursor-pointer w-12" />
            </div>
          </div>
          <div className="flex flex-col w-4/6">
            <div className="flex w-full">
              <div className="w-1/2 text-sm p-4">
                {video && (
                  <>
                    <h2 className="text-3xl mb-10">{video.title}</h2>
                    <div className="whitespace-pre-wrap">
                      {video.ingredients_part1}
                    </div>
                  </>
                )}
              </div>
              <div className="w-1/2 text-sm p-4 flex flex-col">
                <div className="flex justify-end">
                  <img
                    className="w-10 h-10 mb-10"
                    src={Equis}
                    alt="Salir"
                  />
                </div>
                {video && (
                  <>
                    <div className="whitespace-pre-wrap">
                      {video.ingredients_part2}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-full text-sm p-4 mt-4">
              <hr className="h-1 bg-white " />
              <div className="mt-6 ms-2 w-5/6 flex-grow">
                <h2 className="text-2xl">{comments.length} Comentarios</h2>
                <div className="mt-4 overflow-auto">
                  {comments.slice(0, visibleComments).map((comment, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 mt-4 mb-4 break-words"
                    >
                      <img
                        src="../../img/img_home/bottle.webp"
                        alt="User avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p>
                          <strong>
                            {comment.user?.name ?? "Anónimo"}{" "}
                            {comment.user?.surname ?? ""}
                          </strong>
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  {comments.length > visibleComments && (
                    <button
                      onClick={showMoreComments}
                      className="mt-4 text-blue-500"
                    >
                      Mostrar más
                    </button>
                  )}
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full ps-4 pt-2 bg-black text-white rounded-3xl h-20 border border-white break-words"
                  placeholder="Añade un comentario ..."
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 text-blue-500"
                >
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
