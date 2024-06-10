import config from "../../../config";

const vlogDetailActions = (getStore, getActions, setStore) => ({
  getVideoVlogDetails: async (videoId) => {
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}`);
      if (response.ok) {
        const data = await response.json();
        setStore({ videoDetails: data });
      } else {
        throw new Error("Error fetching video");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  },
  getLikesVlogDetails: async (videoId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/like`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error fetching like status');
      const data = await response.json();
      setStore({ videoDetails: {...getStore().videoDetails, is_liked: data.is_liked } }); 
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  },
  addFavoriteVlogDetails: async (videoId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${config.hostname}/api/videos/${videoId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error adding favorite");

      // Actualizar el estado local y en el store
      getActions().getVideoVlogDetails(videoId);

      // Actualizar favoritos en el estado global
      const store = getStore();
      setStore({
        favorites: [...store.favorites, videoId]
      });

    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  },
  removeFavoriteVlogDetails: async (videoId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${config.hostname}/api/videos/${videoId}/favorite`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error removing favorite");

      // Actualizar el estado local y en el store
      getActions().getVideoVlogDetails(videoId);

      // Actualizar favoritos en el estado global
      const store = getStore();
      setStore({
        favorites: store.favorites.filter(favId => favId !== videoId)
      });

    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  },
  addLikeVlogDetails: async (videoId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error adding like');
      getActions().getVideoVlogDetails(videoId);
    } catch (error) {
      console.error('Error adding like:', error);
    }
  },
  removeLikeVlogDetails: async (videoId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/like`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error removing like');
      getActions().getVideoVlogDetails(videoId);
    } catch (error) {
      console.error('Error removing like:', error);
    }
  },
  getCommentsVlogDetails: async (videoId) => {
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Error fetching comments");
      const data = await response.json();
      return data; // Devolver los datos de los comentarios
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  },
  addCommentVlogDetails: async (videoId, text) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ text })
      });
  
      if (!response.ok) {
        throw new Error("Error adding comment");
      }
  
      // Aquí estamos seguros de que response.json es una función
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  deleteCommentVlogDetails: async (commentId, videoId) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        `${config.hostname}/api/videos/${videoId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) throw new Error("Error deleting comment");
  
      // Actualizar el estado de la aplicación (volver a cargar comentarios)
      return await getActions().getCommentsVlogDetails(videoId);
    } catch (error) {
      console.error("Error deleting comment:", error);
      return [];
    }
  }
});

export default vlogDetailActions;
