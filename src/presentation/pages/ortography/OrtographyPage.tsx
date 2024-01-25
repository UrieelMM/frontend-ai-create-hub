import { useState } from "react";
import {
  GptMessages,
  GptMessagesOrthography,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { orthographyCase } from "../../../core/use-cases";

interface Message {
  message: string;
  isGpt: boolean;
  info?: {
    errors: string[];
    userScore: number;
    message: string;
  }
}

export const OrtographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { message: text, isGpt: false }]);

    const textoConComillas = '"' + text + '"';

    const data = await orthographyCase(textoConComillas)
    if(!data.userScore || !data.message || !data.errors){
      console.log("Ha ocurrido un error")  ;
    }

    if (!data.ok) {
      setMessages((prev) => [...prev, { message: "No se pudo procesar la solicitud", isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, {
        message: data.message, isGpt: true, info: {
          errors: data.errors,
          message: data.message,
          userScore: data.userScore
        }
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="Hola, puedo ayudarte a corregir tu ortografía." />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessagesOrthography
                key={index}
                userScore={message.info!.userScore}
                message={message.info!.message}
                errors={message.info!.errors}
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
        disableCorrections={true} />
    </div>
  );
};
