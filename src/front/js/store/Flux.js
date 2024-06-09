import toast from "react-hot-toast";
import config from "../../config";

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
      token: null,
      userId: null,
      userEmail: null,
      userName: null,
      userSurname: null,
      userPhone: null,
      is_active: false,
      videos: [],
      comments: [],
      categories: [],
      likes: [],
      favorites: [],
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
          toast.success("Has iniciado sesión, bienvenido")
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
      },
      resetInactivityTimer,
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
      logout: () => {
        setStore({
          token: null,
          userId: null,
          userEmail: null,
          userName: null,
          userSurname: null,
          userPhone: null,
          is_active: false,
          videos: [],
          comments: [],
          categories: [],
          likes: [],
          favorites: [],
          user: {}
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userSurname');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userLikes');
        localStorage.removeItem('userFavorites');
        window.location.href = '/'; // Redirigir al usuario a la página de inicio de sesión
      },
      initializeApp: () => {
        initializeStore();
        const token = localStorage.getItem("token");
        if (token) {
          getActions().resetInactivityTimer();
        }
      },
      checkToken: () => {
        const store = getStore();
        const token = store.token;
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            getActions().logout();
          }
        }
      },

      //   FIN LOGINAACTION
      //   INICIO FAVORITEACTION

      getFavorites: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not authenticated");
          return;
        }

        try {
          const response = await fetch(
            `${config.hostname}/api/favorite/videos`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

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
      },

      addFavorite: async (videoId) => {
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
      },
      deleteFavorite: async (videoId) => {
        const store = getStore();
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not authenticated");
          return;
        }

        try {
          const response = await fetch(
            `${config.hostname}/api/favorite/videos/${videoId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            setStore({
              favorites: store.favorites.filter(
                (video) => video.id !== videoId
              ),
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
      },
      //   FIN FAVORITEACTION
      //   INICIO PERSONALDATAACTION
      getPersonalData: async () => {
        const store = getStore();
        if (!store.token) {
          console.error("User not authenticated");
          return;
        }
        try {
          const response = await fetch(`${config.hostname}/personaldata`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
          });
          if (!response.ok) throw new Error("Error fetching personal data");
          const data = await response.json();
          setStore({ user: data });
        } catch (error) {
          console.error("Error fetching personal data:", error);
        }
      },
      updatePersonalDetails: async (email, name, surname, phone) => {
        const store = getStore();
        if (!store.token) {
          console.error("User not authenticated");
          return;
        }
        try {
          const response = await fetch(`${config.hostname}/personaldata`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify({ email, name, surname, phone }),
          });
          if (!response.ok) throw new Error("Error updating personal details");
          const data = await response.json();
          setStore({ user: data });
        } catch (error) {
          console.error("Error updating personal details:", error);
        }
      },
      updatePassword: async (password) => {
        const store = getStore();
        if (!store.token) {
          console.error("User not authenticated");
          return;
        }
        try {
          const response = await fetch(
            `${config.hostname}/personaldata/password`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
              body: JSON.stringify({ password }),
            }
          );
          if (!response.ok) throw new Error("Error updating password");
          await response.json();
        } catch (error) {
          console.error("Error updating password:", error);
        }
      },

      //   FIN PERSONALDATAACTION

      //   INICIO SHAREDDATAACTION
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
      },
      //   FIN SHAREDDATAACTION

      //   INICIO VLOGACTION
      getVideosVlog : async () => {
        try {
            const response = await fetch(`${config.hostname}/api/vlogvideos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Error fetching videos");
            }
    
            const data = await response.json();
    
            // Imprimir todos los videos recibidos
            console.log("Todos los videos:", data);
    
            // Iterar sobre cada video e imprimir su información de usuario
            data.forEach(video => {
                console.log(`Video ID: ${video.id}, Usuario: ${video.user?.name || 'Anónimo'} ${video.user?.surname || ''}`);
            });
    
            setStore({ videos: data });
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    },
    
      

      //   FIN VLOGACTION
      //   INICIO VLOGDETAILACTION

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
            const getActions = getActions();
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
            const getActions = getActions();
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
      },
      




      //   FIN VLOGDETAILACTION
      //   INICIO ADDRESSDATA
      getAddresses: async () => {
        try {
          const response = await fetch(`${config.hostname}/api/addresses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setStore({ addresses: data });
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      },
      addAddress: async (address) => {
        try {
          const response = await fetch(`${config.hostname}/api/address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(address)
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error adding address:", error);
          throw error;
        }
      },
      setDefaultBillingAddress: async (id) => {
        try {
          const response = await fetch(`${config.hostname}/api/addresses/${id}/default`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error setting default billing address:", error);
          throw error;
        }
      },
      updateAddress: async (id, address) => {
        try {
            const response = await fetch(`${config.hostname}/api/addresses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(address)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating address:", error);
            throw error;
        }
    },
      deleteAddress: async (id) => {
        try {
            const response = await fetch(`${config.hostname}/api/addresses/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error deleting address:", error);
            throw error;
        }
    },
      //   FIN ADDRESSDATA
      //   INICIO BANKDATA
      getBankData: async () => {
        try {
            const response = await fetch(`${config.hostname}/api/bankdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setStore({ bankData: data });
        } catch (error) {
            console.error("Error fetching bank data:", error);
        }
    },
    addBankData: async (bankData) => {
        try {
            const response = await fetch(`${config.hostname}/api/bankdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(bankData)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding bank data:", error);
            throw error;
        }
    },
    setDefaultBankData: async (id) => {
        try {
            const response = await fetch(`${config.hostname}/api/bankdata/${id}/default`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error setting default bank data:", error);
            throw error;
        }
    },
    updateBankData: async (id, bankData) => {
        try {
            const response = await fetch(`${config.hostname}/api/bankdata/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(bankData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating bank data:", error);
            throw error;
        }
    },
    deleteBankData: async (id) => {
        try {
            const response = await fetch(`${config.hostname}/api/bankdata/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error deleting bank data:", error);
            throw error;
        }
    },
    
      //   FIN BANKDATA



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
