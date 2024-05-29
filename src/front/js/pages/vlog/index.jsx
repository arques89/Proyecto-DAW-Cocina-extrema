import { useEffect, useContext } from 'react';
import { Context } from '../../store/appContext';
import { CardVideo } from '../../components/card/card_video';
import Appetizer from "../../../icon/vlog/appetizer.png";
import Fish from "../../../icon/vlog/fish.png";
import Meet from "../../../icon/vlog/meet.png";
import Dessert from "../../../icon/vlog/dessert.png";
import { Slider } from "../../components/vlog_slider";

export const Vlog = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getVideos();
  }, []);

  return (
    <main className="bg-black text-white">
      <Slider />
      <div className="mb-12 flex justify-between w-full px-32">
        {[
          { img: Appetizer, title: 'APERITIVO', desc: 'Entrantes Para Compartir' },
          { img: Fish, title: 'PESCADO', desc: 'Recetas de Pescados y Mariscos' },
          { img: Meet, title: 'CARNE', desc: 'Sabrosos platos de Carnes' },
          { img: Dessert, title: 'POSTRE', desc: 'Deliciosos Dulces para Terminar' }
        ].map((item, index) => (
          <div key={index} className="text-center w-1/4 flex flex-col items-center justify-center">
            <a href="/">
              <img src={item.img} className="mb-12 max-h-20" alt={item.title} />
            </a>
            <p className="mb-6 text-2xl">{item.title}</p>
            <p className="text-font_icon text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="flex px-28 mt-24 w-full mb-4">
        <div className="font-thin">
          <p className="text-4xl">Publicaciones</p>
          <p className="text-sm my-8">Recetas Compartidas</p>
        </div>
      </section>

      <div>
        <CardVideo videos={store.videos} />
      </div>
    </main>
  );
};
