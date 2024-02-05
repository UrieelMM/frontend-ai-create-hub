import { FormEvent, useState } from "react";
import { toast } from 'sonner';

interface Props {
    onSendMessage: (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
}

export const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections }: Props) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!message.trim()) {
            toast.error('Debes escribir un mensaje.')
            return;
        }
        onSendMessage(message);
        setMessage('');
    }

    return (
        <form onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 bg-white w-full px-4 rounded-xl">
            <div className="flex-grow">
                <div className="relative w-full">
                    <input type="text" autoFocus className="flex sm:w-1/4 md:w-full border rounded-xl text-gray-500 focus:outline-none focus:border-cyan-500 p-2"
                        placeholder={placeholder}
                        autoComplete={disableCorrections ? "on" : "off"}
                        autoCorrect={disableCorrections ? "on" : "off"}
                        spellCheck={disableCorrections ? "true" : "false"}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} />
                </div>
            </div>

            <div className="ml-4">
                <button className="w-full sm:w-1/2 md:w-full bg-cyan-500 p-2 rounded-md">
                    <span className="mr-2">Enviar</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </form>
    )
}