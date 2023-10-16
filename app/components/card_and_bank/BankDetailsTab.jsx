import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import bankLogo from "../../../assets/images/zenith-logo.svg";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { GoPencil } from "react-icons/go";
import { TbArchive } from "react-icons/tb";
import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNotifyStore } from "../../utils/store";
import config from "../../utils/config";
import Spinner from "../Spinner";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";

const CardDisplay = ({ logo, name, bank, acct_num, id }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Hide Popups when not clicked on
  const cardPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardPopupRef.current &&
        !cardPopupRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showPopup]);
  return (
    <div
      className={`rounded-lg w-full h-[195px] p-5 pt-6 flex flex-col justify-between bg-[--b1] shadow`}
    >
      <div className="flex items-center justify-between gap-3 relative">
        <div className="h-[50px] w-auto max-w-[75px]">
          <Image
            src={logo}
            alt="card"
            width="auto"
            height="auto"
            className="w-auto h-full object-contain"
          />
        </div>
        <PiDotsThreeVerticalBold
          className="text-xl cursor-pointer"
          onClick={() => setShowPopup(true)}
        />

        {/* Popup */}
        {showPopup && (
          <div
            className={`absolute w-full max-w-[250px] z-[100] right-0 translate-x-[-30px] translate-y-[25px]  overflow-hidden 
					${
            id % 2 === 0
              ? "md:left-[100%] md:translate-x-2"
              : "md:right-0 xl:left-[100%] md:translate-x-[-30px] xl:translate-x-2"
          }`}
          >
            <div className="bg-white shadow-lg rounded" ref={cardPopupRef}>
              {/* <button className="flex w-full gap-3 items-center py-5 px-5 hover:bg-[--color-brand] hover:text-white font-semibold">
                <GoPencil className="text-lg" />
                <p>Edit Bank Details</p>
              </button> */}
              <button className="flex w-full gap-3 items-center py-5 px-5 hover:bg-[--color-brand] hover:text-white font-semibold">
                <TbArchive className="text-lg" />
                <p>Delete Bank</p>
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
        <p>{acct_num}</p>
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
        <div className="flex h-[50vh] justify-center items-center  w-full">
          <LoadingView />
        </div>
      )}

      {getBankAccountsError && (
        <div className="flex h-[50vh] justify-center items-center  w-full">
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
              acct_num={data.accountNumber}
              id={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BankDetailsTab;
