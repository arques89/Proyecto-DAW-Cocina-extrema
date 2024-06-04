// import config from "../../config";
// import toast from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";

// const getState = ({ getStore, getActions, setStore }) => {
//   let inactivityTimer;

//   const resetInactivityTimer = () => {
//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//     inactivityTimer = setTimeout(() => {
//       getActions().logout();
//     }, 10 * 60 * 1000); // 10 minutos de inactividad
//   };

//   const initializeStore = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setStore({
//         token,
//         userId: localStorage.getItem("userId"),
//         userEmail: localStorage.getItem("userEmail"),
//         userName: localStorage.getItem("userName"),
//         userSurname: localStorage.getItem("userSurname"),
//         userPhone: localStorage.getItem("userPhone"),
//         is_active: true,
//       });
//     }
//   };

//   return {
//     store: {
//       token: null, // Obtén el token del localStorage
//       userId: null,
//       userEmail: null,
//       userName: null,
//       userSurname: null,
//       userPhone: null,
//       is_active: false,
//       videos: [],
//       comments: [],
//       categories: [],
//       likes: [],
//       isLoading: true,
//       demo: [
//         {
//           title: "FIRST",
//           background: "white",
//           initial: "white",
//         },
//         {
//           title: "SECOND",
//           background: "white",
//           initial: "white",
//         },
//       ],
//     },
//     actions: {
//       login: async (email, password) => {
//         try {
//           const response = await fetch(`${config.hostname}/login`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//           });

//           if (!response.ok) {
//             const responseData = await response.json();
//             return { success: false, message: responseData.error };
//           }

//           const responseData = await response.json();
//           const token = responseData.token;
//           const decodedToken = jwtDecode(token);

//           setStore({ token });

//           const userData = decodedToken.sub;
//           setStore({
//             userId: userData.id,
//             userEmail: userData.email,
//             userName: userData.name,
//             userSurname: userData.surname,
//             userPhone: userData.phone,
//             is_active: userData.is_active,
//           });

//           localStorage.setItem("token", token);
//           localStorage.setItem("userId", userData.id);
//           localStorage.setItem("userEmail", userData.email);
//           localStorage.setItem("userName", userData.name);
//           localStorage.setItem("userSurname", userData.surname);
//           localStorage.setItem("userPhone", userData.phone);
//           localStorage.setItem("is_active", JSON.stringify(userData.is_active));

//           resetInactivityTimer();
//           return { success: true };
//         } catch (error) {
//           return { success: false, message: "Error al iniciar sesión" };
//         }
//       },
//       register: async (email, password, name, surname, phone) => {
//         try {
//           const response = await fetch(`${config.hostname}/register`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password, name, surname, phone }),
//           });
//           if (!response.ok) {
//             const responseData = await response.json();
//             const notify = () => toast.error(`${responseData.error}`);
//             throw new Error(notify());
//           }
//           return (
//             toast.success(
//               "Registro satisfactorio, por favor revise su bandeja de entrada"
//             ),
//             201
//           );
//         } catch (error) {
//           return; // Retorna temprano en caso de error
//         }
//       },
//       forgotPassword: async (email) => {
//         try {
//           const response = await fetch(`${config.hostname}/forgot_password`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email }),
//           });
//           const responseData = await response.json();
//           if (!response.ok) {
//             toast.error(responseData.error, { position: "top-right" });
//             return { success: false, message: responseData.error };
//           }
//           toast.success(responseData.message, { position: "top-right" });
//           return { success: true, message: responseData.message };
//         } catch (error) {
//           toast.error("Error al enviar la solicitud", {
//             position: "top-right",
//           });
//           return { success: false, message: "Error al enviar la solicitud" };
//         }
//       },
//       updatePersonalDetails: async (email, name, surname, phone) => {
//         const store = getStore();
//         const { userId, token } = store;

//         try {
//           const updates = {
//             email: email,
//             name: name,
//             surname: surname,
//             phone: phone,
//           };

//           const response = await fetch(`${config.hostname}/users/${userId}`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(updates),
//           });

//           if (!response.ok) {
//             const responseData = await response.json();
//             throw new Error(responseData.error);
//           }

//           // Actualiza los datos en el estado global y el localStorage
//           setStore({
//             userEmail: email,
//             userName: name,
//             userSurname: surname,
//             userPhone: phone,
//           });
//           localStorage.setItem("userEmail", email);
//           localStorage.setItem("userName", name);
//           localStorage.setItem("userSurname", surname);
//           localStorage.setItem("userPhone", phone);

//           toast.success("Detalles personales actualizados exitosamente");
//         } catch (error) {
//           console.error("Error al actualizar detalles personales:", error);
//           toast.error("Error al actualizar detalles personales");
//         }
//       },
//       updatePassword: async (password) => {
//         const store = getStore();
//         const { userId, token } = store;

//         try {
//           const response = await fetch(
//             `${config.hostname}/users/${userId}/password`,
//             {
//               method: "PUT",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({ password }),
//             }
//           );

//           if (!response.ok) {
//             const responseData = await response.json();
//             throw new Error(responseData.error);
//           }

//           toast.success("Contraseña actualizada exitosamente");
//         } catch (error) {
//           console.error("Error al actualizar la contraseña:", error);
//           toast.error("Error al actualizar la contraseña");
//         }
//       },
//       // getVideosVlog: async () => {
//       //   try {
//       //     const response = await fetch(`${config.hostname}/api/videos`);
//       //     if (!response.ok) {
//       //       throw new Error("Error fetching videos");
//       //     }
//       //     const data = await response.json();
//       //     console.log("Fetched videos:", data);  // Confirma que los datos son correctos
//       //     setStore({ videos: data });
//       //   } catch (error) {
//       //     console.error("Error fetching videos:", error);
//       //   }
//       // },
//     //   getVideosVlog: async () => {
//     //     try {
//     //         const response = await fetch(`${config.hostname}/api/videos`);
//     //         if (!response.ok) {
//     //             throw new Error("Error fetching videos");
//     //         }
//     //         let data = await response.json();
//     //         console.log("Fetched videos:", data);  // Confirma que los datos son correctos
    
//     //         // Asegúrate de que cada video tiene todas las propiedades necesarias
//     //         data = data.map(video => ({
//     //             ...video,
//     //             favorites_count: video.favorites_count || 0,
//     //             comments_count: video.comments_count || 0,
//     //             likes_count: video.likes_count || 0
//     //         }));
    
//     //         setStore({ videos: data });
//     //     } catch (error) {
//     //         console.error("Error fetching videos:", error);
//     //     }
//     // },
//     // getVideosVlog: async () => {
//     //   try {
//     //     const response = await fetch(`${config.hostname}/api/videos`);
    
//     //     if (!response.ok) {
//     //       throw new Error(`Error fetching videos: ${response.status} ${response.statusText}`); // Error más específico
//     //     }
    
//     //     let data = await response.json();
//     //     console.log("Fetched videos:", data); 
    
//     //     data = data.map(video => ({
//     //       ...video,
//     //       favorites_count: video.favorites_count || 0,
//     //       comments_count: video.comments_count || 0,
//     //       likes_count: parseInt(video.likes_count) || 0 // Validar y convertir a número
//     //     }));
    
//     //     setStore({ videos: data });
//     //   } catch (error) {
//     //     console.error("Error fetching videos:", error.message); // Registrar el mensaje de error
//     //   }
//     // },
//     getVideosVlog: async () => {
//       try {
//         const response = await fetch(`${config.hostname}/api/videos`);
//         if (!response.ok) {
//           throw new Error("Error fetching videos");
//         }
//         let data = await response.json();
//         // console.log("Fetched videos:", data);  // Confirmamos que los datos son correctos

//         // Aseguramos que cada video tiene todas las propiedades necesarias
//         data = data.map(video => ({
//           ...video,
//           favorites_count: video.favorites_count || 0,
//           comments_count: video.comments_count || 0,
//           likes_count: video.likes_count || 0
//         }));

//         setStore({ videos: data, isLoading: false }); // Actualizamos el estado de carga
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         setStore({ isLoading: false }); // En caso de error, también actualizamos el estado de carga
//       }
//     },
//       likeVideo: async (videoId) => {
//         const store = getStore();
//         const { token } = store;
//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}/like`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Error liking video");
//           }
//           const data = await response.json();
//           console.log(data.message);
//         } catch (error) {
//           console.error("Error liking video:", error);
//         }
//       },
//       unlikeVideo: async (videoId) => {
//         const store = getStore();
//         const { token } = store;
//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}/like`,
//             {
//               method: "DELETE",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Error unliking video");
//           }
//           const data = await response.json();
//           console.log(data.message);
//         } catch (error) {
//           console.error("Error unliking video:", error);
//         }
//       },
//       getComments: async (videoId) => {
//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}/comments`
//           );
//           if (!response.ok) {
//             throw new Error("Error fetching comments");
//           }
//           const data = await response.json();
//           setStore({ comments: data });
//         } catch (error) {
//           console.error("Error fetching comments:", error);
//         }
//       },
//       addComment: async (videoId, text) => {
//         const store = getStore();
//         const { token } = store;
//         console.log("addComment called with:", { videoId, text, token });
//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}/comment`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({ text }),
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Error adding comment");
//           }
//           const data = await response.json();
//           console.log("Comment added:", data.message);
//           getActions().getComments(videoId); // Refresh comments
//         } catch (error) {
//           console.error("Error adding comment:", error);
//         }
//       },

//       addLike: async (videoId) => {
//         const store = getStore();
//         const actions = getActions(); // Obtén las acciones aquí
//         const { token } = store;
//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}/like`,
//             {
//               method: "POST",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (response.ok) {
//             console.log("Like added successfully");
//             actions.getVideos(); // Refrescar los datos del video con el nuevo conteo de likes
//           } else {
//             console.error(await response.json());
//           }
//         } catch (error) {
//           console.error("Error liking video:", error);
//         }
//       },
//       addFavorite: async (videoId) => {
//         const store = getStore();
//         const { token } = store;
//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}/favorite`,
//             {
//               method: "POST",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (response.ok) {
//             console.log("Favorite added successfully");
//           } else {
//             console.error(await response.json());
//           }
//         } catch (error) {
//           console.error("Error adding favorite:", error);
//         }
//       },

//       // SHARED DATA - INICIO
//       getVideosSharedData: async () => {
//         try {
//           const response = await fetch(`${config.hostname}/api/videos`);
//           if (!response.ok) {
//             throw new Error("Error fetching videos");
//           }
//           const data = await response.json();
//           setStore({ videos: data });
//         } catch (error) {
//           console.error("Error fetching videos:", error);
//           toast.error("Error al obtener videos");
//         }
//       },
//       saveRecipeSharedData: async (recipeData) => {
//         const store = getStore();
//         const { token, userId } = store;

//         const formData = new FormData();
//         formData.append("title", recipeData.title);
//         formData.append("description", recipeData.description);
//         formData.append("videoFile", recipeData.videoFile);
//         formData.append("duration", recipeData.duration);
//         formData.append("user_id", userId);
//         formData.append("ingredientsPart1", recipeData.ingredientsPart1);
//         formData.append("ingredientsPart2", recipeData.ingredientsPart2);

//         try {
//           const response = await fetch(`${config.hostname}/api/videos`, {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             body: formData,
//           });
//           if (!response.ok) {
//             throw new Error("Error saving recipe");
//           }
//           const data = await response.json();
//           return data;
//         } catch (error) {
//           console.error("Error saving recipe:", error);
//           toast.error("Error al guardar la receta");
//         }
//       },
//       deleteVideoSharedData: async (videoId) => {
//         const store = getStore();
//         const { token } = store;

//         try {
//           const response = await fetch(
//             `${config.hostname}/api/videos/${videoId}`,
//             {
//               method: "DELETE",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Error deleting video");
//           }
//           await response.json();
//           toast.success("Video eliminado correctamente");
//           getActions().getVideos(); // Refrescar la lista de videos
//         } catch (error) {
//           console.error("Error deleting video:", error);
//           toast.error("Error al eliminar el video");
//         }
//       },
//       getCategoriesSharedData: async () => {
//         try {
//           const response = await fetch(`${config.hostname}/api/categories`);
//           if (!response.ok) {
//             throw new Error("Error fetching categories");
//           }
//           const data = await response.json();
//           setStore({ categories: data });
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//         }
//       },
//       // SHARED DATA - FIN
//       // VLOG DETAILS - INICIO
//       getVideoVlogDetails: async (videoId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/videoVlogDetails`);
//           if (!response.ok) {
//             throw new Error('Error fetching video');
//           }
//           const data = await response.json();
//           setStore({ videoDetails: data });
//         } catch (error) {
//           console.error('Error fetching video:', error);
//         }
//       },
//       getCommentsVlogDetails: async (videoId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/commentsVlogDetails`);
//           if (!response.ok) {
//             throw new Error('Error fetching comments');
//           }
//           const data = await response.json();
//           setStore({ comments: data });
//         } catch (error) {
//           console.error('Error fetching comments:', error);
//         }
//       },
//       getFavoritesVlogDetails: async (videoId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/favoriteVlogDetails`);
//           if (!response.ok) {
//             throw new Error('Error fetching favorites');
//           }
//           const data = await response.json();
//           setStore({ favorites: data });
//         } catch (error) {
//           console.error('Error fetching favorites:', error);
//         }
//       },
//       getLikesVlogDetails: async (videoId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/likeVlogDetails`);
//           if (!response.ok) {
//             throw new Error('Error fetching likes');
//           }
//           const data = await response.json();
//           setStore({ likes: data });
//         } catch (error) {
//           console.error('Error fetching likes:', error);
//         }
//       },
//       addCommentVlogDetails: async (videoId, text, userId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/commentsVlogDetails`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ text, user_id: userId }),
//           });
//           if (!response.ok) {
//             throw new Error('Error adding comment');
//           }
//           getActions().getCommentsVlogDetails(videoId);
//         } catch (error) {
//           console.error('Error adding comment:', error);
//         }
//       },
//       addFavoriteVlogDetails: async (videoId, userId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/favoriteVlogDetails`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ user_id: userId }),
//           });
//           if (!response.ok) {
//             throw new Error('Error adding favorite');
//           }
//           getActions().getFavoritesVlogDetails(videoId);
//         } catch (error) {
//           console.error('Error adding favorite:', error);
//         }
//       },
//       removeFavoriteVlogDetails: async (videoId, userId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/favoriteVlogDetails`, {
//             method: 'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ user_id: userId }),
//           });
//           if (!response.ok) {
//             throw new Error('Error removing favorite');
//           }
//           getActions().getFavoritesVlogDetails(videoId);
//         } catch (error) {
//           console.error('Error removing favorite:', error);
//         }
//       },
//       addLikeVlogDetails: async (videoId, userId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/likeVlogDetails`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ user_id: userId }),
//           });
//           if (!response.ok) {
//             throw new Error('Error adding like');
//           }
//           getActions().getLikesVlogDetails(videoId);
//         } catch (error) {
//           console.error('Error adding like:', error);
//         }
//       },
//       removeLikeVlogDetails: async (videoId, userId) => {
//         try {
//           const response = await fetch(`/api/videos/${videoId}/likeVlogDetails`, {
//             method: 'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ user_id: userId }),
//           });
//           if (!response.ok) {
//             throw new Error('Error removing like');
//           }
//           getActions().getLikesVlogDetails(videoId);
//         } catch (error) {
//           console.error('Error removing like:', error);
//         }
//       },
//       // VLOG DETAILS - FIN
//       logout: () => {
//         // Eliminar todos los datos del localStorage
//         localStorage.clear();

//         // Limpia el estado global
//         setStore({
//           token: null,
//           userId: null,
//           userEmail: null,
//           userName: null,
//           userSurname: null,
//           userPhone: null,
//           is_active: false,
//         });

//         // Redirigir al usuario a la página de inicio de sesión
//         window.location.href = "http://localhost:5173/";
//       },

//       checkToken: () => {
//         const store = getStore();
//         const token = store.token;
//         if (token) {
//           const decodedToken = jwtDecode(token);
//           const currentTime = Date.now() / 1000;

//           if (decodedToken.exp < currentTime) {
//             getActions().logout();
//           }
//         }
//       },

//       initializeApp: () => {
//         initializeStore();
//         resetInactivityTimer(); // Inicia el temporizador de inactividad
//       },

//       // Use getActions to call a function within a function
//       exampleFunction: () => {
//         getActions().changeColor(0, "green");
//       },
//       loadSomeData: () => {
//         /**
//           fetch().then().then(data => setStore({ "foo": data.bar }))
//         */
//       },
//       changeColor: (index, color) => {
//         //get the store
//         const store = getStore();

//         //we have to loop the entire demo array to look for the respective index
//         //and change its color
//         const demo = store.demo.map((elm, i) => {
//           if (i === index) elm.background = color;
//           return elm;
//         });

//         //reset the global store
//         setStore({ demo: demo });
//       },
//     },
//   };
// };

// export default getState;
