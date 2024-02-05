
type GeneratedImage = ImageGenerationCase | null;

interface ImageGenerationCase {
    url: string;
    alt: string;
}

export const imageVariationCase = async (originalImage: string): Promise<GeneratedImage> => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_GPT_SERVER}/image-variation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                baseImage: originalImage
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