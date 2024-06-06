
import PropTypes from 'prop-types';

const VideoPlayer = ({ title, subtitle, videoUrl }) => {
    return (
      <div className="w-full flex flex-col bg-black text-white px-44">
        <h1 className="mb-3 mt-12 text-2xl">{title}</h1>
        <h2 className="text-xl mb-4">{subtitle}</h2>
        <video controls className="w-full h-auto">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  VideoPlayer.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  };
  
  export default VideoPlayer;