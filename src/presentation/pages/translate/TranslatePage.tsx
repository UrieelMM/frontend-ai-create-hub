import { useState } from "react"
import { GptMessages, MyMessage, TypingLoader, TextMessageBoxSelect } from "../../components";
import { translateCase } from "../../../core/use-cases";

interface Message {
  message: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
  { id: "español", text: "Español" },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (message: string, selectedOption: string) => {
    setIsLoading(true);
    const newMessage = `Traduce: "${message}" al idioma ${selectedOption}`; 

    setMessages([...messages, { message: newMessage, isGpt: false }]);

    //TODO: USE CASE
    const data = await translateCase(message, selectedOption);
    if(!data.ok){
      return alert("No se pudo traducir el mensaje`" + message + "`");
    }

    setMessages((prev) => [...prev, { message: data.message, isGpt: true }]);
    setIsLoading(false);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="Hola, ¿Qué deseas traducir?" />
          {
            messages.map((message, index) => (
              message.isGpt
                ? <GptMessages key={index} message={message.message} />
                : <MyMessage key={index} message={message.message} />
            ))
          }
          {
            isLoading && (
              <div className="fade-in col-start-1 col-end-12">
                <TypingLoader />
              </div>
            )
          }
        </div>
      </div>

      <TextMessageBoxSelect
        onSendMessage={handlePostMessage}
        placeholder="Envía un mensaje"
        options={languages}
      />
    </div>
  )
}