import config from "../../../config";

const vlogActions = (getStore, getActions, setStore) => ({
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
  }
});

export default vlogActions;
