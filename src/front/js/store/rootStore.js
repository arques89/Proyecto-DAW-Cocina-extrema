// src/store/rootStore.js
import loginActions from "./actions/loginActions";
import sharedDataActions from "./actions/sharedDataActions";
import vlogActions from "./actions/vlogActions";
import vlogDetailsActions from "./actions/vlogDetailsActions";
import personalDataActions from "./actions/personalDataActions";
import favoritesActions from "./actions/favoriteActions";

const getState = ({ getStore, getActions, setStore }) => {
  let inactivityTimer;

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    inactivityTimer = setTimeout(() => {
      getActions().logout();
    }, 10 * 60 * 1000); // 10 minutos de inactividad
  };

  const initializeStore = () => {
    const store = getStore();
    if (store.token) {
      setStore({
        token: store.token,
        userId: store.userId,
        userEmail: store.userEmail,
        userName: store.userName,
        userSurname: store.userSurname,
        userPhone: store.userPhone,
        is_active: store.is_active,
      });
    }
  };

  return {
    store: {
      token: null,
      userId: null,
      userEmail: null,
      userName: null,
      userSurname: null,
      userPhone: null,
      is_active: false,
      videos: [],
      comments: [],
      categories: [],
      likes: [],
      favorites: [],
      user: {} // Añadir el estado del usuario aquí
    },
    actions: {
      ...loginActions({ getStore, getActions, setStore }),
      ...sharedDataActions({ getStore, getActions, setStore }),
      ...vlogActions({ getStore, getActions, setStore }),
      ...vlogDetailsActions({ getStore, getActions, setStore }),
      ...personalDataActions({ getStore, getActions, setStore }),
      ...favoritesActions({ getStore, getActions, setStore }),
      resetInactivityTimer,
      initializeApp: () => {
        initializeStore();
        resetInactivityTimer();
      },
    },
  };
};

export default getState;
