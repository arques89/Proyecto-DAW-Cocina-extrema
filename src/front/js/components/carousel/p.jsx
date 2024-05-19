import { useEffect } from "react";
import { Carousel, initTWE } from "tw-elements";

initTWE({ Carousel });

export const CarouselDefault = () => {
  useEffect(() => {
    initTWE({
      Carousel,
      initTWE,
    });
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="relative w-full max-w-screen-lg mx-auto"
      data-twe-carousel-init
      data-twe-ride="carousel"
    >
      {/* Carousel indicators */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] mx-[20%] mb-4 flex list-none justify-end p-0"
        data-twe-carousel-indicators
      >
        <button
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide-to="0"
          data-twe-carousel-active
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide-to="1"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide-to="2"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Carousel items */}
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {/* First item */}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-active
          data-twe-carousel-item
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex w-full h-full">
            <div className="w-1/2">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                className="block w-full h-auto max-h-screen"
                alt="..."
              />
            </div>
            <div className="w-1/2 bg-grey_span flex flex-col justify-center items-center p-8">
              <h5 className="text-3xl">DÍA DE LA MADRE</h5>
              <p className="text-xs mt-8">
                Celebra este día tan especial con un regalo generoso para tu madre.
              </p>
              <button className="border border-white rounded-full text-xs w-28 py-1 mt-8">SABER MAS</button>
            </div>
          </div>
        </div>
        {/* Second item */}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-item
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex w-full h-full">
            <div className="w-1/2">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
                className="block w-full h-auto max-h-screen"
                alt="..."
              />
            </div>
            <div className="w-1/2 bg-grey_span flex flex-col justify-center items-center p-8">
              <h5 className="text-3xl">REGALO PERFECTO</h5>
              <p className="text-xs mt-8">
                Inspírate con nosotros y descubre regalos para toda la vida
              </p>
              <button className="border border-white rounded-full text-xs w-28 py-1 mt-8">SABER MAS</button>
            </div>
          </div>
        </div>
        {/* Third item */}
        <div
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-item
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex w-full h-full">
            <div className="w-1/2">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                className="block w-full h-auto max-h-screen"
                alt="..."
              />
            </div>
            <div className="w-1/2 bg-grey_span flex flex-col justify-center items-center p-8">
              <h5 className="text-3xl">RECETAS SALUDABLES</h5>
              <p className="text-xs mt-8">
                Aprende a realizar recetas saludables para mejorar el tránsito intestinal.
              </p>
              <button className="border border-white rounded-full text-xs w-28 py-1 mt-8">SABER MAS</button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls - prev item */}
      <button
        className="absolute top-2/3 mt-12 right-80 transform -translate-y-1/2 z-[1] flex items-center justify-center border-0 bg-none text-center text-white bg-red-500 opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselExampleCaptions"
        data-twe-slide="prev"
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      {/* Carousel controls - next item */}
      <button
        className="absolute top-2/3 mt-12 right-32 transform -translate-y-1/2 z-[1] flex items-center justify-center border-0 bg-none text-center bg-green-600 text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselExampleCaptions"
        data-twe-slide="next"
      >
        <span className="inline-block h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};
