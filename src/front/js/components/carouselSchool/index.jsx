import { useState, useEffect, useMemo } from "react";
import ChevronRight from "../../../img/icons/flecha_derecha.svg";
import ChevronLeft from "../../../img/icons/flecha_izquierda.svg";
import { carouselSchool } from "./mocks";

export const CarouselSchool = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselSchool.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselSchool.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const renderIndicators = useMemo(() => {
    return (
      <div className="flex justify-center mt-2">
        {carouselSchool.map((_, index) => (
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
    <div className="relative w-full h-[480px] px-28 my-4">
      <div className="relative w-full h-full flex items-center">
        <img
          src={carouselSchool[currentIndex].image}
          alt=""
          className="object-cover object-center h-full w-full"
        />
        <div className="absolute top-0 left-0 h-full w-2/5 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
          <p className="text-2xl text-red-600 pb-4 text-center">
            {carouselSchool[currentIndex].title}
          </p>
          <p className="text-sm text-white font-thin text-center">
            {carouselSchool[currentIndex].subtitle}
          </p>
          <button className="mt-4 border text-white py-2 px-4 rounded-full text-xs">
            VER CONTENIDO
          </button>
          <div className="flex mt-12 items-center justify-center w-full">
            <button
              onClick={prevImage}
              className="flex items-center justify-center mr-2"
              style={{ width: '30px', height: '30px' }}
            >
              <img src={ChevronLeft} alt="Arrow Back" className="text-white opacity-50" />
            </button>
            {renderIndicators}
            <button
              onClick={nextImage}
              className="flex items-center justify-center ml-2"
              style={{ width: '30px', height: '30px' }}
              size={24}
            >
              <img src={ChevronRight} alt="Chevron Right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};