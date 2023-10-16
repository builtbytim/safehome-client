"use client";

import Image from "next/image";
import { VscLocation } from "react-icons/vsc";
import { NumericFormat } from "react-number-format";
import inv1 from "../../../assets/images/investment/inv1.png";

const InvestibleAssetCard = ({ investibleAsset, openInfo }) => {
  const {
    assetName,
    pricePerUnit,
    investorCount,
    location,
    availableUnits,
    soldOut,
  } = investibleAsset;
  return (
    <div
      assetName="Click to view more details"
      className="relative  rounded-brand md:rounded-lg lg:rounded-xl border overflow-hidden text-[--text-secondary] text-left grid grid-cols-5 md:grid-cols-5 h-[165px] md:h-[192px] hover:ring-2 hover:ring-[--lines] hover:ring-offset-2 transitioning w-full group text-sm transitioning"
      onClick={openInfo}
    >
      <div className="w-full h-full col-span-2 md:col-span-2 overflow-hidden">
        <Image
          src={inv1}
          alt={assetName}
          className="object-cover w-full h-full group-hover:scale-110 transform transition-all duration-1000 ease-in-out "
          width={200}
          height={192}
        />
      </div>
      <div className="p-4 md:px-4 xl:px-6 col-span-3 md:col-span-3 space-y-1">
        <h2 className="capitalize font-medium text-base md:text-lg text-left truncate ">
          {assetName}
        </h2>

        <div className="text-[--text-secondary] py-2 inline-flex justify-start items-center space-x-2  ">
          <VscLocation className="inline-block text-lg" />

          <span>{location}</span>
        </div>

        <div className="flex gap-4 md:gap-6 pt-2 ">
          <div>
            <h3 className="text-[--text-brand] text-xs whitespace-nowrap  pb-1 font-medium">
              <NumericFormat
                value={pricePerUnit}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </h3>
            <p className="mt-[-4px] text-xs">Per unit</p>
          </div>
          <div>
            <h3 className="text-[--text-brand] text-xs whitespace-nowrap   pb-1 font-medium">
              <NumericFormat
                value={investorCount}
                displayType={"text"}
                thousandSeparator={true}
              />
            </h3>
            <p className="mt-[-4px] text-xs">Investors</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 font-medium text-xs right-0 rounded-tl-xl py-1  px-2 text-white bg-[--green] ">
        {soldOut ? (
          "Sold Out"
        ) : (
          <>
            <NumericFormat
              value={availableUnits}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
            <span>Available</span>
          </>
        )}
      </div>
    </div>
  );
};

export default InvestibleAssetCard;
