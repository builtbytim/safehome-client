import Overlay2 from "../../Overlay2";
import { NumericFormat } from "react-number-format";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { useRef } from "react";
import Image from "next/image";
import GoalImage from "../../../../assets/images/investment_savings.jpeg";

function SafelockOverview({ closeSelf, plan, handleAddFund }) {
	const ref = useRef(null);

	useOutsideClickDetector(ref, closeSelf);

	const {
		assetInfo,
		lockName,
		amountSaved,
		lockDurationInMonths,
		paymentMode,
		readyForInvestment,
		interval,
		completed,
		amountToSaveAtInterval,
	} = plan;

	return (
		<Overlay2 z={3}>
			<section
				ref={ref}
				className={
					"w-full md:max-w-[493px] bg-white h-[100vh] z-40 overflow-scroll pb-10"
				}
			>
				<div className="flex popup-px py-6 flex-row justify-end items-center">
					<div
						onClick={closeSelf}
						className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
					>
						<BiX className="text-[--text] text-3xl" />
					</div>
				</div>

				<div className="pb-8 popup-px space-y-7">
					<div className="">
						<div className={"relative h-[210px] truncate  w-full "}>
							<Image
								src={assetInfo.coverImageUrl || GoalImage}
								alt="goal image"
								fill
								className="object-cover  h-[210px] w-full"
							/>
							<div className="absolute bg-black/60  inset-0  flex flex-col justify-center items-center truncate">
								<h1 className="text-white capitalize   truncate text-xl md:text-2xl xl:text-3xl text-center font-semibold">
									{lockName}
								</h1>
							</div>
						</div>
					</div>

					<div className="gap-4 grid grid-cols-2">
						<SmallDetailsCard
							title="Amount to Invest"
							value={
								<NumericFormat
									value={assetInfo.pricePerUnit}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₦ "}
								/>
							}
						/>

						<SmallDetailsCard
							title="Amount Saved"
							value={
								<NumericFormat
									value={amountSaved}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₦ "}
								/>
							}
						/>
						<SmallDetailsCard
							title="Saving Preference"
							value={<span className="capitalize"> {paymentMode} </span>}
						/>
						<SmallDetailsCard
							title="Interval"
							value={<span className="capitalize"> {interval} </span>}
						/>

						<SmallDetailsCard
							title="Amount Per Interval"
							value={
								<NumericFormat
									value={amountToSaveAtInterval}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₦ "}
								/>
							}
						/>
						<SmallDetailsCard
							title="Investment Duration"
							value={`${lockDurationInMonths} ${
								lockDurationInMonths > 1 ? "months" : "month"
							}`}
						/>
					</div>

					<div className="">
						<p className="text-[--header] text-lg md:text-xl font-semibold text-center">
							{completed
								? "Savings is Completed"
								: readyForInvestment
								? "Savings is Ready for Investment"
								: "Savings is Currently Ongoing"}
						</p>
					</div>
				</div>

				<div className=" space-y-4 flex flex-col justify-center items-center  mx-auto popup-px">
					{!completed && !readyForInvestment && (
						<button
							onClick={handleAddFund}
							type="button"
							className="btn-1 w-full  "
						>
							Add Funds
						</button>
					)}

					<button type="button" onClick={closeSelf} className="btn-2 w-full  ">
						Close
					</button>
				</div>
			</section>
		</Overlay2>
	);
}

export default SafelockOverview;
