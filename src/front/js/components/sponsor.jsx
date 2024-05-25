import sponsor  from "../../img/img_home/sponsor/bosch.png";
import sponsor1 from "../../img/img_home/sponsor/elcorteingles.png";
import sponsor2 from "../../img/img_home/sponsor/arcos.png";
import sponsor3 from "../../img/img_home/sponsor/lecreuset.png";
import sponsor4 from "../../img/img_home/sponsor/aeg.png";

export const Sponsor = () => {
  return (
    <section>
        <div
          id="slider"
          className="mb-5 carousel slide-patrocinadores"
          data-ride="carousel"
        >
          <h2 className="patrocinadores">Patrocinadores</h2>
          <div className="imagenes-patrocinadores">
            <a href="http://bosch.es" target="_blank" rel="noopener noreferrer">
              <img src={sponsor} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a
              href="http://elcorteingles.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={sponsor1} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a href="http://arcos.es" target="_blank" rel="noopener noreferrer">
              <img src={sponsor2} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a
              href="http://lecreuset.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={sponsor3} className="img-fluid" alt="Imagen Grande" />
            </a>
            <a href="http://aeg.es" target="_blank" rel="noopener noreferrer">
              <img src={sponsor4} className="img-fluid" alt="Imagen Grande" />
            </a>
          </div>
        </div>
      </section>
  )
}
