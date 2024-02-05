// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetListMessagesResponse } from "../../../interfaces";

export const getListMessagesCase = async (threadId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_IA_ASSISTANT_SERVER}/list-messages`, {
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