"use client";
import inv1 from "../../../../assets/images/investment/inv1.png";
import { MiniHero, InvestmentTab } from "../../investment";
import { NumericFormat } from "react-number-format";

const InvestmentInfo = ({ data, showAboutFunction, investNowFunction }) => {
  return (
    <div className="h-full overflow-y-auto">
      <MiniHero
        img={inv1}
        title={data.assetName}
        quantity={data.availableUnits}
        soldOut={data.soldOut}
      />
      <div className="px-6">
        <div className="py-6 flex justify-between gap-y-5">
          <div>
            <p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-medium capitalize truncate text-[--text-secondary]">
              {data.assetName}
            </p>
            <p className="text-sm text-[--primary] pt-2">{data.location}</p>
          </div>
          <div className="text-right">
            <p className="text-[--text-brand] font-bold  text-xl md:text-2xl">
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
        <div className="space-y-3">
          {!data.soldOut && (
            <button
              className=" btn-1-v2 block w-full py-2 px-5 rounded "
              onClick={() => investNowFunction()}
            >
              Invest Now
            </button>
          )}
          <button
            className="btn-2-v2 block w-full py-2 px-5 rounded "
            onClick={() => showAboutFunction()}
          >
            About this Oppurtunity
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

export default InvestmentInfo;
