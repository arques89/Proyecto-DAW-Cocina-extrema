import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Play from "../../../icon/vlog/play.png";
import IlikeIt from "../../../icon/vlog/ilikeit.png";
import Speech from "../../../icon/vlog/blanco_speech.png";
import Heart from "../../../icon/vlog/blanco_corazon.png";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export const CardVideo = ({ videos = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

 

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handlePlayClick = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error('Inicia sesión para poder ver el video');
      return navigate("/");
    }else
      return navigate(`/vlog/${id}`);
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < videos.length; i += 3) {
      rows.push(
        <div key={i} className="flex flex-row items-center justify-start gap-16 flex-wrap">
          {videos.slice(i, i + 3).map((video) => {
            const {
              id,
              src,
              title,
              likes_count = 0,
              comments_count = 0,
              favorites_count = 0,
              user_name = 'Anónimo',
              user_surname = '',
            } = video;

            return (
              <div
                key={id}
                className="relative w-[580px] h-[580px] transition duration-300"
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
              >
                <video src={src} className="w-full h-full object-cover transition-opacity duration-300" loop muted autoPlay />
                <div className={`absolute inset-0 flex flex-col justify-between p-4 text-white transition-opacity duration-300 ${hoveredIndex === id ? "opacity-100" : "opacity-0"} bg-black bg-opacity-50 z-20`}>
                  <div className="flex justify-end">
                    <img className="w-12 h-12 cursor-pointer" src={Play} alt="video vlog" onClick={() => handlePlayClick(id)} />
                  </div>
                  <div className="flex flex-col items-center justify-center flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center bg-opacity-75 px-3 py-1 rounded">
                        <img src={Heart} className="w-6 h-6 mr-1" alt="favorites icon" /> {favorites_count}
                      </div>
                      <div className="flex items-center bg-opacity-75 px-3 py-1 rounded">
                        <img src={Speech} className="w-6 h-6 mr-1" alt="comments icon" /> {comments_count}
                      </div>
                      <div className="flex items-center bg-opacity-75 px-3 py-1 rounded">
                        <img src={IlikeIt} className="w-6 h-6 mr-1" alt="likes icon" /> {likes_count}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm self-end mt-2">
                    {user_name} {user_surname}
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
      user_name: PropTypes.string,
      user_surname: PropTypes.string,
    })
  ).isRequired,
};
