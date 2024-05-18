import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../img/LogoNavBar.png";

import { Login } from "../pages/login/index";
import { Register } from "../pages/register";
import { Options } from "./options";
import { Menu_navbar } from "./menu_navbar";

import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export function NavBar() {
  const { store } = useContext(Context); // Obtén las acciones y el estado del contexto
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
                <span
                  id="title"
                  className="flex justify-center text-5xl sedgwick-ave-display-regular"
                >
                  Cocina Extrema
                </span>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {/* Button UserIcon */}
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <UserIcon className="h-7 w-7" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  {store.token === null && store.is_active === false ? (
                    <Menu.Items
                      id="menu-login-register"
                      className="absolute flex z-10 w-custom origin-top-right -md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="block w-full">
                        <Options />
                        {/* inicio_login */}
                        {/* <Login /> */}
                        {/* <Register /> */}

                        <Toaster position="top-center" reverseOrder={false} />
                      </div>
                      <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{
                          // Define default options
                          duration: 10000,
                        }}
                      />
                    </Menu.Items>
                  ) : (
                    <Navigate to="/dashboard" />
                  )}
                </Menu>

                {/* Menu dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Bars3Icon className="h-10 w-10" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Menu_navbar />
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
