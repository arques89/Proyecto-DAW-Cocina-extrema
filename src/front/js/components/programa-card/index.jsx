import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

const ProgramaCard = ({ image, title, description, duration, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <div className="w-1/3 p-4">
      <div className="flex flex-col">
        <img src={image} alt={title} className="w-full h-60 object-cover mb-4 mt-8" />
        <h2 className="text-white mb-3 text-left text-2xl">{title}</h2>
        <p className="text-white text-sm text-left mb-4 h-16">{description}</p>
        <p className="text-white mb-4">{duration}</p>
        <div className="flex justify-between">
          <button className="bg-white text-black px-8 rounded-full flex items-center" onClick={handleShowVideo}>
            <FaPlay className="mr-2" />
            Ver Ahora
          </button>
          <button className="text-white py-1 px-8 border-1 rounded-full" onClick={handleShowInfo}>
            Más Info
          </button>
        </div>

        {showVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg w-[1100px]">
              <button className="absolute top-2 right-2 bg-black text-white p-2 rounded-full" onClick={handleCloseVideo}>
                <FaTimes />
              </button>
              <div className="p-4">
                <video width="100%" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}

        {showInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-4 w-[600px]">
              <button className="absolute top-2 right-2 bg-black text-white p-2 rounded-full" onClick={handleCloseInfo}>
                <FaTimes />
              </button>
              <h2 className="text-black text-2xl mb-4">{title}</h2>
              <p className="text-black text-lg">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ProgramaCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

export default ProgramaCard;