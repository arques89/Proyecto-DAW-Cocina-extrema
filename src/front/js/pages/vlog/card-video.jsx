import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Play from "../../../icon/vlog/play.png";
import PropTypes from "prop-types";

export const CardVideo = ({ videos }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handlePlayClick = (id) => {
    navigate(`/vlog/${id}`);
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < videos.length; i += 3) {
      rows.push(
        <div key={i} className="flex flex-row items-center justify-start gap-16 flex-wrap">
          {videos.slice(i, i + 3).map((video) => {
            return (
              <div key={video.id} className={`relative w-[580px] h-[580px] transition duration-300`}
                onMouseEnter={() => handleMouseEnter(video.id)}
                onMouseLeave={handleMouseLeave}
              >
                <video src={video.src} className="w-full h-full object-cover transition-opacity duration-300" loop muted autoPlay />
                <div className={`absolute inset-0 flex flex-col justify-between p-4 text-white transition-opacity duration-300 ${hoveredIndex === video.id ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50 z-20`}>
                  <div className="flex justify-end">
                    <img className="w-12 h-12 cursor-pointer" src={Play} alt="video vlog" onClick={() => handlePlayClick(video.id)} />
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <h3 className="text-2xl font-bold">{video.title}</h3>
                    <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">💖 {video.favorites_count ?? 0}</p>
                    <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">💬 {video.comments_count ?? 0}</p>
                    <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">👍 {video.likes_count ?? 0}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
      favorites_count: PropTypes.number.isRequired,
      comments_count: PropTypes.number.isRequired,
      likes_count: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CardVideo.defaultProps = {
  videos: [
    {
      id: 0,
      src: '',
      favorites_count: 0,
      comments_count: 0,
      likes_count: 0,
      title: 'Loading...',
    },
  ],
};
