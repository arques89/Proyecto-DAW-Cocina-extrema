import config from "../../../config";

const bankDataActions = (getStore, getActions, setStore) => ({
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
  }
});

export default bankDataActions;
