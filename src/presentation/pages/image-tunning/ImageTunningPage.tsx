import { useState } from "react";
import {
  GptMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessagesSelectableImage,
} from "../../components";
import {
  imageGenerationCase,
  imageVariationCase,
} from "../../../core/use-cases";
import { toast } from "sonner";

interface Message {
  message: string;
  isGpt: boolean;
  info?: {
    url: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    originalImage: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const response = await imageVariationCase(
      originalImageAndMask.originalImage!
    );
    setIsLoading(false);

    if (!response) {
      toast.error("No pude generar la imagen");
      return setMessages((prev) => [
        ...prev,
        { message: "No pude generar la imagen", isGpt: true },
      ]);
    }
    setMessages((prev) => [
      ...prev,
      {
        message: "Variación de la imagen",
        isGpt: true,
        info: { url: response.url, alt: response.alt },
      },
    ]);
  };

  const handlePostMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { message: message, isGpt: false }]);

    const {originalImage, mask} = originalImageAndMask;

    //TODO: USE CASE
    const imageInfo = await imageGenerationCase(message, originalImage, mask);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [
        ...prev,
        { message: "No pude generar la imagen", isGpt: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        message: message,
        isGpt: true,
        info: { url: imageInfo.url, alt: imageInfo.alt },
      },
    ]);
  };

  return (
    <>
      {originalImageAndMask.originalImage && (
        <div className="flex fixed flex-col justify-center items-center top-10 right-10 z-10 fade-in">
          <span>Editando</span>
          <img
            src={originalImageAndMask.mask ?? originalImageAndMask.originalImage}
            alt="Imagen original"
            className="w-36 h-36 border rounded-xl object-contain"
          />
          <button className="btn-primary mt-2" onClick={handleVariation}>
            Generar variacion
          </button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessages message="Puedo generar imágenes. Solo descríbeme lo que deseas que genere, por ejemplo, un paisaje montañoso. Haré mi mejor esfuerzo." />
            {messages.map((message, index) =>
              message.isGpt ? (
                //GptMessagesImage or GptMessagesSelectableImage
                <GptMessagesSelectableImage
                  key={index}
                  message={message.message}
                  imageUrl={message.info!.url}
                  alt={message.info!.alt}
                  onImageSelected={(maskImageUrl) =>
                    setOriginalImageAndMask({
                      originalImage: message.info?.url,
                      mask: maskImageUrl,
                    })
                  }
                />
              ) : (
                <MyMessage key={index} message={message.message} />
              )
            )}
            {isLoading && (
              <div className="fade-in col-start-1 col-end-12">
                <TypingLoader />
              </div>
            )}
          </div>
        </div>

        <TextMessageBox
          onSendMessage={handlePostMessage}
          placeholder="Envía un mensaje"
          disableCorrections={true}
        />
      </div>
    </>
  );
};
