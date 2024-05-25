import { Fragment } from "react";
import PropTypes from 'prop-types';
import { Dialog, Transition } from "@headlessui/react";
import { Options } from "./options";
import { Menu_navbar } from "./menu_navbar";
import { Toaster } from "react-hot-toast";
import { ForgotPassword } from "../pages/forgot_password";

// Componente Canvas

export function Canvas({ open, setOpen, content }) {
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
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                      // Define default options
                      duration: 10000,
                      style: {
                        background: "#363636",
                        color: "#fff",
                        marginBottom: "0px",
                        marginRight: "220px",
                      },
                    }}
                  />
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
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  content: PropTypes.string,
};