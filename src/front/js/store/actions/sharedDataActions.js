// src/store/actions/sharedDataActions.js
import config from "../../../config";

const sharedDataActions = ({ getStore, setStore }) => {
  const getVideosSharedData = async () => {
    const store = getStore();
    if (!store.token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStore({ videos: data });
      } else {
        console.error('Error fetching videos:', response.statusText);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getCategoriesSharedData = async () => {
    const store = getStore();
    if (!store.token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${store.token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStore({ categories: data });
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const saveRecipeSharedData = async (recipeData) => {
    const store = getStore();
    if (!store.token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", recipeData.title);
      formData.append("description", recipeData.description);
      formData.append("videoFile", recipeData.videoFile);
      formData.append("ingredientsPart1", recipeData.ingredientsPart1);
      formData.append("ingredientsPart2", recipeData.ingredientsPart2);
      formData.append("duration", recipeData.duration);
      formData.append("user_id", store.userId);

      const response = await fetch(`${config.hostname}/api/videos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${store.token}`
        },
        body: formData,
      });

      if (response.ok) {
        const newVideo = await response.json();
        setStore({ videos: [...store.videos, newVideo] });
        return newVideo;
      } else {
        const errorData = await response.json();
        console.error("Error saving recipe:", errorData);
        return null;
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      return null;
    }
  };

  const deleteVideoSharedData = async (videoId) => {
    const store = getStore();
    if (!store.token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${store.token}`
        },
      });

      if (response.ok) {
        setStore({
          videos: store.videos.filter((video) => video.id !== videoId),
        });
      } else {
        console.error('Error deleting video:', response.statusText);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const getComments = (videoId) => {
    const store = getStore();
    const video = store.videos.find((video) => video.id === videoId);
    return video ? video.comments : [];
  };

  return {
    getVideosSharedData,
    getCategoriesSharedData,
    saveRecipeSharedData,
    deleteVideoSharedData,
    getComments,
  };
};

export default sharedDataActions;
