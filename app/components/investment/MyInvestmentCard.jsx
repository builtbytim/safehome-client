"use client";

import Image from "next/image";
import cn from "classnames";
import { NumericFormat } from "react-number-format";
import LandOwnersImage from "../../../assets/images/LandOwnersClubImage.png";
import OfficeOwnersImage from "../../../assets/images/OfficeOwnersClubImage.png";
import HomeOwnersImage from "../../../assets/images/HomeOwnersClubImage.png";

const MyInvestmentCard = ({ investment, openInfo }) => {
  const { assetInfo, isActive, createdAt, amount, units } = investment;

  const { assetName, ownerClub } = assetInfo;

  return (
    <div
      onClick={() => {
        openInfo(assetInfo, true);
      }}
      title={!isActive ? "Payment has not been completed" : ""}
      className={
        "relative rounded-brand md:rounded-lg lg:rounded-xl border overflow-hidden text-[--text-secondary] text-left grid grid-cols-5 md:grid-cols-5  hover:ring-2 hover:ring-[--lines] hover:ring-offset-2 transitioning w-full group text-sm transitioning self-stretch" +
        cn({
          " opacity-50 pointer-events-none ": !isActive,
        })
      }
    >
      <div className="relative h-full min-h-[150px] col-span-2 md:col-span-2 overflow-hidden">
        <Image
          src={
            ownerClub === "land_owners_club"
              ? LandOwnersImage
              : ownerClub === "office_owners_club"
              ? OfficeOwnersImage
              : HomeOwnersImage
          }
          fill
          alt={assetName}
          className="object-cover h-full absolute group-hover:scale-110 transform transition-all duration-1000 ease-in-out "
        />
      </div>
      <div className="px-4 pt-2 pb-8 md:px-4 xl:px-6  col-span-3 md:col-span-3 space-y-1 truncate">
        <h2 className="capitalize  font-medium text-base md:text-lg text-left truncate ">
          {" "}
          {assetName}
        </h2>

        <div className="flex gap-4 md:gap-6 pt-2 ">
          <div>
            <h3 className="text-[--text-brand] whitespace-nowrap text-xs  pb-1 font-medium">
              <NumericFormat
                value={amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </h3>
            <p className="mt-[-4px] text-xs">Amount</p>
          </div>
          <div>
            <h3 className="text-[--text-brand] whitespace-nowrap text-xs  pb-1 font-medium">
              {new Date(createdAt * 1000).toLocaleDateString()}
            </h3>
            <p className="mt-[-4px] text-xs"> Purchase Date </p>
          </div>
        </div>
      </div>

      {isActive ? (
        <div className="absolute bottom-0 font-medium text-xs right-0 rounded-tl-xl py-1  px-2 text-white bg-[--green] ">
          <NumericFormat
            value={units}
            displayType={"text"}
            thousandSeparator={true}
          />{" "}
          {units > 1 ? "Units" : "Unit"} Purchased
        </div>
      ) : (
        <div className="absolute bottom-0 font-medium text-xs right-0 rounded-tl-xl py-1  px-2 text-[--text-danger]  ">
          Payment not completed
        </div>
      )}
    </div>
  );
};

export default MyInvestmentCard;
