
import PropTypes from 'prop-types';
import { subscriptionPlans } from './mocks';

const PlanCard = ({ title, promoPrice, regularPrice }) => {
  return (
    <div className="w-1/3 text-white font-thin p-4 border rounded-3xl flex flex-col justify-between items-center">
      <p className="text-2xl tracking-widest text-shape_red mb-2">
        {title}
      </p>
      <p className="text-sm text-shape_primary mb-1">Precio promoción:</p>
      <p className="text-3xl text-shape_red mb-1">{promoPrice}</p>
      <p className="text-sm">Precio ({regularPrice})</p>
      <button className="mt-4 bg-shape_red text-black font-semibold py-2 px-4 rounded-full text-sm">
        MATRICÚLATE
      </button>
    </div>
  );
};

PlanCard.propTypes = {
  title: PropTypes.string.isRequired,
  promoPrice: PropTypes.string.isRequired,
  regularPrice: PropTypes.string.isRequired,
};

export const SubscriptionPlans = () => {
  return (
    <div className="flex mt-12 w-full mb-24 space-x-36 h-64">
      {subscriptionPlans.map((plan) => (
        <PlanCard
          key={plan.id}
          title={plan.title}
          promoPrice={plan.promoPrice}
          regularPrice={plan.regularPrice}
        />
      ))}
    </div>
  );
};
