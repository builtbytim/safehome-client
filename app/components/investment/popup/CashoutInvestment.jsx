"use client";

import { MiniHero, InvestmentTab } from "../../investment";
import { NumericFormat } from "react-number-format";
import LoadingView from "../../LoadingView";
import ErrorMessageView from "../../ErrorMessageView";
import inv1 from "../../../../assets/images/investment/inv1.png";
import { useNotifyStore } from "../../../utils/store";

const CashoutInvestment = ({
  data,
  investNowFunction,
  userInvestmentData,

  isLoading,
  isError,
  refetch,
}) => {
  const setNotify = useNotifyStore((state) => state.setNotify);

  function handleCashOut() {
    setNotify({
      show: true,
      content:
        "Disbursement will be processed automatically into your SafeHome wallet soon.",
    });
  }

  if (
    isLoading &&
    (userInvestmentData === null || userInvestmentData === undefined)
  ) {
    return (
      <div className="py-10">
        <LoadingView />
      </div>
    );
  }

  if (
    isError &&
    (userInvestmentData === null || userInvestmentData === undefined)
  ) {
    return (
      <div className="py-10">
        <ErrorMessageView
          refetch={refetch}
          message="Something wrong while fetching your investment data"
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <MiniHero
        img={inv1}
        title={data.assetName}
        quantity={data.availableUnits}
      />
      <div className="px-5">
        <div className="py-6 flex justify-between gap-5">
          <p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-medium uppercase text-[--text-secondary]">
            {data.assetName}
          </p>
          <div className="text-right">
            <p className="text-[--text-brand] font-medium text-xl">
              <NumericFormat
                value={data.pricePerUnit}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </p>
            <p className="text-[--placeholder] font-light mt-[-8px]">
              Per unit
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2  gap-3 pb-7">
          <InvestmentTab
            heading="Effective Capital"
            content={userInvestmentData.amount}
            formatAsNumber
            type="info"
          />
          <InvestmentTab
            heading="Units Purchased"
            content={userInvestmentData.units}
            formatAsNumber
            type="info"
          />
        </div>
        <div className="space-y-3">
          {!data.soldOut && (
            <button
              className="btn-1-v2 block w-full py-2 px-5 "
              onClick={() => investNowFunction()}
            >
              Buy More Units
            </button>
          )}
          <button
            onClick={handleCashOut}
            className="btn-2-v2 block w-full py-2 px-5  "
          >
            Cash Out
          </button>
        </div>
        <div className="py-6 grid grid-cols-1  gap-y-2 md:gap-y-4">
          <InvestmentTab heading="ROI" content={data.props.roi} />
          <InvestmentTab
            heading="Maturity Date"
            content={data.props.maturityDate}
          />
          <InvestmentTab
            heading="Investment ID"
            content={data.props.investmentId}
          />
          <InvestmentTab
            heading="Investment Exit"
            content={data.props.investmentExit}
          />
        </div>
      </div>
    </div>
  );
};

export default CashoutInvestment;
