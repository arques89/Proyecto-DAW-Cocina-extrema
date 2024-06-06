import PropTypes from 'prop-types';
import { contentList } from './mocks';
import { useNavigate } from 'react-router-dom';

const ContentFeature = ({ image, title, description, contentsAvailable, url }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(url);
  };
return(

  <div className="w-1/3 p-4">
    <div className="flex flex-col items-center">
      <img src={image} alt={title} className="w-full h-60 object-cover mb-4" />
      <h2 className="text-xl text-white mb-4 text-center">{title}</h2>
      <p className="text-white text-sm text-center mb-8 h-16 justify-items-center">{description}</p>
      <button className="bg-shape_red text-white py-2 px-10 rounded-full mb-4 text-sm" onClick={handleButtonClick}>VER CONTENIDOS</button>
      <p className="text-white text-sm text-center mb-8">{contentsAvailable} contenidos disponibles</p>
    </div>
  </div>
);
}
ContentFeature.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  contentsAvailable: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

const ContentCard = () => (
  <div className="flex flex-wrap justify-center md:justify-between w-full px-8 md:px-16 lg:px-32">
    {contentList.map((content) => (
      <ContentFeature
        key={content.id}
        image={content.image}
        title={content.title}
        description={content.description}
        contentsAvailable={content.contentsAvailable}
        url={content.url}
      />
    ))}
  </div>
);

export default ContentCard;