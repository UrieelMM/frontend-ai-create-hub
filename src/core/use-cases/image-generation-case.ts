
type GeneratedImage = ImageGenerationCase | null;

interface ImageGenerationCase {
    url: string;
    alt: string;
}

export const imageGenerationCase = async (prompt: string, originalImage?: string, maskImage?: string): Promise<GeneratedImage> => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_GPT_SERVER}/image-generation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage
            })
        });

        const { url, revised_prompt } = await response.json();

        return {
            url,
            alt: revised_prompt
        }
    } catch (error) {
        console.log(error);
        return null
    }
}   