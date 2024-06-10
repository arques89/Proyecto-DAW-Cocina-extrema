import config from "../../../config";

const sharedDataActions = (getStore, getActions, setStore) => ({
  getVideosSharedData: async () => {
    const store = getStore();
    if (!store.token) {
        console.error("User not authenticated");
        return;
    }

    try {
        const response = await fetch(`${config.hostname}/api/sharedvideos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`, // Asegúrate de enviar el token
            },
        });

        if (response.ok) {
            const data = await response.json();
            setStore({ videos: data });
        } else {
            console.error("Error fetching videos:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
  },
  getCategoriesSharedData: async () => {
    const store = getStore();
    if (!store.token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`${config.hostname}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStore({ categories: data });
      } else {
        console.error("Error fetching categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  saveRecipeSharedData : async (recipeData) => {
    const store = getStore();
    if (!store.token) {
        console.error("User not authenticated");
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

        const response = await fetch(`${config.hostname}/api/videos`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${store.token}`,
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
  },
  updateRecipeSharedData : async (videoId, recipeData) => {
    const store = getStore();
    if (!store.token) {
        console.error("User not authenticated");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("description", recipeData.description);
        formData.append("ingredientsPart1", recipeData.ingredientsPart1);
        formData.append("ingredientsPart2", recipeData.ingredientsPart2);
        formData.append("duration", recipeData.duration);
        if (recipeData.videoFile) {
            formData.append("videoFile", recipeData.videoFile);
        }

        const response = await fetch(`${config.hostname}/api/videos/${videoId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${store.token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const updatedVideo = await response.json();
            setStore({
                videos: store.videos.map((video) =>
                    video.id === videoId ? updatedVideo : video
                ),
            });
            return updatedVideo;
        } else {
            const errorData = await response.json();
            console.error("Error updating recipe:", errorData);
            return null;
        }
    } catch (error) {
        console.error("Error updating recipe:", error);
        return null;
    }
  },
  deleteVideoSharedData : async (videoId) => {
    const store = getStore();
    if (!store.token) {
        console.error("User not authenticated");
        return;
    }

    try {
        const response = await fetch(
            `${config.hostname}/api/videos/${videoId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            }
        );

        if (response.ok) {
            setStore({
                videos: store.videos.filter((video) => video.id !== videoId),
            });
        } else {
            console.error("Error deleting video:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting video:", error);
    }
  },
  getComments: async (videoId) => {
    try {
      const response = await fetch(`${config.hostname}/api/videos/${videoId}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStore().token}`,
        },
      });
      if (!response.ok) throw new Error("Error fetching comments");
      const data = await response.json();
      return data; // Devolver los datos de los comentarios
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }
});

export default sharedDataActions;
