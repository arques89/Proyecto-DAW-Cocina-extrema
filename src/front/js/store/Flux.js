// Páginas de la aplicación
import loginActions from "./actions/loginActions";
import registerActions from "./actions/registerActions";
import forgotPasswordActions from "./actions/forgotPasswordActions";
import logoutAction from "./actions/logOutActions";

// Archivos de configuración 
import bankDataActions from "./actions/bankDataActions";
import addressDataActions from "./actions/addressDataActions";
import sharedDataActions from "./actions/sharedDataActions";
import favoriteActions from "./actions/favoriteActions";
import personalActions from "./actions/personalActions";

// Archivos vlog y vlogDetails
import vlogDetailActions from "./actions/vlogDetailActions";
import vlogActions from "./actions/vlogActions";

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
    const token = localStorage.getItem("token");
    if (token) {
      setStore({
        token,
        userId: localStorage.getItem("userId"),
        userEmail: localStorage.getItem("userEmail"),
        userName: localStorage.getItem("userName"),
        userSurname: localStorage.getItem("userSurname"),
        userPhone: localStorage.getItem("userPhone"),
        is_active: true,
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
    },
    actions: {
      ...loginActions(getStore, getActions, setStore),
      ...registerActions(getStore, getActions, setStore),
      ...forgotPasswordActions(getStore, getActions, setStore),
      ...logoutAction(getStore, getActions, setStore),
      ...bankDataActions(getStore, getActions, setStore),
      ...addressDataActions(getStore, getActions, setStore),
      ...vlogDetailActions(getStore, getActions, setStore),
      ...vlogActions(getStore, getActions, setStore),
      ...sharedDataActions(getStore, getActions, setStore),
      ...favoriteActions(getStore, getActions, setStore),
      ...personalActions(getStore, getActions, setStore),

      resetInactivityTimer,

      initializeApp: () => {
        initializeStore();
        const token = localStorage.getItem("token");
        if (token) {
          getActions().resetInactivityTimer();
        }
      },
    },
  };
};

export default getState;
