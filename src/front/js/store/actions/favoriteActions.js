// src/store/actions/favoritesActions.js
import config from "../../../config";

const favoritesActions = ({ getStore, getActions, setStore }) => {
  const getFavorites = async () => {
    const store = getStore();
    if (!store.token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/favorite/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
      });
      console.log("Response from API:", response);
      if (response.ok) {
        const data = await response.json();
        setStore({ favorites: data });
      }
      console.error("Fetch failed with status:", response.status);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const deleteFavorite = async (videoId) => {
    const store = getStore();
    if (!store.token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
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
  };

  return {
    getFavorites,
    deleteFavorite,
  };
};

export default favoritesActions;
