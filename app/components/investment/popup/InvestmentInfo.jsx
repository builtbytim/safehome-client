"use client";
import inv1 from "../../../../assets/images/investment/inv1.png";
import { MiniHero, InvestmentTab } from "../../investment";
import { NumericFormat } from "react-number-format";

const InvestmentInfo = ({ data, showAboutFunction, investNowFunction }) => {
  return (
    <div className="h-full overflow-y-auto">
      <MiniHero img={inv1} title={data.assetName} quantity={data.units} />
      <div className="px-5">
        <div className="py-6 flex justify-between gap-5">
          <div>
            <p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-medium uppercase text-[--text-secondary]">
              {data.assetName}
            </p>
            <p className="text-sm text-[--primary] pt-2">{data.location}</p>
          </div>
          <div className="text-right">
            <p className="text-[--text-brand] font-bold  text-xl md:text-2xl">
              <NumericFormat
                value={data.price / data.units}
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
          <button
            className="block w-full py-2 px-5 rounded text-white bg-[--text-brand] border border-[--text-brand]"
            onClick={() => investNowFunction()}
          >
            Invest Now
          </button>
          <button
            className="block w-full py-2 px-5 rounded text-[--text-brand] border border-[--text-brand]"
            onClick={() => showAboutFunction()}
          >
            About this Oppurtunity
          </button>
        </div>
        <div className="py-6 grid grid-cols-1  gap-y-2 md:gap-y-4">
          <InvestmentTab heading="ROI" content={data.properties.roi} />
          <InvestmentTab
            heading="Maturity Date"
            content={data.properties.maturityDate}
          />
          <InvestmentTab
            heading="Investment ID"
            content={data.properties.investmentId}
          />
          <InvestmentTab
            heading="Investment Exit"
            content={data.properties.investmentExit}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfo;
