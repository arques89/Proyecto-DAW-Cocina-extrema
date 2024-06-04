// src/actions/loginActions.js
import config from '../../../config';

const loginActions = ({ getStore, getActions, setStore }) => {
  return {
    login: async (email, password) => {
      try {
        console.log("Attempting login with:", { email, password });
        
        const response = await fetch(`${config.hostname}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        console.log("Login response status:", response.status);

        if (!response.ok) {
          const responseData = await response.json();
          console.error("Login error response:", responseData);
          return { success: false, message: responseData.error || 'Error desconocido al iniciar sesión' };
        }

        const responseData = await response.json();
        console.log("Login response data:", responseData);

        const token = responseData.token;
        const userData = responseData.user;

        setStore({
          token,
          userId: userData.id,
          userEmail: userData.email,
          userName: userData.name,
          userSurname: userData.surname,
          userPhone: userData.phone,
          is_active: userData.is_active,
        });

        getActions().resetInactivityTimer();
        return { success: true };
      } catch (error) {
        console.error("Login catch error:", error);
        return { success: false, message: `Error en el cliente: ${error.message}` };
      }
    },
    logout: () => {
      // Limpiar el estado global
      setStore({
        token: null,
        userId: null,
        userEmail: null,
        userName: null,
        userSurname: null,
        userPhone: null,
        is_active: false,
      });

      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/';
    },
    checkToken: () => {
      const store = getStore();
      const token = store.token;
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          getActions().logout();
        }
      }
    },
  };
};

export default loginActions;
