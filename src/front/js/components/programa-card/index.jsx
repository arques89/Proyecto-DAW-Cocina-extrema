import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa';

const ProgramaCard = ({ image, title, description, duration }) => {
    return (
      <div className=" w-1/3 p-4">
        <div className=" ">
          <img src={image} alt={title} className="w-full h-48 object-cover mt-12" />
          <div className="space-x-3">
            <h2 className="text-2xl mb-2 mt-10  text-white">{title}</h2>
            <p className="text-white mb-4 mt-4">{description}</p>
            <p className="text-white mb-4">{duration}</p>
            <div className="flex justify-between">
              <button className="bg-white text-black px-8 rounded-full flex items-center">
                <FaPlay className="mr-2" />
                Ver Ahora
              </button>
              <button className=" text-white py-1 px-8 border-1 rounded-full">
                Más Info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  ProgramaCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  };
  
  export default ProgramaCard;