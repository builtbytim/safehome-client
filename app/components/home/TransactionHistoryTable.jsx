import Image from "next/image";
import ArrowDownGreen from "../../../assets/images/icons/arrow-down.svg";
import ArrowUpRed from "../../../assets/images/icons/arrow-up.svg";
import { useQuery } from "react-query";
import { createFetcher, levelToColor } from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { NumericFormat } from "react-number-format";
import ErrorMessageView from "../ErrorMessageView";
import LoadingView from "../LoadingView";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import cn from "classnames";

function TransactionHistoryTable({ token, params, setPageFilter }) {
  const { isLoading, isError, refetch, data, isSuccess, error } = useQuery({
    queryKey: [queryKeys.getTransactions, token, params],
    queryFn: createFetcher({
      url: config.apiPaths.getTransactions,
      method: "GET",
      auth: token,
      surfix: `?page=${params.page}&limit=${params.limit}&type=${params.type}&startDate=${params.startDate}&endDate=${params.endDate}&fromLast=${params.fromLast}`,
    }),

    enabled: !!token,
  });

  const txTypeColorMap = {
    topup: "success",
    withdrawal: "error",
    credit: "success",
    debit: "error",
  };

  const txStatusColorMap = {
    successful: "success",
    failed: "error",
    pending: "warning",
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorMessageView refetch={refetch} message={error.message} />;
  }

  if (isSuccess && data && data.items && data.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-6 space-y-4">
        <p className="text-[#C4C4C4]">No transactions yet</p>
      </div>
    );
  }

  if (isSuccess && data)
    return (
      <section>
        {/* For Mobile */}

        <div className=" md:hidden overflow-y-auto overflow-x-scroll max-w-full max-h-[482px]">
          {data.items.map((v, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-start space-y-2 border-b border-[#e2e2e2] py-4"
            >
              <div className="flex flex-row justify-between items-center w-full  overflow-x-auto max-w-full no-scrollbar">
                <div className="flex max-w-[50%] flex-row justify-center items-center space-x-2 truncate">
                  <div
                    className={
                      " flex-1 p-2 rounded-full border border-transparent " +
                      cn({
                        "bg-[#E5FFE5]": v.direction === "incoming",
                        "bg-[#FFE5E5]": v.direction === "outgoing",
                      })
                    }
                  >
                    <Image
                      src={
                        v.direction === "incoming" ? ArrowDownGreen : ArrowUpRed
                      }
                      alt="arrow down"
                      width="24"
                      height="24"
                      className="object-contain w-[24px] h-[24px] "
                    />
                  </div>

                  <div className="flex  flex-col justify-center items-start space-y-1">
                    <span className="text-[--color-brand-2] truncate text-sm">
                      {shortenTextToEllipses(v.reference, 16)}
                    </span>
                    <span className=" text-sm capitalize">
                      <span className={levelToColor(txTypeColorMap[v.type])}>
                        {v.type}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex px-2 flex-col justify-center items-end space-y-1">
                  <span className="text-[--text-secondary] font-semibold text-sm">
                    <NumericFormat
                      value={v.amount}
                      prefix="₦ "
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </span>
                  <span className="text-[--placeholder] text-xs">
                    {new Date(v.createdAt * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* For Desktops  */}
        <div className="hidden md:block overflow-auto max-h-[482px] ">
          <table className="w-full  table text-[--text-secondary]  ">
            <thead className="w-full uppercase font-semibold">
              <tr className="table-row w-full ">
                <th className="pl-8 py-4 text-left  whitespace-nowrap font-semibold">
                  {" "}
                  Date & Time{" "}
                </th>
                <th className=" text-left  px-6 whitespace-nowrap font-semibold">
                  Transaction Type
                </th>
                <th className=" text-left  px-6 whitespace-nowrap font-semibold">
                  Amount
                </th>
                <th className=" text-left  px-6 whitespace-nowrap font-semibold">
                  Reference{" "}
                </th>

                <th className=" text-left  px-6 whitespace-nowrap font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data.items.map((v, i) => (
                <tr
                  key={i}
                  className="table-row text-left text-sm odd:bg-[--b1]"
                >
                  <td className="py-4 text-left pl-8">
                    {new Date(v.createdAt * 1000).toLocaleString()}
                  </td>
                  <td className="text-left px-6 capitalize font-medium">
                    <span className={levelToColor(txTypeColorMap[v.type])}>
                      {v.type}
                    </span>
                  </td>
                  <td className="text-left px-6">
                    <NumericFormat
                      value={v.amount}
                      prefix="₦ "
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </td>
                  <td className="text-left px-6">{v.reference}</td>

                  <td className="text-left  font-medium capitalize px-6">
                    <span className={levelToColor(txStatusColorMap[v.status])}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isSuccess && data && data.items && data.items.length > 0 && (
          <div className="space-x-4 flex flex-row items-center justify-end pt-8 px-8">
            {data.numPages > 0 && (
              <span className="text-[--text-secondary] text-xs">
                Page {data.page} of {data.numPages}
              </span>
            )}

            {data.hasPrev && (
              <div
                onClick={() => {
                  setPageFilter(params.page - 1);
                }}
                className="text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--lines] flex flex-row justify-center items-center"
              >
                <BsChevronLeft className="inline-block mr-1" />

                <span>Prev</span>
              </div>
            )}

            {data.hasNext && (
              <div
                onClick={() => {
                  setPageFilter(params.page + 1);
                }}
                className="text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--lines] flex flex-row justify-center items-center"
              >
                <span>Next</span>
                <BsChevronRight className="inline-block ml-1" />
              </div>
            )}
          </div>
        )}
      </section>
    );
}

export default TransactionHistoryTable;

function shortenTextToEllipses(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + "...";
}
