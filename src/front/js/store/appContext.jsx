import React, { useState, useEffect } from "react";
import getState from "./Flux"; // Importando desde Flux

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
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
            state.actions.initializeApp(); // Inicializa la app y checkea el token

            const resetInactivity = () => {
                state.actions.resetInactivityTimer();
            };

            const videoActivity = event => {
                if (event.type === "play" || event.type === "pause") {
                    resetInactivity();
                }
            };

            window.addEventListener("mousemove", resetInactivity);
            window.addEventListener("keypress", resetInactivity);
            document.querySelectorAll("video").forEach(video => {
                video.addEventListener("play", videoActivity);
                video.addEventListener("pause", videoActivity);
            });

            return () => {
                window.removeEventListener("mousemove", resetInactivity);
                window.removeEventListener("keypress", resetInactivity);
                document.querySelectorAll("video").forEach(video => {
                    video.removeEventListener("play", videoActivity);
                    video.removeEventListener("pause", videoActivity);
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
