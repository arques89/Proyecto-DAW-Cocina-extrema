import PropTypes from "prop-types";

export const Video = ({ image, season, chapter, go }) => {
  Video.propTypes = {
    image: PropTypes.string,
    season: PropTypes.string,
    chapter: PropTypes.string,
    go: PropTypes.string,
  };

  return (
    <>
      <div className="contenedor w-full flex">
        <img className="flex w-full px-32" src={image} alt="Fondo" />
        <div className="texto-superpuesto ms-32 flex text-center">
          <p className="">{season}</p>
          <p className="text-4xl mt-10">{chapter}</p>
          <div className="w-full justify-center flex">
            <p className="mt-12 border border-white rounded-full w-36 py-0.5">
              {go}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
