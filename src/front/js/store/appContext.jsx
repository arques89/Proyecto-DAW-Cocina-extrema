// src/store/appContext.jsx

import React, { useState, useEffect } from "react";
// import getState from "./rootStore";
import getState from "./Flux";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        // this will be passed as the context value
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            state.actions.initializeApp(); // Initialize the app and check token

            const resetInactivity = () => {
                state.actions.initializeApp();
            };

            const videoActivity = event => {
                if (event.type === "play" || event.type === "pause") {
                    resetInactivity();
                }
            };

            window.addEventListener("mousemove", resetInactivity);
            window.addEventListener("keypress", resetInactivity);
            document.querySelectorAll("video").forEach(video => {
                // video.addEventListener("play", videoActivity);
                // video.addEventListener("pause", videoActivity);
            });

            return () => {
                window.removeEventListener("mousemove", resetInactivity);
                window.removeEventListener("keypress", resetInactivity);
                document.querySelectorAll("video").forEach(video => {
                    // video.removeEventListener("play", videoActivity);
                    // video.removeEventListener("pause", videoActivity);
                });
            };
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
