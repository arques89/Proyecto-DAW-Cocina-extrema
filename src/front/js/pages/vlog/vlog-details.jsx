import { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Sponsor } from "../../components/sponsor";
import ILikeIt from "../../../icon/vlog-details/ilikeit.png";
import ILikeItRed from "../../../icon/vlog-details/ilikeitred.png";
import HeartRed from "../../../icon/vlog-details/redheart.png";
import Heart from "../../../icon/vlog-details/whiteheart.png";
import Equis from "../../../icon/vlog-details/x.png";
import { useParams, useNavigate } from "react-router-dom";
import { CommentForm } from "../../components/commentForm";
import { CommentCard } from "../../components/commentCard";

export const VlogDetails = () => {
    const { store, actions } = useContext(Context);
    const { videoId } = useParams();
    const video = store.videoDetails;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (videoId) {
            setIsLoading(true);
            Promise.all([
                actions.getVideoVlogDetails(videoId),
                actions.getCommentsVlogDetails(videoId),
            ])
                .then(() => {
                    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
                    const userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
                    setIsFavorite(userFavorites.includes(parseInt(videoId)));
                    setIsLiked(userLikes.includes(parseInt(videoId)));
                })
                .catch((error) =>
                    console.error("Error al obtener los detalles del vlog:", error)
                )
                .finally(() => setIsLoading(false));
        }
    }, [videoId]);

    const handleFavoriteClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const action = isFavorite
            ? actions.removeFavoriteVlogDetails
            : actions.addFavoriteVlogDetails;
        action(videoId)
            .then(() => {
                const updatedFavorites = isFavorite
                    ? JSON.parse(localStorage.getItem('userFavorites')).filter(id => id !== parseInt(videoId))
                    : [...JSON.parse(localStorage.getItem('userFavorites')), parseInt(videoId)];
                localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
                setIsFavorite(!isFavorite);
                actions.getVideoVlogDetails(videoId);
            })
            .catch((error) => console.error("Error al modificar favorito:", error));
    };

    const handleLikeClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const action = isLiked
            ? actions.removeLikeVlogDetails
            : actions.addLikeVlogDetails;
        action(videoId)
            .then(() => {
                const updatedLikes = isLiked
                    ? JSON.parse(localStorage.getItem('userLikes')).filter(id => id !== parseInt(videoId))
                    : [...JSON.parse(localStorage.getItem('userLikes')), parseInt(videoId)];
                localStorage.setItem('userLikes', JSON.stringify(updatedLikes));
                setIsLiked(!isLiked);
                actions.getVideoVlogDetails(videoId);
            })
            .catch((error) => console.error("Error al modificar like:", error));
    };

    const handleExitClick = () => {
        navigate("/vlog");
    };

    const [visibleComments, setVisibleComments] = useState(5); // Estado para comentarios visibles
    const [newComment, setNewComment] = useState(""); // Estado para el nuevo comentario

    const handleAddComment = () => {
        if (videoId && newComment) {
            actions.addCommentVlogDetails(videoId, newComment, store.user.id);
            setNewComment(""); // Limpiar el textarea después de añadir el comentario
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

    return (
        <>
            {isLoading ? (
                <div>Cargando...</div>
            ) : (
                <main className="flex flex-col min-h-screen text-white">
                    <div className="flex flex-wrap mb-60 flex-grow">
                        <div className="flex flex-col w-2/6 ps-28 flex-grow">
                            <div className="flex justify-center items-center">
                                {video && (
                                    <video className="w-full h-auto" controls src={video.src} />
                                )}
                            </div>
                            <div className="flex space-x-10 mt-4">
                                {video && (
                                    <img
                                        src={isFavorite ? HeartRed : Heart}
                                        alt="Heart"
                                        className="cursor-pointer w-12"
                                        onClick={handleFavoriteClick}
                                    />
                                )}
                                {video && (
                                    <img
                                        src={isLiked ? ILikeItRed : ILikeIt}
                                        alt="Like"
                                        className="cursor-pointer w-12"
                                        onClick={handleLikeClick}
                                    />
                                )}
                                <img
                                    src={Equis}
                                    alt="Salir"
                                    className="cursor-pointer w-12"
                                    onClick={handleExitClick}
                                />
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
                                        <img className="w-10 h-10 mb-10" src={Equis} alt="Salir" />
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
                                <hr className="h-1 bg-white" />
                                <div className="mt-6 ms-2 w-5/6 flex-grow">
                                    <CommentForm
                                        videoId={videoId}
                                        newComment={newComment}
                                        setNewComment={setNewComment}
                                        handleAddComment={handleAddComment}
                                        handleKeyDown={handleKeyDown}
                                    />

                                    <h2 className="text-2xl">Comentarios</h2>
                                    <div className="mt-4 overflow-auto">
                                        {store.comments
                                            ?.slice(0, visibleComments)
                                            .map((comment, index) =>
                                                comment.user && comment.user.id ? ( // Conditional check within return
                                                    <CommentCard
                                                        key={index}
                                                        comment={comment}
                                                        currentUserId={store.user.id}
                                                        onDelete={() =>
                                                            actions.deleteCommentVlogDetails(comment.id)
                                                        }
                                                    />
                                                ) : null
                                            )}
                                        {store.comments.length > visibleComments && (
                                            <button
                                                onClick={showMoreComments}
                                                className="mt-4 text-blue-500"
                                            >
                                                Mostrar más
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}
            <Sponsor />
        </>
    );
};
