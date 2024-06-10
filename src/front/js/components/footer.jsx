import logoCompleto from "../../img/LOGO_COCINA_EXTREMA_COMPLETO.png";
import facebook from "../../img/facebook.png";
import twitter from "../../img/x.png";
import instagram from "../../img/instagram.png";

export const Footer = () => {
  return (

    <footer className="text-center">
      <div className="text-center py-8">
        <div className="flex justify-center">
          <div className="col-sm-6 flex justify-center">
            <div className="flex w-3/6 justify-center my-4">
              <a href="/">
                <img
                  src={logoCompleto}
                  alt="Logo"
                  width={200}
                />
              </a>
            </div>
          </div>
          <div className="flex col-sm-6 items-end pb-6">
            <div>
              <ul className="list-none flex items-center justify-center mb-0">
                <li>
                  <a href="/" className="text-white font-light px-2">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/" className="text-white font-light px-2">
                    Programas
                  </a>
                </li>
                <li>
                  <a href="/" className="text-white font-light px-2">
                    Recetas
                  </a>
                </li>
                <li>
                  <a href="/" className="text-white font-light px-2">
                    Concursantes
                  </a>
                </li>
                <li>
                  <a href="/" className="text-white font-light px-2">
                    Cocineros
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex col-sm-6 justify-center">
            <div className="flex w-3/6 justify-evenly px-40">
              <div className="bg-white rounded-full flex items-center justify-center h-8 w-8">
                <a
                  href="http://facebook.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={facebook} alt="Facebook" className="w-2" />
                </a>
              </div>

              <div className="bg-white rounded-full flex items-center justify-center h-8 w-8">
                <a href="https://twitter.com/?lang=es">
                  <img src={twitter} alt="X" className="w-4 bg-white" />
                </a>
              </div>
              <div className="bg-white rounded-full flex items-center justify-center h-8 w-8">
              <a
                href="http://instagram.es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-4"
                />
              </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="container">
              <p className="text-left text-light">
                © 2023 cocinaextrema{" "}
                <a href="/" className="text-light">
                  Aviso legal
                </a>{" "}
                |
                <a href="/" className="text-light">
                  Privacidad
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};