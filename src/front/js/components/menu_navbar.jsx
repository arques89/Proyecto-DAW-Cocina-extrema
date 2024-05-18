import { Menu } from "@headlessui/react";

import facebook from "../../img/facebook.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import youtube from "../../img/youtube.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Menu_navbar = () => {
  return (
    <Menu.Items
      id="menu"
      className="absolute -right-8 z-10 mt-7 w-custom origin-top-right -md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <Menu.Item className="flex justify-end me-32 text-5xl mt-16">
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-4 py-3 text-black-700"
            )}
          >
            x
          </a>
        )}
      </Menu.Item>
      <Menu.Item className="flex justify-end me-32 text-6xl mt-12 ">
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-4 py-3 text-black-700"
            )}
          >
            Home
          </a>
        )}
      </Menu.Item>
      <Menu.Item className="flex justify-end me-32 text-6xl">
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-4 py-3 text-black-700"
            )}
          >
            Programa
          </a>
        )}
      </Menu.Item>
      <Menu.Item className="flex justify-end me-32 text-6xl">
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-4 py-3 text-black-700"
            )}
          >
            Escuela
          </a>
        )}
      </Menu.Item>
      <Menu.Item className="flex justify-end me-32 text-6xl">
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-4 py-3 text-black-700"
            )}
          >
            Vlogs
          </a>
        )}
      </Menu.Item>
      <Menu.Item className="flex justify-end me-32 text-6xl">
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? "text-shape_red" : "",
              "block px-4 py-3 text-black-700"
            )}
          >
            Tienda
          </a>
        )}
      </Menu.Item>
      <div className="flex mt-24 w-custom bg-primary py-1 justify-end">
        <Menu.Item className="flex justify-end me-14 text-7xl">
          <a href="#" className="block px-0 py-2 text-gray-700">
            <img
              src={facebook}
              alt=""
              style={{ height: "23px", width: "10px" }}
            />
          </a>
        </Menu.Item>
        <Menu.Item className="flex justify-end me-12 text-7xl">
          <a href="#" className="block px-3 py-2 text-gray-700">
            <img
              src={linkedin}
              alt=""
              style={{ height: "22px", width: "22px" }}
            />
          </a>
        </Menu.Item>
        <Menu.Item className="flex justify-end me-12 text-7xl">
          <a href="#" className="block px-1 py-2 text-gray-700">
            <img
              src={instagram}
              alt=""
              style={{ height: "23px", width: "23px" }}
            />
          </a>
        </Menu.Item>
        <Menu.Item className="flex justify-end me-32 text-7xl">
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "text-shape_red" : "",
                "block px-4 py-3 text-gray-700"
              )}
            >
              <img
                src={youtube}
                alt=""
                style={{ height: "18px", width: "28px" }}
              />
            </a>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  );
};
