import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Play from '../../../icon/vlog/play.png';
import PropTypes from "prop-types";

export const CardVideo = ({ videos }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [comments, setComments] = useState({});
  const [offsets, setOffsets] = useState({});
  const navigate = useNavigate();

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handlePlayClick = (id) => {
    navigate(`/vlog/${id}`);
  };

  const loadMoreComments = (videoId) => {
    const currentOffset = offsets[videoId] || 0;
    fetch(`/api/videos/${videoId}/comments?offset=${currentOffset}&limit=5`)
      .then(response => response.json())
      .then(data => {
        setComments(prevComments => ({
          ...prevComments,
          [videoId]: [...(prevComments[videoId] || []), ...data]
        }));
        setOffsets(prevOffsets => ({
          ...prevOffsets,
          [videoId]: currentOffset + 5
        }));
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < (videos?.length || 0); i += 3) {
      rows.push(
        <div key={i} className="flex flex-row items-center justify-start gap-16 flex-wrap">
          {videos.slice(i, i + 3).map((video) => (
            <div key={video.id} className={`relative w-[580px] h-[580px] transition duration-300`}
              onMouseEnter={() => handleMouseEnter(video.id)}
              onMouseLeave={handleMouseLeave}
            >
              <video src={video.src} className="w-full h-full object-cover transition-opacity duration-300" loop muted autoPlay />
              <div className={`absolute inset-0 flex flex-col justify-between p-4 text-white transition-opacity duration-300 ${hoveredIndex === video.id ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50 z-20`}>
                <div className="flex justify-end">
                  <img className="w-12 h-12 cursor-pointer" src={Play} alt="video vlog" onClick={() => handlePlayClick(video.id)} />
                </div>
                <div className="flex items-end h-1/2 justify-center space-x-8 pb-2">
                  <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">🤍 {video.likes ?? 0}</p>
                  <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">💬 {video.comments ?? 0}</p>
                </div>
                <div className="flex h-1/2 justify-center items-start pt-2">
                  <p className="text-2xl bg-opacity-75 py-1 rounded font-thin">{video.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Comentarios</h3>
                <div className="max-h-40 overflow-y-auto">
                  {comments[video.id]?.map(comment => (
                    <p key={comment.id} className="text-sm my-2">{comment.text}</p>
                  ))}
                </div>
                <button
                  onClick={() => loadMoreComments(video.id)}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Ver más comentarios
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="flex flex-col items-center justify-start gap-16">
      {renderRows()}
    </div>
  );
};

CardVideo.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
};
