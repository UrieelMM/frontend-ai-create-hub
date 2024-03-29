import { useState, useEffect, useRef } from "react";
import {
  GptMessages,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import {
  createThreadCase,
  getListMessagesCase,
  postQuestionCase,
} from "../../../core/use-cases";

interface Message {
  message: string;
  isGpt: boolean;
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>("");

  const messagesRef = useRef<HTMLDivElement | null>(null);

  //Obtener el threadId y si no existe crear uno

  useEffect(() => {
    const threadId = localStorage.getItem("threadId");
    if (threadId) {
      setThreadId(threadId);
    } else {
      createThreadCase().then((id) => {
        setThreadId(id);
        localStorage.setItem("threadId", id);
      });
    }
  }, []);

  //get list messages when page load
  const getListMessages = async () => {
    try {
      const replies = await getListMessagesCase(threadId);

      if (!Array.isArray(replies)) return;

      for (const reply of replies) {
        for (const message of reply.content) {
          setMessages((prev) => [
            ...prev,
            {
              message: message,
              isGpt: reply.role === "assistant",
              info: reply,
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!threadId) return;
    getListMessages();
  }, [threadId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handlePostMessage = async (message: string) => {
    if (!threadId) return;

    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setIsLoading(true);
    setMessages((prev) => [...prev, { message: message, isGpt: false }]);

    //TODO: USE CASE
    const timeoutId = setTimeout(() => {
      console.warn(
        "La API tardó demasiado en responder. Recargando la página..."
      );
      // Recarga la página después de 40 segundos si no hay respuesta
      getListMessages();
    }, 50000);

    try {
      // TODO: USE CASE
      const replies = await postQuestionCase(threadId, message);

      // Limpiar mensajes
      setMessages([]);

      for (const reply of replies) {
        for (const message of reply.content) {
          setMessages((prev) => [
            ...prev,
            {
              message: message,
              isGpt: reply.role === "assistant",
              info: reply,
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error al llamar a la API", error);
      getListMessages();
    } finally {
      setIsLoading(false);
      // Limpiar el temporizador si la respuesta llega antes de los 40 segundos
      clearTimeout(timeoutId);
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages message="¡Hola! Soy tu asistente de estudio. Puedo ayudarte con cualquier duda que tengas respecto a tus materias." />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessages key={index} message={message.message} />
            ) : (
              <MyMessage key={index} message={message.message} />
            )
          )}
          {isLoading && (
            <div className="fade-in col-start-1 col-end-12">
              <TypingLoader />
            </div>
          )}
          <div ref={messagesRef} />
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePostMessage}
        placeholder="Envía un mensaje"
        disableCorrections
      />
    </div>
  );
};
