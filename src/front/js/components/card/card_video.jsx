// src/front/js/components/card/CardVideo.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Play from '../../../icon/vlog/play.png';
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
                  <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">🤍 {video.likes}</p>
                  <p className="flex items-center bg-opacity-75 px-3 py-1 rounded">💬 {video.comments}</p>
                </div>
                <div className="flex h-1/2 justify-center items-start pt-2">
                  <p className="text-2xl bg-opacity-75 py-1 rounded font-thin">{video.description}</p>
                </div>
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
