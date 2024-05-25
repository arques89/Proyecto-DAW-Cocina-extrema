import { useState } from "react";
import logo from "../../img/LogoNavBar.png";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import { Canvas } from "./canvas";

export const NavBar = () => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleUserIconClick = () => {
    setIsCanvasOpen(true);
    setContent("iconUser");
  };

  const handleMenuIconClick = () => {
    setIsCanvasOpen(true);
    setContent("iconMenu");
  };

  return (
    <div className="flex w-full h-24 bg-shape_primary">
      <div className="flex w-1/4 items-center ps-20">
        <img className="h-14 w-14" src={logo} alt="Logo Cocina Extrema" />
      </div>
      <div className="w-2/4">
        <span className="flex justify-center items-center h-full text-4xl sedgwick-ave-display-regular">
          Cocina Extrema
        </span>
      </div>
      <div className="w-1/4">
        <div className="flex items-center justify-end pe-20 h-full">
          <button onClick={handleUserIconClick}>
            <UserIcon className="h-8 w-8 me-2" aria-hidden="true" />
          </button>
          <button onClick={handleMenuIconClick}>
            <Bars3Icon className="h-10 w-10 ms-2" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Canvas open={isCanvasOpen} setOpen={setIsCanvasOpen} content={content} />
    </div>
  );
};
