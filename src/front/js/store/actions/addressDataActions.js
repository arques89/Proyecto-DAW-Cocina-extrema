import config from "../../../config";

const addressDataActions = (getStore, getActions, setStore) => ({
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
  }
});

export default addressDataActions;
