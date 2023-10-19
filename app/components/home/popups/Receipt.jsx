"use client";

import { useEffect, useRef, useState } from "react";
import Overlay from "../../Overlay2";
import { ReceiptTopBar } from ".";
import { useSearchParams } from "next/navigation";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { useQuery } from "react-query";
import config from "../../../utils/config";
import { createFetcher, levelToColor } from "../../../utils/fetchUtils";
import queryKeys from "../../../utils/queryKeys";
import ErrorMessageView from "../../ErrorMessageView";
import LoadingView from "../../LoadingView";
import { useDataStore } from "../../../utils/store";
import { NumericFormat } from "react-number-format";
import { useRouter, usePathname } from "next/navigation";

const txStatusColorMap = {
  successful: "success",
  failed: "error",
  pending: "warning",
};

const TransactionReceipt = () => {
  const showReceiptArg = useSearchParams().get("showTx");
  const txRef = useSearchParams().get("txRef");
  const receiptRef = useRef(null);
  const showReceipt = !!showReceiptArg && !!txRef;

  const pathname = usePathname();
  const router = useRouter();

  const token = useDataStore((state) => state.data.token);
  const user = useDataStore((state) => state.data.usr);

  function handleClose() {
    router.push(pathname);
  }

  //   get transaction query

  const { isLoading, isError, data, isSuccess, refetch } = useQuery({
    queryKey: [queryKeys.getTransaction, txRef, token],
    queryFn: createFetcher({
      url: config.apiPaths.getTransaction,
      auth: token,
      method: "GET",
      surfix: `/${txRef}`,
    }),

    enabled: showReceipt && !!token,
  });

  useOutsideClickDetector(receiptRef, handleClose);

  if (!showReceipt) return null;

  return (
    <Overlay z={3}>
      <div
        className="fixed inset-y-0 right-0 w-full md:w-[493px]   bg-white overflow-y-auto shadow"
        ref={receiptRef}
      >
        <div className="  w-full md:w-[493px] bg-white ">
          <ReceiptTopBar
            token={token}
            close={handleClose}
            title="Transaction Receipt"
          />
        </div>

        {isLoading && !isSuccess && (
          <div className="flex flex-col justify-center items-center py-16 px-6">
            <LoadingView />
          </div>
        )}

        {isError && (
          <div className="flex flex-col justify-center items-center py-16 px-6">
            <ErrorMessageView
              refetch={refetch}
              message="We could not fetch the details for this transaction. The transaction might not exist or is unavailable."
            />
          </div>
        )}

        {isSuccess && data && (
          <div className="pt-6 h-full">
            <div className="px-7 space-y-3 pb-12">
              <div className="space-y-3">
                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">Date</p>
                  <p>{new Date(data?.createdAt * 1000).toLocaleString()}</p>
                </div>
                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">Reference</p>
                  <p className="truncate"> {data.reference} </p>
                </div>
                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">Amount</p>
                  <p>
                    <NumericFormat
                      value={data.amount}
                      prefix="₦ "
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </p>
                </div>

                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">Description</p>
                  <p className=" font-medium"> {data.description} </p>
                </div>
                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">
                    Balance after transaction
                  </p>
                  <p>
                    <NumericFormat
                      value={data.balanceAfter}
                      prefix="₦ "
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </p>
                </div>
                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">
                    Account Name
                  </p>
                  <p>
                    {user.firstName} {user.lastName}{" "}
                  </p>
                </div>

                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">Status</p>
                  <p className="capitalize font-semibold">
                    <span
                      className={levelToColor(txStatusColorMap[data.status])}
                    >
                      {data.status}
                    </span>
                  </p>
                </div>

                <div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
                  <p className="text-[--placeholder] font-light">Fee</p>
                  <p>
                    <NumericFormat
                      value={data.fee}
                      prefix="₦ "
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
};

export default TransactionReceipt;
