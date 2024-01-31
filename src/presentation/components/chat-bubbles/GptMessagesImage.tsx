interface Props {
  message: string;
  imageUrl: string;
  alt: string;
}

export const GptMessagesImage = ({ message, imageUrl, alt }: Props) => {
  return (
    <div className="col-start-1 col-end-10 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          AI
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 px-4 rounded-xl">
          <span>{message}</span>
          <img
            className="mt-2 rounded-xl w-96 h-96 object-cover"
            src={imageUrl}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
};
