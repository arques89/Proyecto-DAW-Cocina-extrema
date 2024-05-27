import config from "../../config";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

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
      token: null, // Obtén el token del localStorage
      userId: null,
      userEmail: null,
      userName: null,
      userSurname: null,
      userPhone: null,
      is_active: false,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      login: async (email, password) => {
        try {
          const response = await fetch(`${config.hostname}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const responseData = await response.json();
            return { success: false, message: responseData.error };
          }

          const responseData = await response.json();
          const token = responseData.token;
          const decodedToken = jwtDecode(token);

          setStore({ token });

          const userData = decodedToken.sub;
          setStore({
            userId: userData.id,
            userEmail: userData.email,
            userName: userData.name,
            userSurname: userData.surname,
            userPhone: userData.phone,
            is_active: userData.is_active,
          });

          localStorage.setItem("token", token);
          localStorage.setItem("userId", userData.id);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userSurname", userData.surname);
          localStorage.setItem("userPhone", userData.phone);
          localStorage.setItem("is_active", JSON.stringify(userData.is_active));

          resetInactivityTimer();
          return { success: true };
        } catch (error) {
          return { success: false, message: "Error al iniciar sesión" };
        }
      },
      register: async (email, password, name, surname, phone) => {
        try {
          const response = await fetch(`${config.hostname}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, surname, phone }),
          });
          if (!response.ok) {
            const responseData = await response.json();
            const notify = () => toast.error(`${responseData.error}`);
            throw new Error(notify());
          }
          return (
            toast.success(
              "Registro satisfactorio, por favor revise su bandeja de entrada"
            ),
            201
          );
        } catch (error) {
          return; // Retorna temprano en caso de error
        }
      },
      forgotPassword: async (email) => {
        try {
          const response = await fetch(`${config.hostname}/forgot_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const responseData = await response.json();
          if (!response.ok) {
            toast.error(responseData.error, { position: "top-right" });
            return { success: false, message: responseData.error };
          }
          toast.success(responseData.message, { position: "top-right" });
          return { success: true, message: responseData.message };
        } catch (error) {
          toast.error("Error al enviar la solicitud", { position: "top-right" });
          return { success: false, message: "Error al enviar la solicitud" };
        }
      },
      updatePersonalDetails: async (email, name, surname, phone) => {
        const store = getStore();
        const { userId, token } = store;

        try {
          const updates = {
            email: email,
            name: name,
            surname: surname,
            phone: phone
          };

          const response = await fetch(`${config.hostname}/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });

          if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.error);
          }

          // Actualiza los datos en el estado global y el localStorage
          setStore({
            userEmail: email,
            userName: name,
            userSurname: surname,
            userPhone: phone,
          });
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userName", name);
          localStorage.setItem("userSurname", surname);
          localStorage.setItem("userPhone", phone);

          toast.success("Detalles personales actualizados exitosamente");
        } catch (error) {
          console.error("Error al actualizar detalles personales:", error);
          toast.error("Error al actualizar detalles personales");
        }
      },
      updatePassword: async (password) => {
        const store = getStore();
        const { userId, token } = store;
      
        try {
          const response = await fetch(`${config.hostname}/users/${userId}/password`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password }),
          });
      
          if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.error);
          }
      
          toast.success("Contraseña actualizada exitosamente");
        } catch (error) {
          console.error("Error al actualizar la contraseña:", error);
          toast.error("Error al actualizar la contraseña");
        }
      },
    
      logout: () => {
        // Eliminar todos los datos del localStorage
        localStorage.clear();

        // Limpia el estado global
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
        window.location.href = "http://localhost:5173/";
      },

      checkToken: () => {
        const store = getStore();
        const token = store.token;
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            getActions().logout();
          }
        }
      },

      initializeApp: () => {
        initializeStore();
        resetInactivityTimer(); // Inicia el temporizador de inactividad
      },

      // Use getActions to call a function within a function
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
          fetch().then().then(data => setStore({ "foo": data.bar }))
        */
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
