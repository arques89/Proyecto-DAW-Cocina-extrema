import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlay, FaTimes } from 'react-icons/fa';

export const VideoPagina = ({ image, season, chapter, go, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <>
      <div className="contenedor w-full flex">
        <img className="flex w-full px-28" src={image} alt="Fondo" />
        <div className="texto-superpuesto ms-28 flex text-center">
          <p className="">{season}</p>
          <p className="text-4xl mt-10">{chapter}</p>
          <div className="w-full justify-center flex">
            <button className="mt-12 border border-white rounded-full w-36 py-0.5 flex items-center justify-center" onClick={handleShowVideo}>
              <FaPlay className="mr-2" />
              {go}
            </button>
          </div>
        </div>
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
    </>
  );
};

VideoPagina.propTypes = {
  image: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  chapter: PropTypes.string.isRequired,
  go: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
};