import logoCompleto from "../../img/LOGO_COCINA_EXTREMA_COMPLETO.png";
import facebook from "../../img/facebook.png";
import twitter from "../../img/x.png";
import instagram from "../../img/instagram.png";

export const Footer = () => {
    return(
        // <!-- Footer -->
        <footer className="container-fluid text-center py-3">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <div className="container main-logo w-60">
                            <a href="/"
                                ><img
                                    src={logoCompleto}
                                    alt="Logo"
                                    className="img-fluid mb-3"
                            /></a>
                        </div>
                    </div>
                    <div className="col-sm-6 flex-container flex">
                        <div className="container mt-10">
                            <ul className="list-unstyled d-inline-flex align-items-center justify-content-center mb-0 me-60">
                                <li><a href="/" className="text-light">Home</a></li>
                                <li><a href="/" className="text-light">Programas</a></li>
                                <li><a href="/" className="text-light">Recetas</a></li>
                                <li><a href="/" className="text-light">Concursantes</a></li>
                                <li><a href="/" className="text-light">Cocineros</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-sm-6 social-links">
                        <div className="container">
                            <a href="http://facebook.es/" target="_blank" rel="noopener noreferrer"
                                ><img src={facebook} alt="Facebook" className="img-fluid mx-2 w-12 h-12"
                            /></a>
                            <a href="https://twitter.com/?lang=es"
                                ><img src={twitter} alt="Twitter" className="img-fluid mx-2"
                            /></a>
                            <a href="http://instagram.es/" target="_blank" rel="noopener noreferrer"
                                ><img src={instagram} alt="Instagram" className="img-fluid mx-2"
                            /></a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="container">
                            <p className="text-left text-light">
                                © 2023 cocinaextrema <a href="/" className="text-light">Aviso legal</a> |
                                <a href="/" className="text-light">Privacidad</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};