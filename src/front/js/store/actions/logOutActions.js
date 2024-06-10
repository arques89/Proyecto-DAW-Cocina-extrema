const logoutAction = (getStore, getActions, setStore) => ({
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
        user: {},
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userSurname");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userLikes");
      localStorage.removeItem("userFavorites");
      window.location.href = "/"; // Redirigir al usuario a la página de inicio de sesión al cerrar sesión
    }
  });
  
  export default logoutAction;
  