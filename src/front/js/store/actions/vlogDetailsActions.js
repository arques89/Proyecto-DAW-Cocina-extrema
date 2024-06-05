import config from "../../../config";

const vlogDetailsActions = ({ getStore, getActions, setStore }) => {
  return {
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

    getCommentsVlogDetails: async (videoId) => {
      try {
        const response = await fetch(`${config.hostname}/api/videos/${videoId}/comments`);
        if (!response.ok) throw new Error('Error fetching comments');
        const data = await response.json();
        setStore({ comments: data });
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },

    // getFavoritesVlogDetails : async (videoId) => {
    //   try {
    //     const response = await fetch(`${config.hostname}/api/videos/${videoId}/favorite`); // Verifica la ruta correcta
  
    //     if (!response.ok) throw new Error('Error fetching favorite status');
  
    //     const data = await response.json();
    //     setStore({ videoDetails: {...getStore().videoDetails, is_favorite: data.is_favorite } }); 
    //   } catch (error) {
    //     console.error('Error fetching favorite status:', error);
    //   }
    // },
  
    getLikesVlogDetails : async (videoId) => {
      try {
        const response = await fetch(`${config.hostname}/api/videos/${videoId}/like`); // Verifica la ruta correcta
  
        if (!response.ok) throw new Error('Error fetching like status');
  
        const data = await response.json();
        setStore({ videoDetails: {...getStore().videoDetails, is_liked: data.is_liked } }); 
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    },

    addCommentVlogDetails: async (videoId, text, userId) => {
      try {
        const response = await fetch(`${config.hostname}/api/videos/${videoId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ text, user_id: userId }),
        });
        if (!response.ok) throw new Error('Error adding comment');
        getActions().getCommentsVlogDetails(videoId); // Recargar comentarios después de agregar uno
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },

    addFavoriteVlogDetails: async (videoId) => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${config.hostname}/api/videos/${videoId}/favorite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error adding favorite');

        // Actualizar el estado local y en el store
        getActions().getVideoVlogDetails(videoId);
      } catch (error) {
        console.error('Error adding favorite:', error);
      }
    },

    removeFavoriteVlogDetails: async (videoId) => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${config.hostname}/api/videos/${videoId}/favorite`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error removing favorite');

        // Actualizar el estado local y en el store
        getActions().getVideoVlogDetails(videoId);
      } catch (error) {
        console.error('Error removing favorite:', error);
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

        getActions().getLikesVlogDetails(videoId);
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

        getActions().getLikesVlogDetails(videoId);
      } catch (error) {
        console.error('Error removing like:', error);
      }
    },

    deleteCommentVlogDetails: async (commentId, videoId) => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${config.hostname}/api/videos/${videoId}/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error deleting comment');

        // Actualizar el estado de la aplicación (volver a cargar comentarios)
        getActions().getCommentsVlogDetails(videoId);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
  };
};

export default vlogDetailsActions;
