import { Fragment, useContext } from "react";
import PropTypes from 'prop-types';
import { Dialog, Transition } from "@headlessui/react";
import { Menu_navbar } from "./menu_navbar";
import { ForgotPassword } from "../pages/forgot_password";
import { Options } from "./options.jsx"
import { Context } from "../store/appContext";

// Componente Canvas

export function Canvas({ open, setOpen, content }) {
  const { store } = useContext(Context); // Obtener el store del contexto

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-[1020px] pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen">
                  <div className="flex h-full mt-24 flex-col overflow-y-scroll py-6 shadow-xl bg-shape_primary">
                    <div className="relative mt-6 flex-1">
                      {content === "iconUser" ? (
                        <Options setOpen={setOpen} />
                      ) : content === "iconMenu" ? (
                        <Menu_navbar setOpen={setOpen} />
                      ) : content === "iconForgot" ? (
                        <ForgotPassword setOpen={setOpen} />
                      ) : null}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Canvas.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
