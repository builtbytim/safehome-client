import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import cn from "classnames";

function Pagination({ data, setPage, isFetching, isSuccess, isLoading }) {
  return (
    <div>
      {isSuccess && data && data.items && data.items.length > 0 && (
        <div className="space-x-3 md:space-x-4 flex flex-row items-center justify-end pt-4 px-2 pb-4">
          {data.numPages > 0 && (
            <span className="text-[--text-secondary] text-xs">
              Page {data.page} of {data.numPages}
            </span>
          )}

          {data.hasPrev && (
            <button
              type="button"
              disabled={isFetching}
              onClick={() => {
                if (isFetching) return;
                setPage(data.page - 1);
              }}
              className={
                "text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--b1] flex flex-row justify-center items-center space-x-1 disabled:opacity-40 " +
                cn({
                  " pointer-events-none opacity-50 ": isFetching,
                })
              }
            >
              <BsChevronLeft className="inline-block  self-center" />

              <span className="self-center">Prev</span>
            </button>
          )}

          {data.hasNext && (
            <button
              disabled={isFetching}
              type="button"
              onClick={() => {
                if (isFetching) return;

                setPage(data.page + 1);
              }}
              className={
                "text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--b1] flex flex-row justify-center items-center space-x-1 disabled:opacity-40 " +
                cn({
                  " pointer-events-none  ": isFetching,
                })
              }
            >
              <span className="self-center">Next</span>
              <BsChevronRight className="inline-block  self-center" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
