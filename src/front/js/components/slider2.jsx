import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

export const Slider2 = ({ imageSrc, imageAlt, imageClass, imageHeight, darken }) => {
  return (
    <div id="slider" className="carousel slide w-full flex relative" data-ride="carousel" style={{ height: imageHeight }}>
      {darken && <div className="absolute inset-0 bg-black opacity-50 z-10"></div>}
      <div className="carousel-inner w-full h-full">
        <div className="carousel-item active w-full h-full">
          <img
            src={imageSrc}
            className={twMerge('d-block w-full object-cover', imageClass)}
            alt={imageAlt}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

Slider2.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  imageClass: PropTypes.string,
  imageHeight: PropTypes.string, // Nueva propiedad para la altura de la imagen
  darken: PropTypes.bool, // Nueva propiedad para oscurecer la imagen
};

Slider2.defaultProps = {
  imageAlt: 'Slider image',
  imageClass: '',
  imageHeight: '100vh', // Altura por defecto
  darken: false, // Valor por defecto para oscurecer
};