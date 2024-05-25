import { useState, useEffect } from "react";
import { mocksCarousel } from "./carousel/mocks";
import { Icon } from "react-icons-kit";
import { arrow_left } from "react-icons-kit/ikons/arrow_left";
import { arrow_right } from "react-icons-kit/ikons/arrow_right";

export const Prueba = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mocksCarousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mocksCarousel.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const renderIndicators = () => {
    return (
      <div className="flex justify-center mt-2">
        {mocksCarousel.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-1 mx-1 ${
              index === currentIndex ? "bg-red-600" : "bg-white"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-blue-gray-400 justify-center flex flex-col items-center my-4">
      <div className="relative w-4/5 h-80 flex items-center">
        <div className="w-full h-full flex">
          <div className="bg-red-600 w-1/2 flex-grow flex justify-center items-center overflow-hidden">
            <img
              src={mocksCarousel[currentIndex].image}
              alt=""
              className="object-cover object-center h-full w-full"
            />
          </div>
          <div className="bg-grey_span w-1/2 pt-12 flex-grow flex flex-col justify-center items-center">
            <p className="text-3xl text-white pb-4">
              {mocksCarousel[currentIndex].title}
            </p>
            <p className="text-sm text-white font-thin">
              {mocksCarousel[currentIndex].subtitle}
            </p>
            <button className="border border-white rounded-full text-xs w-28 py-1 mt-8">
              SABER MAS
            </button>
            <div className="flex mt-12 items-center">
              <button
                onClick={prevImage}
                className="flex items-center justify-center"
                style={{ width: '40px', height: '40px' }}
              >
                <Icon icon={arrow_left} size={24} />
              </button>
              {renderIndicators()}
              <button
                onClick={nextImage}
                className="flex items-center justify-center"
                style={{ width: '40px', height: '40px' }}
              >
                <Icon icon={arrow_right} size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
