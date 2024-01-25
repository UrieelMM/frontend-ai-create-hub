import type { OrthographyInterface } from "../../interfaces"


export const orthographyCase = async (prompt: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_GPT_SERVER}/orthography-check`, {
            method: 'POST',
            body: JSON.stringify({ prompt }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resp.ok) {
            const data = await resp.json() as OrthographyInterface
            return {
                ok: true,
                ...data
            }
        } else {
            throw new Error("No se pudo procesar la solicitud")
        }
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "No se pudo procesar la solicitud"
        }
    }
}