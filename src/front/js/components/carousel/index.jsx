import { useState, useEffect, useMemo } from "react";
import ChevronRight from "../../../img/icons/flecha_derecha.svg";
import ChevronLeft from "../../../img/icons/flecha_izquierda.svg";
import { mocksCarousel } from "./mocks";

export const Carousel = () => {
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
    const intervalId = setInterval(nextImage, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const renderIndicators = useMemo(() => {
    return (
      <div className="flex justify-center mt-2">
        {mocksCarousel.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-1 mx-1 transition-opacity duration-300 ${
              index === currentIndex ? "bg-red-600 opacity-100" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    );
  }, [currentIndex]);

  return (
    <div className="w-full bg-blue-gray-400 justify-center flex flex-col items-center my-4 mx-28">
      <div className="relative w-full h-80 flex items-center">
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
            <a
              href={mocksCarousel[currentIndex].url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white rounded-full text-xs w-28 py-1 mt-8 text-center"
            >
              SABER MAS
            </a>
            <div className="flex mt-12 items-center">
              <button
                onClick={prevImage}
                className="flex items-center justify-center mr-4"
                style={{ width: '40px', height: '40px' }}
              >
                <img src={ChevronLeft} alt="Arrow Back" className="text-white opacity-50" />
              </button>
              {renderIndicators}
              <button
                onClick={nextImage}
                className="flex items-center justify-center ml-4 text-white opacity-50"
                style={{ width: '40px', height: '40px' }}
                size={24}
              >
                <img src={ChevronRight} alt="Chevron Right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};