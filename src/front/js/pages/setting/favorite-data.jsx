// src/pages/FavoritesPage/index.jsx
import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../../store/appContext";
import ClipLoader from "react-spinners/ClipLoader";

export const FavoriteData = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    actions.getFavorites();
  }, []);

  const handleOpenCommentsModal = async (videoId) => {
    const comments = await actions.getComments(videoId);
    setComments(comments || []);
    setCommentsModalIsOpen(true);
  };

  const handleDeleteFavorite = (videoId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este video de tus favoritos?")) {
      actions.deleteFavorite(videoId);
    }
  };

  const renderVideos = () => {
    return (store.favorites || []).map((video) => (
      <div key={video.id} className="mb-7">
        <video controls className="w-full h-96 object-cover rounded" src={video.src}></video>
        <div>
          <div className="mt-4 text-3xl font-thin">{video.title}</div>
          <div className="flex w-3/6 justify-between my-3 pe-9 text-sm">
            <div>{new Date(video.created_at).toLocaleDateString()}</div>
            <div>{video.duration.toFixed(2)} sec</div>
          </div>
          <div className="mt-2 flex items-center space-x-4">
            <button className="text-sm flex items-center space-x-0 border rounded-full xl:px-3.5 px-8">
              <img src="src/front/icon/config/share/tocar.png" className="w-2" alt="Arrow" />
              <span>Ver ahora</span>
            </button>
            <button className="text-sm border rounded-full px-2 flex items-center space-x-2" onClick={() => handleOpenCommentsModal(video.id)}>
              <img src="src/front/icon/config/share/speech.png" className="w-4" alt="icon_speech" />
              <span>{video.comments_count} </span>
            </button>
            <button className="text-sm flex items-center space-x-2 border rounded-full px-2">
              <img src="src/front/icon/config/share/love.png" className="w-4" alt="icon_" />
              <span>{video.favorites_count}</span>
            </button>
            <button className="text-sm flex items-center space-x-2 border rounded-full px-2">
              <img src="src/front/icon/config/share/megusta.png" className="w-4" alt="icon_" />
              <span>{video.likes_count}</span>
            </button>
            <button
              className="text-sm flex items-center space-x-1 border rounded-full p-0.5"
              onClick={() => handleDeleteFavorite(video.id)}
            >
              <img src="src/front/icon/config/share/delete.png" className="w-4" alt="icon_bin" />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-shape_primary pe-20">
      <div className="text-xl">
        <h3 className="pb-3 text-shape_border_button">MIS FAVORITOS</h3>
        <hr />
      </div>
      <div className="grid grid-cols-2 gap-20 mt-8">
        {renderVideos()}
      </div>

      <Modal
        isOpen={commentsModalIsOpen}
        onRequestClose={() => setCommentsModalIsOpen(false)}
        contentLabel="Comentarios"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-black text-white p-6 rounded-lg w-1/3 h-3/4 flex flex-col items-center justify-between">
          <h2 className="text-2xl mb-4">Comentarios</h2>
          <div className="flex-1 w-full overflow-auto mb-4">
            {(comments || []).map((comment) => (
              <div
                key={comment.id}
                className="mb-2 p-4 border border-gray-600 rounded-lg bg-gray-800"
              >
                <p>
                  <small>{new Date(comment.timestamp).toLocaleString()}</small>
                </p>
                <p>
                  <strong>
                    {comment.user?.name} {comment.user?.surname}:
                  </strong>{" "}
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCommentsModalIsOpen(false)}
            className="bg-white text-black py-2 px-4 rounded-full"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

Modal.setAppElement('#root');
