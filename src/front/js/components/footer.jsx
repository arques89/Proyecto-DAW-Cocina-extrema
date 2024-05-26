import logoCompleto from "../../img/LOGO_COCINA_EXTREMA_COMPLETO.png";
import facebook from "../../img/facebook.png";
import twitter from "../../img/x.png";
import instagram from "../../img/instagram.png";

// import "../../css/styles.css";
export const Footer = () => {
  return (
    // <!-- Footer -->
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
                  // className="img-fluid mb-3"
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
                  <img src={twitter} alt="Twitter" className="w-6 bg-white" />
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

// import logoCompleto from "../../img/LOGO_COCINA_EXTREMA_COMPLETO.png";
// import facebook from "../../img/facebook.png";
// import twitter from "../../img/x.png";
// import instagram from "../../img/instagram.png";

// import "../../css/styles.css"
// export const Footer = () => {
//     return(
//         // <!-- Footer -->
//         <footer className="container-fluid text-center py-3">
//             <div className="container text-center">
//                 <div className="row justify-content-center">
//                     <div className="col-sm-6">
//                         <div className="container main-logo">
//                             <a href="/"
//                                 ><img
//                                     src={logoCompleto}
//                                     alt="Logo"
//                                     className="img-fluid mb-3"
//                             /></a>
//                         </div>
//                     </div>
//                     <div className="col-sm-6 flex-container">
//                         <div className="container mt-10">
//                             <ul className="list-unstyled d-inline-flex align-items-center justify-content-center mb-0">
//                                 <li><a href="/" className="text-light">Home</a></li>
//                                 <li><a href="/" className="text-light">Programas</a></li>
//                                 <li><a href="/" className="text-light">Recetas</a></li>
//                                 <li><a href="/" className="text-light">Concursantes</a></li>
//                                 <li><a href="/" className="text-light">Cocineros</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row justify-content-center mt-4">
//                     <div className="col-sm-6 social-links">
//                         <div className="container">
//                             <a href="http://facebook.es/" target="_blank" rel="noopener noreferrer"
//                                 ><img src={facebook} alt="Facebook" className="img-fluid mx-2"
//                             /></a>
//                             <a href="https://twitter.com/?lang=es"
//                                 ><img src={twitter} alt="Twitter" className="img-fluid mx-2"
//                             /></a>
//                             <a href="http://instagram.es/" target="_blank" rel="noopener noreferrer"
//                                 ><img src={instagram} alt="Instagram" className="img-fluid mx-2"
//                             /></a>
//                         </div>
//                     </div>
//                     <div className="col-sm-6">
//                         <div className="container">
//                             <p className="text-left text-light">
//                                 © 2023 cocinaextrema <a href="/" className="text-light">Aviso legal</a> |
//                                 <a href="/" className="text-light">Privacidad</a>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };
