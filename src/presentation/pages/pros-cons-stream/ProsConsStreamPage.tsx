import { useRef, useState } from "react"
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsStreamGeneratorCase } from "../../../core/use-cases";

interface Message {
  message: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {

  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (message: string) => {

    if (isRunning.current){
      abortController.current.abort();
      abortController.current = new AbortController();
    }
    
    setIsLoading(true);
    isRunning.current = true;

    setMessages((prev) => [...prev, { message: message, isGpt: false }]);


    //GENERATOR WAY
    const stream = prosConsStreamGeneratorCase(message, abortController.current.signal);
    setIsLoading(false);
    setMessages((messages) => [...messages, { message: "", isGpt: true }]);

    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].message = text;
        return newMessages;
      })
    }

    isRunning.current = false;

    // TRADITIONAL WAY
    // const reader = await prosConsStreamCase(message);
    // setIsLoading(false);
    // if (!reader) return
    // const decoder = new TextDecoder();
    // let text = "";
    // setMessages((messages) => [...messages, { message: text, isGpt: true }]);
    // // eslint-disable-next-line no-constant-condition
    // while(true){
    //   const { done, value } = await reader.read();
    //   if (done) break;

    //   const decoderChunk = decoder.decode(value, { stream: true });
    //   text += decoderChunk;

    //   setMessages((messages) => {
    //     const newMessages = [...messages];
    //     newMessages[newMessages.length - 1].message = text;
    //     return newMessages;
    //   })
    // }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="¿Qué deseas que compare?"  />
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