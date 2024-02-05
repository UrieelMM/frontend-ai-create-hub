/* eslint-disable no-empty */


export const createThreadCase = async () => {
    try {
        const response = await fetch(`https://ai-create-hub-877e33d37582.herokuapp.com/ia-assistant/create-thread`, {
            method: "POST",
        });

        const {id} = await response.json() as {id: string};

        return id;

    } catch (error) {
        throw new Error("Error creating thread.");
    }
}