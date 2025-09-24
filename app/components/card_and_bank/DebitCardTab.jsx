import Image from "next/image";
import visa from "../../../assets/images/visa.svg";
import mastercard from "../../../assets/images/mastercard.svg";
import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNotifyStore } from "../../utils/store";
import config from "../../utils/config";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";
import { BsTrash } from "react-icons/bs";

const CardDisplay = ({
  type,
  number,
  expiryYear,
  expiryMonth,
  name,
  token,
  surfix,
  uid,
}) => {
  // delete card mutation

  const queryClient = useQueryClient();
  const notify = useNotifyStore((state) => state.setNotify);

  const { mutate, isLoading: isLoadingDeleteDebitCard } = useMutation({
    mutationKey: queryKeys.deleteDebitCard,
    mutationFn: createFetcher({
      url: config.apiPaths.deleteDebitCard,
      method: "DELETE",
      auth: token,
      surfix: `/${uid}`,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getDebitCards);
      notify({
        title: "Debit Card Deleted",
        content: "Debit Card deleted successfully.",
        allowClose: true,
        show: true,
      });
    },

    onError: (error) => {
      notify({
        title: "An error occured",
        content: error.message,
        allowClose: true,
        show: true,
      });
    },
  });

  function handleDelete() {
    if (isLoadingDeleteDebitCard) return;

    notify({
      show: true,
      isConfirmation: true,
      content: "Delete debit card?",
      onAccept: mutate,
      onAcceptText: "Delete",

      onRejectText: "Cancel",
    });
  }

  return (
    <div
      className={`relative rounded-lg border w-full h-[195px] p-5 flex flex-col justify-between text-white ${
        type === "visa" && "visa-bg"
      } ${type === "mastercard" && "mastercard-bg"}`}
    >
      <div className="absolute top-4 right-4 " onClick={handleDelete}>
        <BsTrash className="text-white text-2xl cursor-pointer" />
      </div>

      <div className="h-[30px] w-auto">
        <Image
          src={
            type === "visa" ? visa : type === "mastercard" ? mastercard : visa
          }
          alt="card"
          width="auto"
          height="auto"
          className="w-auto h-full object-contain"
        />
      </div>
      <div className="w-full pt-5">
        <p className="font-medium text-2xl flex gap-3 w-full">
          <span className="font-bold text-2xl ">....</span>
          <span className="font-bold text-2xl ">....</span>
          <span>{surfix} </span>
        </p>
      </div>
      <div className="flex justify-between gap-2 items-end font-medium">
        <p className="">{name}</p>
        <div>
          <p className="font-light uppercase text-sm">VALID THRU</p>
          <p>
            {expiryMonth}/{expiryYear}
          </p>
        </div>
      </div>
    </div>
  );
};

const DebitCardTab = ({ token }) => {
  const {
    isLoading: getDebitCardsLoading,
    isError: getDebitCardsError,
    refetch: getDebitCardsRefetch,
    data: getDebitCardsData,
    isSuccess: getDebitCardsSuccess,
  } = useQuery({
    queryKey: [queryKeys.getDebitCards, token],
    queryFn: createFetcher({
      url: config.apiPaths.getDebitCards,
      method: "GET",
      auth: token,
    }),
  });

  return (
    <div className="w-full">
      {getDebitCardsLoading && (
        <div className="flex py-16 justify-center items-center  w-full">
          <LoadingView />
        </div>
      )}

      {getDebitCardsError && (
        <div className="flex py-16 justify-center items-center  w-full">
          <ErrorMessageView
            message="An error occured while fetching your debit cards."
            refetch={getDebitCardsRefetch}
          />
        </div>
      )}

      {getDebitCardsSuccess && getDebitCardsData.numItems === 0 && (
        <div className="flex flex-col justify-center items-center py-16 space-y-4">
          <p className="text-[#C4C4C4] text-sm lg:text-lg">
            You have no debit cards linked to your Propvest
          </p>
        </div>
      )}

      {getDebitCardsSuccess && getDebitCardsData.entries > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[650px]">
          {getDebitCardsData.items.map((data, index) => {
            return (
              <CardDisplay
                key={index}
                uid={data.uid}
                type={data.cardType.toLowerCase()}
                number={data.cardNumber}
                expiryYear={data.expiryYear}
                expiryMonth={data.expiryMonth}
                name={data.cardName}
                surfix={data.surfix}
                token={token}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DebitCardTab;
