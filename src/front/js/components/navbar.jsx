import { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../img/LogoNavBar.png";
import facebook from "../../img/facebook.png";
import instagram from "../../img/instagram.png";
import linkedin from "../../img/linkedin.png";
import youtube from "../../img/youtube.png";
import { Login } from "../pages/login/index";
import { Register } from "../pages/register";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div
              id="navbar-h"
              className="relative flex h-20 items-center justify-between"
            >
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setOpen(!open)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-14 w-auto" src={logo} alt="Your Company" />
                </div>
              </div>
                  <div className="absolute w-full justify-center">
              <span id="title" className="flex justify-center text-5xl sedgwick-ave-display-regular">Cocina Extrema</span>
                  </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      
                  <Login />
                  <Register />
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Bars3Icon className="h-10 w-10" aria-hidden="true" />
                    </Menu.Button>
                  </div>
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
                        <a href="#" className={classNames(
                                active ? "text-shape_red" : "",
                                "block px-4 py-3 text-gray-700"
                              )}>
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
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
