import config from "../../config";
import toast from "react-hot-toast";
// import * as jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null, // Obtén el token del localStorage
      userId: null,
      userEmail: null,
      userName: null,
      userSurname: null,
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
            const notify = () => toast.error(responseData.error);
            throw new Error(notify());
          }

          const responseData = await response.json();
          const token = responseData.token;
          const decodedToken = jwtDecode(token); // Decodifica el token

          // Guarda el token en el estado global
          setStore({ token });

          // Decodifica los datos del token y guárdalos en el estado global
          const userData = decodedToken.sub;
          setStore({
            userId: userData.id,
            userEmail: userData.email,
            userName: userData.name,
            userSurname: userData.surname,
            is_active: userData.is_active,
          });

          // Guarda los datos del token en el localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userData.id);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userSurname", userData.surname);
          localStorage.setItem("is_active", userData.is_active);
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
      },
      register: async (email, password, name, surname) => {
        try {
          const response = await fetch(`${config.hostname}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, surname }),
          });
          if (!response.ok) {
            // console.log(response)
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
          if (!response.ok) {
            const responseData = await response.json();
            const notify = () => toast.error(`${responseData.error}`);

            throw new Error(notify());
          }
        } catch (error) {
          return;
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
          is_active: false,
        });

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "/login";
      },

      // Use getActions to call a function within a fuction
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
