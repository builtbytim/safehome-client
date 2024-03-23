"use client";

import LandOwnersImage from "../../../../assets/images/LandOwnersClubImage.png";
import OfficeOwnersImage from "../../../../assets/images/OfficeOwnersClubImage.png";
import HomeOwnersImage from "../../../../assets/images/HomeOwnersClubImage.png";
import { NumericFormat } from "react-number-format";
import { MiniHero, InvestmentTab } from "../../investment";
import LoadingView from "../../LoadingView";
import ErrorMessageView from "../../ErrorMessageView";

const AlreadyInvested = ({
	data,
	showAboutFunction,
	investNowFunction,
	isLoading,
	isError,
	refetch,
	userInvestmentData,
}) => {
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

	const ownerClub = data.ownerClub;

	return (
		<div className="h-full overflow-y-auto">
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
			/>
			<div className="px-5">
				<div className="py-6 flex justify-between gap-5">
					<div>
						<p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-medium capitalize truncate text-[--text]">
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
						className="btn-2-v2 block w-full py-2 px-5  "
						onClick={() => showAboutFunction()}
					>
						About this Opportunity
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

export default AlreadyInvested;
