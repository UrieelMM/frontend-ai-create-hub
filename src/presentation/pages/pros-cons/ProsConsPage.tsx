import { useState } from "react"
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { prosConsCase } from "../../../core/use-cases";


interface Message {
  message: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (message: string) => {
    setIsLoading(true);
    setMessages([...messages, { message, isGpt: false }]);
    const data = await prosConsCase(message);
    setIsLoading(false);

    if(!data.ok) return;
    setMessages((prev) => [...prev, { message: data.content, isGpt: true }]);

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="¿Qué deseas que compare?" />
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

      <TextMessageBox
        onSendMessage={handlePostMessage}
        placeholder="Envía un mensaje"
        disableCorrections={true} />
    </div>
  )
}