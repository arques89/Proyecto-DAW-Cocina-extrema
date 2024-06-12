
import { Sponsor } from "../../components/sponsor";

export const Cesta = () => {
    return (
      <main>
<section className="px-44 w-full mb-2 mt-24">
        <div className="text-white font-thin">
          <p className="text-3xl">Elige un plan de suscripción</p>
          <p className="text-base mt-8">
            Puedes suscribirte a todos los cursos de la Escuela Cocina Extrema
            seleccionando un plan de suscripción con renovación automática.
            Podrás aprender a tu ritmo y cancelar en cualquier momento.
          </p>
        </div>
      </section>
      
      <Sponsor />
      </main>
    )
}