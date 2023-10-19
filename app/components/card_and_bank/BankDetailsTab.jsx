import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import bankLogo from "../../../assets/images/zenith-logo.svg";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsBank } from "react-icons/bs";
import { TbArchive } from "react-icons/tb";
import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNotifyStore } from "../../utils/store";
import config from "../../utils/config";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";
import useOutsideClickDetector from "../../utils/hooks/useOutsideClickDetector";

const CardDisplay = ({ name, bank, accountNumber, id, uid, token }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Hide Popups when not clicked on
  const cardPopupRef = useRef(null);

  useOutsideClickDetector(cardPopupRef, () => {
    setShowPopup(false);
  });

  // delete bank mutation

  const queryClient = useQueryClient();
  const notify = useNotifyStore((state) => state.setNotify);

  const { mutate, isLoading: isLoadingDeleteBank } = useMutation({
    mutationKey: queryKeys.deleteBankAccount,
    mutationFn: createFetcher({
      url: config.apiPaths.deleteBankAccount,
      method: "DELETE",
      auth: token,
      surfix: `/${uid}`,
    }),
    onSuccess: () => {
      setShowPopup(false);

      queryClient.invalidateQueries(queryKeys.getBankAccounts);
      notify({
        title: "Bank Account Deleted",
        content: "Bank account deleted successfully.",
        allowClose: true,
        show: true,
      });
    },

    onError: (error) => {
      setShowPopup(false);

      notify({
        title: "An error occured",
        content: error.message,
        allowClose: true,
        show: true,
      });
    },
  });

  function handleDelete() {
    if (isLoadingDeleteBank) return;
    mutate();
  }

  return (
    <div
      className={`rounded-lg w-full h-[195px] p-5 pt-6 flex flex-col justify-between bg-[--b1] shadow`}
    >
      <div className="flex items-center justify-between gap-3 relative">
        <div className="">
          <BsBank className="text-2xl lg:text-3xl" />
        </div>
        <PiDotsThreeVerticalBold
          className="text-xl cursor-pointer"
          onClick={() => setShowPopup(true)}
        />

        {/* Popup */}
        {showPopup && (
          <div
            className={`absolute w-full max-w-[150px] z-20 right-0 translate-x-[-30px]   overflow-hidden 
					${
            id % 2 === 0
              ? "md:left-[100%] md:translate-x-2"
              : "md:right-0 xl:left-[100%] md:translate-x-[-30px] xl:translate-x-2"
          }`}
          >
            <div
              className="bg-white border shadow-lg rounded"
              ref={cardPopupRef}
            >
              <button
                disabled={isLoadingDeleteBank}
                onClick={handleDelete}
                className="flex w-full rounded gap-3 items-center py-2 px-5 hover:bg-gray-50 disabled:opacity-40 transitioning "
              >
                <TbArchive className="text-sm" />
                {isLoadingDeleteBank ? <p>Deleting...</p> : <p>Delete</p>}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full pt-5">
        <p className="font-semibold text-xl flex gap-3 w-full uppercase">
          {name}
        </p>
      </div>

      <div className="flex justify-between gap-2 items-end font-medium">
        <p className="">{bank}</p>
        <p>{accountNumber}</p>
      </div>
    </div>
  );
};

const BankDetailsTab = ({ token }) => {
  const {
    isLoading: getBankAccountsLoading,
    isError: getBankAccountsError,
    refetch: getBankAccountsRefetch,
    data: getBankAccountsData,
    isSuccess: getBankAccountsSuccess,
  } = useQuery({
    queryKey: [queryKeys.getBankAccounts, token],
    queryFn: createFetcher({
      url: config.apiPaths.getBankAccounts,
      method: "GET",
      auth: token,
    }),

    enabled: !!token,
  });

  return (
    <div className="w-full">
      {getBankAccountsLoading && (
        <div className="flex py-16 justify-center items-center  w-full">
          <LoadingView />
        </div>
      )}

      {getBankAccountsError && (
        <div className="flex py-16 justify-center items-center  w-full">
          <ErrorMessageView
            message="An error occured while fetching your bank accounts"
            refetch={getBankAccountsRefetch}
          />
        </div>
      )}

      {getBankAccountsSuccess && getBankAccountsData.length === 0 && (
        <div className="flex flex-col justify-center items-center py-16 space-y-4">
          <p className="text-[#C4C4C4]">
            You have no bank accounts linked to your SafeHome
          </p>
        </div>
      )}

      {getBankAccountsSuccess && getBankAccountsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[650px]">
          {getBankAccountsData.map((data, index) => (
            <CardDisplay
              key={index}
              logo={bankLogo}
              name={data.accountName}
              bank={data.bankName}
              accountNumber={data.accountNumber}
              id={index}
              uid={data.uid}
              token={token}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BankDetailsTab;
