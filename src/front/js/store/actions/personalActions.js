import config from "../../../config";

const personalActions = (getStore, getActions, setStore) => ({
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
      const response = await fetch(`${config.hostname}/personaldata/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`,
        },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error("Error updating password");
      await response.json();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  },
});

export default personalActions;
