import { QuestionAssistantResponse } from "../../../interfaces";


export const postQuestionCase = async (threadId: string, question: string) => {
    try {
        const response = await fetch(`https://ai-create-hub-877e33d37582.herokuapp.com/ia-assistant/user-question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                threadId,
                question,
            }),
        });

        const replies = await response.json() as QuestionAssistantResponse[];

        return replies;

    } catch (error) {
        console.log(error);
        throw new Error("Error posting question.");
    }
}