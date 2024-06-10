import config from "../../../config";

const favoriteActions = (getStore, getActions, setStore) => ({
  getFavorites: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/favorite/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response from API:", response);

      if (response.ok) {
        try {
          const data = await response.json();
          setStore({ favorites: data });
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
        }
      } else {
        console.error("Fetch failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  },

  addFavorite: async (videoId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${config.hostname}/api/favorite/videos/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Actualizar el estado de la aplicación (volver a cargar favoritos, etc.)
      } else {
        const errorData = await response.json();
        console.error("Error adding favorite:", errorData);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  },

  deleteFavorite: async (videoId) => {
    const store = getStore();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/favorite/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStore({
          favorites: store.favorites.filter((video) => video.id !== videoId),
        });
      } else {
        const errorData = await response.json();
        console.error("Error deleting favorite:", errorData);
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  },
});

export default favoriteActions;
