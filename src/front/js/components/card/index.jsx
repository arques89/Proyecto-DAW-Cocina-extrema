import { cardDetails } from "./mocks";

export function CardDefault() {
  const renderCardDetails = () => {
    return cardDetails.map((item) => (
      <div key={item.id}>
        <div className="max-w-sm mx-auto overflow-hidden shadow-lg">
          <img
            className="relative h-96 rounded-none"
            src={item.image}
            alt="card-image"
          />
          <div className="px-6 py-4">
            <h5 className="my-4 text-md font-thin text-center text-white">
              {item.description}
            </h5>
          </div>
          <div className="pt-0 text-center rounded-full">
            <button className="text-xs border border-white rounded-full w-40 py-1 font-thin bg-black text-white">
              COMPRAR AHORA
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return <>{renderCardDetails()}</>;
}
