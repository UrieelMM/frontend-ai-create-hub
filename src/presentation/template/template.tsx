import { useState } from "react"
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../components"

interface Message {
  message: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = (message: string) => {
    setIsLoading(true);
    setMessages([...messages, { message, isGpt: false }]);

    //TODO: USE CASE
    setIsLoading(false);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="Hola, Soy Gpt" />
          {
            messages.map((message, index) => (
              message.isGpt
                ? <GptMessages key={index} message="Hola, Soy Gpt" />
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