import { cardDetails } from "./mocks";

export function Card() {
  const renderCardDetails = () => {
    return cardDetails.map((item) => (
      <div key={item.id} className="max-w-sm overflow-hidden shadow-lg">
        <div className="relative w-full h-96">
          <img
            className="top-0 left-0 w-full h-full object-cover"
            src={item.image}
            alt="card-image"
          />
        </div>
        <div className="px-6 py-4">
          <h5 className="my-4 text-md font-thin text-center text-white">
            {item.description}
          </h5>
        </div>
        <div className="pt-0 text-center rounded-full">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-white rounded-full w-40 py-1 font-thin bg-black text-white inline-block"
          >
            COMPRAR AHORA
          </a>
        </div>
      </div>
    ));
  };

  return <>{renderCardDetails()}</>;
}