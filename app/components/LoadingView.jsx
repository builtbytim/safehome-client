import Spinner from "./Spinner";

function LoadingView() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <Spinner />
      <p className="text-[#C4C4C4]">Loading...</p>
    </div>
  );
}

export default LoadingView;
