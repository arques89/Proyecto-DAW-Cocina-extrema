// src/actions/vlogActions.js
import config from "../../../config";

const vlogActions = ({ getStore, setStore }) => {
  const getVideosVlog = async () => {
    try {
      const response = await fetch(`${config.hostname}/api/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching videos");
      }
      const data = await response.json();
      setStore({ videos: data });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return {
    getVideosVlog,
  };
};

export default vlogActions;
