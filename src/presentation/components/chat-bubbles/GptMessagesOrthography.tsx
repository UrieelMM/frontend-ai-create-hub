
interface Props {
    userScore?: number;
    message: string;
    errors?: string[];
}

export const GptMessagesOrthography = ({ userScore, message, errors }: Props) => {
    return (
        <div className="col-start-1 col-end-10 rounded-lg">
            <div className="flex flex-row items-start">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                    G
                </div>
                <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 rounded-xl">
                    <h3 className="text-3xl">Puntaje: {userScore}</h3>
                    <p>{message}</p>
                    {
                        errors && errors.length > 0 && (
                            <div>
                                <h3>Errores</h3>
                                <ul>
                                    {errors.map((error, index) => (
                                        <li className="mb-1" key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        ) 
                    }
                </div>
            </div>
        </div>
    )
}