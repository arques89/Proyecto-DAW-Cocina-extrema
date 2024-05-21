import { useState } from "react";
import logo from "../../img/LogoNavBar.png";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import { Canvas } from "./canvas";

export const Prueba = () => {
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleUserIconClick = () => {
    setIsCanvasOpen(true);
  };
  const handleMenuIconClick = () => {
    setOpen(true);
  };

  return (
    <div className="flex w-full h-24 bg-shape_primary border border-black">
      <div className="flex bg-red-300 w-1/4 items-center ps-20">
        <img className="h-14 w-14" src={logo} alt="Logo Cocina Extrema" />
      </div>
      <div className="bg-yellow-600 w-2/4">
        <span className="flex justify-center items-center h-full text-4xl sedgwick-ave-display-regular">
          Cocina Extrema
        </span>
        <div className="w-full flex justify-center bg-blue-gray-400">|</div>
      </div>
      <div className="bg-blue-700 w-1/4">
        <div className="flex items-center justify-end pe-20 h-full bg-blue-gray-500">
          <button onClick={handleUserIconClick}>
            <UserIcon className="h-8 w-8 me-2" aria-hidden="true" />
          </button>
          <button onClick={handleMenuIconClick}>
            <Bars3Icon className="h-10 w-10 ms-2" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Canvas open={isCanvasOpen} setOpen={setIsCanvasOpen} content={"iconUser"}/>
      <Canvas open={open} setOpen={setOpen} content={"iconMenu"} />
      <Canvas open={open} setOpen={setOpen} content={"iconForgot"} />
    </div>
  );
};
