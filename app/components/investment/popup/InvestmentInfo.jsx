"use client";
import LandOwnersImage from "../../../../assets/images/LandOwnersClubImage.png";
import OfficeOwnersImage from "../../../../assets/images/OfficeOwnersClubImage.png";
import HomeOwnersImage from "../../../../assets/images/HomeOwnersClubImage.png";
import { MiniHero, InvestmentTab } from "../../investment";
import { NumericFormat } from "react-number-format";

const InvestmentInfo = ({ data, showAboutFunction, investNowFunction }) => {
  const ownerClub = data.ownerClub;
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden space-y-6">
      <MiniHero
        img={
          ownerClub === "land_owners_club"
            ? LandOwnersImage
            : ownerClub === "office_owners_club"
            ? OfficeOwnersImage
            : HomeOwnersImage
        }
        title={data.assetName}
        quantity={data.availableUnits}
        soldOut={data.soldOut}
      />
      <div className="popup-px space-y-7">
        <div className="flex justify-between gap-y-5">
          <div>
            <p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-semibold capitalize truncate text-[--text]">
              {data.assetName}
            </p>
            <p className="text-sm text-[--text] pt-1">{data.location}</p>
          </div>
          <div className="text-right">
            <p className="text-[--highlight] font-semibold  text-lg md:text-xl">
              <NumericFormat
                value={data.pricePerUnit}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </p>
            <p className="text-[--text] text-sm mt-[-8px] pt-2">Per unit</p>
          </div>
        </div>
        <div className="space-y-4">
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
            About this Opportunity
          </button>
        </div>
        <div className="grid grid-cols-1  gap-y-2 md:gap-y-4">
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
