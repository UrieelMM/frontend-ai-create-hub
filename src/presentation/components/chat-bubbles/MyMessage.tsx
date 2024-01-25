
interface Props {
    message: string
}

export const MyMessage = ({ message }: Props) => {
    return (
        <div className="col-start-7 col-end-12 rounded-lg">
            <div className="flex items-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    F
                </div>
                <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
                    <div>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    )
}