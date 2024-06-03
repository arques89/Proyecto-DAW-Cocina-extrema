// src/store/rootStore.js

import { getVlogDetailsActions } from './vlogDetailsActions';
import { getVlogDetailsStore } from './vlogDetailsStore';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    ...getVlogDetailsStore({ getStore, getActions, setStore }),
    actions: {
      ...getVlogDetailsActions(getStore, getActions, setStore),
      // Puedes añadir aquí más acciones globales si es necesario
    },
  };
};

export default getState;
