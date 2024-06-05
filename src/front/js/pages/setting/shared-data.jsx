// src/pages/SharedData/index.jsx
import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../../store/appContext";
import ClipLoader from "react-spinners/ClipLoader";
import { change } from "./mocks";

export const SharedData = () => {
  const { store, actions } = useContext(Context);
  const [addRecipe, setAddRecipe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    category: '',
    videoFile: null,
    ingredientsPart1: '',
    ingredientsPart2: '',
    duration: 0
  });

  useEffect(() => {
    if (!store.videos.length) {
      actions.getVideosSharedData();
    }
    if (!store.categories.length) {
      actions.getCategoriesSharedData();
    }
  }, []);

  const handleAddRecipe = () => {
    setAddRecipe(!addRecipe);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('video/')) {
      alert("Por favor, selecciona un archivo de video válido.");
      return;
    }

    setRecipeData({
      ...recipeData,
      videoFile: file
    });

    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';

    videoElement.onloadedmetadata = function() {
      window.URL.revokeObjectURL(videoElement.src);
      const duration = videoElement.duration;
      setRecipeData(prevState => ({ ...prevState, duration }));
    }

    videoElement.src = URL.createObjectURL(file);
  };

  const handleSaveRecipe = async () => {
    const { title, description, videoFile, ingredientsPart1, ingredientsPart2, duration } = recipeData;

    if (!title || !description || !videoFile || !ingredientsPart1 || !ingredientsPart2 || !duration) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const newVideo = await actions.saveRecipeSharedData(recipeData);
      if (newVideo) {
        setAddRecipe(false);
      }
    } catch (error) {
      console.error("Error saving recipe:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = (videoId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
      actions.deleteVideoSharedData(videoId);
    }
  };

  const handleOpenCommentsModal = (videoId) => {
    const comments = actions.getComments(videoId);
    setComments(comments || []); // Nos aseguramos de que comments sea un array
    setCommentsModalIsOpen(true);
  };

  const renderInput = () => {
    return (
      <div className="flex space-x-4">
        {change.map((item) => (
          <div key={item.id} className="flex-1 border-shape_border_button">
            <label>
              {item.name}
              <br />
              <textarea
                type={item.type}
                className={`${item.className} w-full`}
                placeholder={item.placeholder}
                name={`ingredientsPart${item.id}`}
                onChange={handleInputChange}
              />
            </label>
          </div>
        ))}
      </div>
    );
  };

  const renderChange = () => {
    return (
      <div>
        <div className="w-full">
          <div className="border rounded-3xl w-full mt-4">
            <div className="w-full">
              <span className="border border-shape_border_button w-full ps-12 rounded-full pr-44 py-1.5 pl-6 inline-block">
                COMPARTIR NUEVA RECETA
              </span>
              <div className="block ms-12 mt-4">
                <label>
                  Titulo de la receta
                  <br />
                  <input
                    type="text"
                    name="title"
                    className="mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-44 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Descripción
                  <br />
                  <textarea
                    name="description"
                    className="mt-2 mb-4 bg-shape_input w-full rounded border-0 py-1.5 pl-4 pr-44 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Categoría
                  <br />
                  <select
                    name="category"
                    className="mt-2 mb-4 bg-shape_input w-full rounded border-0 py-1.5 pl-4 pr-44 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona una categoría</option>
                    {(store.categories || []).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
                <br />
                <label>
                  Archivo de Video
                  <br />
                  <input
                    type="file"
                    name="videoFile"
                    className="mt-2 mb-4 bg-shape_input w-full rounded border-0 py-1.5 pl-4 pr-44 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    onChange={handleFileChange}
                  />
                </label>
                <br />
                {renderInput()}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-2xl text-white rounded-full bg-shape_border_button my-4"
            onClick={handleSaveRecipe}
          >
            {loading ? <ClipLoader size={24} color={"#fff"} /> : "GUARDAR RECETA"}
          </button>
        </div>
      </div>
    );
  };

  const renderVideos = () => {
    return (store.videos || []).map((video) => (
      <div key={video.id} className="mb-7">
        <video controls className="w-full h-96 object-cover rounded" src={video.src}></video>
        <div>
          <div className="mt-4 text-3xl font-thin">{video.title}</div>
          <div className="flex w-3/6 justify-between my-3 pe-9 text-sm">
            <div>{new Date(video.created_at).toLocaleDateString()}</div>
            <div>{video.duration.toFixed(2)} sec</div>
          </div>
          <div className="mt-2 flex items-center space-x-4">
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
              onClick={() => handleDeleteVideo(video.id)}
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
        <h3 className="pb-3 text-shape_border_button">DATOS COMPARTIDOS</h3>
        <hr />
      </div>
      <div className="grid grid-cols-2 gap-20 mt-8">
        {renderVideos()}
      </div>
      <button
        type="button"
        onClick={handleAddRecipe}
        className="mt-6 w-full bg-shape_border_button text-white py-2 rounded-full"
      >
        COMPARTE NUEVAS RECETAS
      </button>
      {addRecipe && renderChange()}

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
