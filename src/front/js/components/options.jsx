import { Menu } from "@headlessui/react";
import { useState } from "react";
import { Login } from "../pages/login";

// import { inputRegister } from "./mocks";
// import { useContext, useState } from "react";
// import { Context } from "../../store/appContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Options = () => {
const [change, setchange] = useState("/login")

  return (
    <div>
    <Menu.Item className="flex justify-end text-5xl mt-16 me-36">
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? "text-shape_red" : "",
            "block py-3 text-black-700"
          )}
        >
          x
        </a>
      )}
    </Menu.Item>
    <div className="flex justify-center mx-36">
      <Menu.Item className="flex justify-start text-2xl mt-10 w-full">
        {({ active }) => (
          <a
            href={change}
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-0 pb-2 text-shape_border_button border-b-2 me-8 border-shape_border_button"
            )}
          >
            INICIAR SESION
          </a>
        )}
      </Menu.Item>
      <Menu.Item className="flex justify-end text-2xl mt-10 w-full">
        {({ active }) => (
          <a
            href={setchange("/register")}
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-0 pb-2 text-shape_border_button border-b-2 ms-8 border-shape_border_button "
            )}
          >
            CREAR CUENTA
          </a>
        )}
      </Menu.Item>
    </div>
  </div>
  )
}
