import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string;
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (!message.trim()) return;
    if(!selectedFile) return;
    onSendMessage(message, selectedFile);
    setMessage("");
    setSelectedFile(null);
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 bg-white w-full px-4 rounded-xl"
    >
      <div className="mr-3">
        <button
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
          type="button"
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(e) => setSelectedFile(e.target.files?.item(0))}
          hidden
        />
      </div>
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-cyan-500 p-2"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFile.name.substring(0, 15) + "..."}
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
