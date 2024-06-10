import toast from "react-hot-toast";
import config from "../../../config";

const forgotPasswordActions = (getStore, getActions, setStore) => {
  return {
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
    }
  };
};

export default forgotPasswordActions;
