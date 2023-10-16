import { BiError, BiRefresh } from "react-icons/bi";
import Spinner from "./Spinner";

function MiniFetchStatusIndicator({
  show = true,
  isSuccess,
  isLoading,
  isFetching,
  isError,
  successText = "",
  errorText = "Fetch failed",
  retry = null,
}) {
  if (!show) return null;

  return (
    <div className="self-start flex flex-row justify-start items-start">
      {isFetching && !isLoading ? (
        <Spinner size="tiny" />
      ) : isSuccess ? (
        <span className="text-xs text-[--placeholder]">{successText}</span>
      ) : (
        isError && (
          <div className="space-x-2 text-base text-[--text-danger] flex flex-row justify-start items-center">
            <BiError className="  self-center" />
            <span className=" text-xs self-center">{errorText}</span>

            {retry && (
              <button className="self-center" onClick={retry}>
                <BiRefresh className="" />
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default MiniFetchStatusIndicator;
