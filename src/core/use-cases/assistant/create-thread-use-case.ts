/* eslint-disable no-empty */


export const createThreadCase = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_IA_ASSISTANT_SERVER}/create-thread`, {
            method: "POST",
        });

        const {id} = await response.json() as {id: string};

        return id;

    } catch (error) {
        throw new Error("Error creating thread.");
    }
}