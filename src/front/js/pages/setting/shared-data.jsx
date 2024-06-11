import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../../store/appContext";
import ClipLoader from "react-spinners/ClipLoader";
import { inputSharedData } from "./mocks";
import EditIcon from "../../../icon/config/share/edit.png";

export const SharedData = () => {
    const { store, actions } = useContext(Context);
    const [addRecipe, setAddRecipe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [editRecipe, setEditRecipe] = useState(null);

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
        actions.getVideosSharedData(); // Asegúrate de llamar a esta función para cargar los videos
        if (!store.categories.length) {
            actions.getCategoriesSharedData();
        }
    }, []);

    const handleAddRecipe = () => {
        setAddRecipe(!addRecipe);
        setEditRecipe(null);
        setRecipeData({
            title: '',
            description: '',
            category: '',
            videoFile: null,
            ingredientsPart1: '',
            ingredientsPart2: '',
            duration: 0
        });
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

        if (!title || !description || !ingredientsPart1 || !ingredientsPart2 || !duration) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);

        try {
            const newVideo = editRecipe 
                ? await actions.updateRecipeSharedData(editRecipe.id, recipeData)
                : await actions.saveRecipeSharedData(recipeData);
            
            if (newVideo) {
                setAddRecipe(false);
                setEditRecipe(null);
            }
        } catch (error) {
            console.error("Error saving recipe:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditVideo = async (video) => {
        setEditRecipe(video);
        setRecipeData({
            title: video.title,
            description: video.description,
            category: video.category,
            videoFile: null,
            ingredientsPart1: video.ingredients_part1,
            ingredientsPart2: video.ingredients_part2,
            duration: video.duration
        });
        setAddRecipe(true);

        try {
            const comments = await actions.getComments(video.id);
            setComments(comments || []);
        } catch (error) {
            console.error("Error loading comments:", error);
        }
    };

    const handleDeleteVideo = (videoId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
            actions.deleteVideoSharedData(videoId);
        }
    };

    const handleOpenCommentsModal = async (videoId) => {
        try {
            const comments = await actions.getComments(videoId);
            setComments(comments || []);
            setCommentsModalIsOpen(true);
        } catch (error) {
            console.error("Error loading comments:", error);
        }
    };

    const renderInputSharedData = () => {
        return (
            <div className="flex space-x-4">
                {inputSharedData.map((item) => (
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
                                value={recipeData[`ingredientsPart${item.id}`]}
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
                                {editRecipe ? "EDITAR RECETA" : "COMPARTIR NUEVA RECETA"}
                            </span>
                            <div className="block mt-4">
                                <label>
                                    Titulo de la receta
                                    <br />
                                    <input
                                        type="text"
                                        name="title"
                                        className="mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-44 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        onChange={handleInputChange}
                                        value={recipeData.title}
                                    />
                                </label>
                                <br />
                                <label className="w-3/4">
                                    Descripción
                                    <br />
                                    <textarea
                                        name="description"
                                        className="mt-2 mb-4 bg-shape_input w-full h-96 rounded border-0 py-1.5 pl-0 pr-0 text-gray-900 sm:text-sm sm:leading-6 placeholder:text-gray-500"
                                        onChange={handleInputChange}
                                        value={recipeData.description} // Asegurarse de que este valor se inicializa
                                        placeholder={
                                        `1. Para empezar a preparar nuestra pizza casera, empezamos por cortarla cebolla en juliana fina y entonces haremos un sofrito en una sartén, hasta que la cebolla se dore ligeramente. Apagar el fuego, salpimentar y reservar.
                                        \n 2. Para preparar la masa para la pizza amasa todos los ingredientes y cocina ligeramente para hacer la prepizza.
                                        \n 3. Agregar la salsa de tomate, las cebollas rehogadas, el atún desmenuzado y espolvorear con la mozzarella. Condimentar con el orégano y si quieres añade unas cuantas aceitunas negras para decorar.
                                        \n 4. Cocina nuevamente la pizza en el horno durante unos 10 minutos hasta que veas que los bordes están dorados y el queso derretido.
                                        \n 5. Disfruta de la pizza de atún y ¡buen provecho! este tipo de pizza son perfectas para la hora de la cena y para compartir en familia. Esperamos que la disfrutes así que no olvides dejar tus comentarios.
                                        `
                                        }
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
                                        value={recipeData.category}
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
                                {renderInputSharedData()}
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
                    <div className="flex w-4/6 justify-between my-3 pe-9 text-sm">
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
                        <button
                            className="text-sm flex items-center space-x-1 border rounded-full p-0.5"
                            onClick={() => handleEditVideo(video)}
                        >
                            <img src={EditIcon} className="w-4" alt="icon_edit" />
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
                {editRecipe ? "CANCELAR EDICIÓN" : "COMPARTE NUEVAS RECETAS"}
            </button>
            {addRecipe && renderChange()}

            <Modal
                isOpen={commentsModalIsOpen}
                onRequestClose={() => setCommentsModalIsOpen(false)}
                contentLabel="Comentarios"
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
                <div className="bg-shape_primary text-white p-6 rounded-lg w-1/3 h-3/4 flex flex-col items-center justify-between ">
                    <h2 className="text-2xl mb-4">Comentarios</h2>
                    <div className="flex-1 w-full overflow-auto mb-4">
                        {(comments || []).map((comment) => (
                            <div
                                key={comment.id}
                                className="mb-2 p-4 border border-gray-600 rounded-lg bg-shape_border_button my-2"
                            >
                                <p className="text-end mb-4">
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
                        className="bg-shape_border_button border text-white py-2 px-4 rounded-full "
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

Modal.setAppElement('#root');
