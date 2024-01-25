
export const prosConsStreamCase = async (prompt: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_API_GPT_SERVER}/pros-cons-discusser-stream`, {
            method: 'POST',
            body: JSON.stringify({ prompt }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!resp.ok) throw new Error('No se puedo procesar la solicitud');

        const reader = resp.body?.getReader();
        if(!reader) throw new Error('No se puedo generar el reader');

        return reader;

    } catch (error) {
        return null
    }
}