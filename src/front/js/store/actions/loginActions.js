import toast from "react-hot-toast";
import config from "../../../config";

const loginActions = (getStore, getActions, setStore) => {
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

        const userLikes = Array.isArray(userData.likes) ? userData.likes : [];
        const userFavorites = Array.isArray(userData.favorites) ? userData.favorites : [];
        toast.success("Has iniciado sesión, bienvenido");
        
        setStore({
          token,
          userId: userData.id,
          userEmail: userData.email,
          userName: userData.name,
          userSurname: userData.surname,
          userPhone: userData.phone,
          is_active: userData.is_active,
        });

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userSurname', userData.surname);
        localStorage.setItem('userPhone', userData.phone);
        localStorage.setItem('userLikes', JSON.stringify(userLikes));
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));

        getActions().resetInactivityTimer();
        return { success: true };
      } catch (error) {
        console.error("Login catch error:", error);
        return { success: false, message: `Error en el cliente: ${error.message}` };
      }
    }
  };
};

export default loginActions;
