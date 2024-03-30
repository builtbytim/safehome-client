"use client";

import Image from "next/image";
import { VscLocation } from "react-icons/vsc";
import { NumericFormat } from "react-number-format";
import LandOwnersImage from "../../../assets/images/LandOwnersClubImage.png";
import OfficeOwnersImage from "../../../assets/images/OfficeOwnersClubImage.png";
import HomeOwnersImage from "../../../assets/images/HomeOwnersClubImage.png";
import cn from "classnames";

const InvestibleAssetCard = ({ investibleAsset, openInfo }) => {
	const {
		assetName,
		pricePerUnit,
		investorCount,
		location,
		availableUnits,
		soldOut,
		ownerClub,
	} = investibleAsset;
	return (
		<div
			assetName="Click to view more details"
			className="relative rounded-[10px] lg:rounded-[16px] p-1 lg:p-0 border overflow-hidden text-[--text] text-left grid grid-cols-5 md:grid-cols-5 self-stretch hover:ring-2 hover:ring-[--lines] hover:ring-offset-2 transitioning w-full group text-sm cursor-pointer"
			onClick={openInfo}
		>
			<div className=" h-full min-h-[150px] rounded-[10px] lg:rounded-l-[16px] lg:rounded-r-none col-span-2 md:col-span-2 relative overflow-hidden">
				<Image
					src={
						ownerClub === "land_owners_club"
							? LandOwnersImage
							: ownerClub === "office_owners_club"
							? OfficeOwnersImage
							: HomeOwnersImage
					}
					alt={assetName}
					className="object-cover  absolute rounded-[10px] lg:rounded-l-[16px] lg:rounded-r-none  group-hover:scale-110 transform transition-all duration-1000 ease-in-out "
					fill
				/>
			</div>
			<div className="px-4 pt-2 pb-8 md:px-4 xl:px-6 col-span-3 md:col-span-3 space-y-1">
				<h2 className="capitalize font-semibold text-base md:text-lg text-left truncate ">
					{assetName} {ownerClub}
				</h2>

				<div className="text-[--text] py-2 inline-flex justify-start items-center space-x-2  ">
					<VscLocation className="inline-block text-lg" />

					<span>{location}</span>
				</div>

				<div className="flex gap-4 md:gap-6 pt-2 ">
					<div>
						<h3 className="text-[--highlight] text-xs whitespace-nowrap  pb-1 font-medium">
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
						<h3 className="text-[--highlight] text-xs whitespace-nowrap   pb-1 font-medium">
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
			<div
				className={
					"absolute bottom-0 font-medium text-xs right-0 rounded-tl-xl py-1  px-2   " +
					cn({
						" bg-[--green] text-white ": !soldOut,
						" bg-[--text-danger] text-white ": soldOut,
					})
				}
			>
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
