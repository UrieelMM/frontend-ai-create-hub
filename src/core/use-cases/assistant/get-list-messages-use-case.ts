// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetListMessagesResponse } from "../../../interfaces";

export const getListMessagesCase = async (threadId: string) => {
    try {
        const response = await fetch(`https://ai-create-hub-877e33d37582.herokuapp.com/ia-assistant/list-messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                threadId,
            }),
        });
        const listMessages = await response.json() as GetListMessagesResponse | undefined;
        return listMessages;
    } catch (error) {
        console.log(error);
    }
}