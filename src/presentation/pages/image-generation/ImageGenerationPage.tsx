import { useState } from "react";
import {
  GptMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessagesImage,
} from "../../components";
import { imageGenerationCase } from "../../../core/use-cases";
interface Message {
  message: string;
  isGpt: boolean;
  info?: {
    url: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { message: message, isGpt: false }]);

    //TODO: USE CASE
    const imageInfo = await imageGenerationCase(message);
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
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="Puedo generar imágenes. Solo descríbeme lo que deseas que genere, por ejemplo, un paisaje montañoso. Haré mi mejor esfuerzo." />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessagesImage
                key={index}
                message={message.message}
                imageUrl={message.info!.url}
                alt={message.info!.alt}
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
  );
};
