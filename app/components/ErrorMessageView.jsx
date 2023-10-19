function ErrorMessageView({
  message = "An error occurred",
  buttonText = "Retry",
  refetch,
}) {
  function handleRefetch() {
    if (typeof refetch === "function") {
      refetch();
    }
  }
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <p className="text-[#C4C4C4] text-center">{message}</p>
      <button
        onClick={handleRefetch}
        className="bg-[#FF5B5B] hover:bg-[#FF2B5B] transitioning text-white px-4 py-2 rounded-full"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ErrorMessageView;
