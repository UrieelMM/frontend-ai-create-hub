import Markdown from "react-markdown"

interface Props {
    message: string
}

export const GptMessages = ({message}: Props) => {
  return (
    <div className="col-start-1 col-end-10 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 rounded-xl">
                <Markdown>
                    {message}
                </Markdown>
            </div>
        </div>
    </div>
  )
}