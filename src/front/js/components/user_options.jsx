import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Context } from '../store/appContext';

export const UserOptions = ({ setOpen }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleOptionClick = (option) => {
    if (option === "close") {
      setOpen(false); // Cerrar el canvas cuando se hace clic en "X"
    } else if (option === "logout") {
      actions.logout();
      setOpen(false);
    } else if (option === "settings") {
      setOpen(false);
      navigate('/settings'); // Redirigir a /settings
    }
  };

  return (
    <div className="flex w-full h-full me-36 justify-end">
      <div className="w-full block pe-36">
        <div className="pb-8 flex text-5xl mt-0 justify-end">
          <a href="#" onClick={() => handleOptionClick("close")}>
            x
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#" onClick={() => handleOptionClick("settings")}>
            Configuración
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#" onClick={() => handleOptionClick("logout")}>
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  );
};

UserOptions.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
