import { useState } from "react"
import { GptMessages, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessagesAudio } from "../../components";
import { textToAudioCase } from "../../../core/use-cases";

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  type: "audio";
  audio: string;
}

type Message = TextMessage | AudioMessage;

const displaimer = "Ecribe el texto que deseas convertir a audio y elige una de las voces disponibles. Todo el audio es generado por IA*."

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (message: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: message, isGpt: false, type: "text" }]);

    //TODO: USE CASE
    const data = await textToAudioCase(message, selectedVoice);
    setIsLoading(false);

    if (!data.audioUrl) return;
    setMessages((prev) => [...prev, { text: `${selectedVoice} - ${data.messageToAudio}`, isGpt: true, type: "audio", audio: data.audioUrl }]);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message={displaimer} />
          {
            messages.map((message, index) => (
              message.isGpt
                ? message.type === "audio"
                  ? (
                    <GptMessagesAudio key={index} message={message.text} audio={message.audio} />
                  ) : (
                    <GptMessages key={index} message={message.text} />
                  )
                : <MyMessage key={index} message={message.text} />
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
        options={voices} />
    </div>
  )
}