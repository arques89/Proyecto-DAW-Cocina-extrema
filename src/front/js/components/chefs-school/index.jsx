
import PropTypes from 'prop-types';
import { chefsList } from './mocks';

const ChefCard = ({ image, name, description }) => (
  <div className="w-1/4 p-4">
    <div className="rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={name} className="w-full max-h-96 object-cover" />
      <div className="pt-6">
        <h2 className="text-lg text-white mb-2 text-center">{name}</h2>
        <p className="text-white text-sm text-center mb-6">{description}</p>
      </div>
    </div>
  </div>
);

ChefCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const ChefsSchool = () => (
  <div className="flex flex-wrap justify-center -mx-4 px-44">
    {chefsList.map((chef) => (
      <ChefCard
        key={chef.id}
        image={chef.image}
        name={chef.name}
        description={chef.description}
      />
    ))}
  </div>
);

export default ChefsSchool;