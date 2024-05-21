import { useState } from "react";

import facebook from "../../img/facebook.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import youtube from "../../img/youtube.png";

export const Menu_navbar = ({ setOpen }) => {

  const handleOptionClick = (option) => {
    if (option === "close") {
      setOpen(false); // Cerrar el canvas cuando se hace clic en "X"
    }
  };

  return (
    <div className="flex w-full h-full me-36 justify-end">
      <div className="w-full block pe-36">
        <div className="py-8 flex text-5xl mt-16 justify-end">
          <a href="#" onClick={() => handleOptionClick("close")}>
            
            x
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#">
            Home
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#">
            Programa
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#">
            Escuela
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#">
            Vlogs
          </a>
        </div>
        <div className="py-8 flex justify-end text-6xl">
          <a href="#">
            Tienda
          </a>
        </div>
        <div className="flex w-full mt-24 items-center justify-end">
          <div className="me-14">
            <a href="#">
              <img
                src={facebook}
                alt="facebook"
                style={{ height: "23px", width: "10px" }}
              />
            </a>
          </div>
          <div className="me-14">
            <a href="#">
              <img
                src={linkedin}
                alt="linkedin"
                style={{ height: "22px", width: "22px" }}
              />
            </a>
          </div>
          <div className="me-14">
            <a href="#">
              <img
                src={instagram}
                alt="instagram"
                style={{ height: "23px", width: "23px" }}
              />
            </a>
          </div>
          <div>
            <a href="#">
              <img
                src={youtube}
                alt="youtube"
                style={{ height: "18px", width: "28px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
