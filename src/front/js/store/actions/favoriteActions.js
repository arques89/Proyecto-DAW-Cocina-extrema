// src/store/actions/favoritesActions.js
import config from "../../../config";

const favoritesActions = ({ getStore, getActions, setStore }) => {
  const getFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/favorite/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      console.log("Response from API:", response);

      if (response.ok) {
        try {
          const data = await response.json();
          setStore({ favorites: data });
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          // Aquí puedes manejar el error de análisis de forma más específica,
          // por ejemplo, mostrando un mensaje de error al usuario.
        }
      } else {
        console.error("Fetch failed with status:", response.status);
        // Aquí puedes manejar otros errores de la petición, como 404 Not Found, etc.
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Aquí puedes manejar errores de red o de conexión.
    }
  };
  const addFavorite = async (videoId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${config.hostname}/api/favorite/videos/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Actualizar el estado de la aplicación (volver a cargar favoritos, etc.)
      } else {
        const errorData = await response.json();
        console.error("Error adding favorite:", errorData);
        // Mostrar mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      // Mostrar mensaje de error al usuario
    }
  };
  const deleteFavorite = async (videoId) => {
    const store = getStore();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/favorite/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        setStore({
          favorites: store.favorites.filter((video) => video.id !== videoId),
        });
      } else {
        const errorData = await response.json();
        console.error("Error deleting favorite:", errorData);
        // Mostrar mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      // Mostrar mensaje de error al usuario
    }
  };

  return {
    getFavorites,
    addFavorite,
    deleteFavorite,
  };
};

export default favoritesActions;
