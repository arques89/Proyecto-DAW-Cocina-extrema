import toast from "react-hot-toast";
import config from "../../../config";

const registerActions = (getStore, getActions, setStore) => {
  return {
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
    }
  };
};

export default registerActions;
