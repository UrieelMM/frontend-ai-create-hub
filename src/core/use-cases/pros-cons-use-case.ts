import type { ProsConsInterface } from "../../interfaces"


export const prosConsCase = async (prompt: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_GPT_SERVER}/pros-cons-discusser`, {
            method: 'POST',
            body: JSON.stringify({ prompt }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resp.ok) {
            const data = await resp.json() as ProsConsInterface
            return {
                ...data,
                ok: true
            }
        } else {
            throw new Error("No se pudo procesar la solicitud")
        }
    } catch (error) {
        return {
            ok: false,
            content: "No se pudo procesar la solicitud"
        }
    }
}