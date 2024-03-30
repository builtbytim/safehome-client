import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import { BsCalendar2PlusFill, BsGearFill } from "react-icons/bs";
import Image from "next/image";
import GoalImage from "../../../../assets/images/savings_cover.jpeg";
import SmallDetailsCard from "./SmallDetailsCard";
import { NumericFormat } from "react-number-format";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { useRef } from "react";

function GoalOverview({
	closeSelf,
	toggleShowAddFunds,
	toggleShowSettings,
	toggleShowExtendGoal,
	selectedGoal,
}) {
	const {
		goalName,
		goalImageUrl,
		goalAmount,
		amountSaved,
		startDate,
		endDate,
		amountToSaveAtInterval,
		interval,
		completed,
	} = selectedGoal;

	const ref = useRef(null);

	// useOutsideClickDetector(ref, closeSelf);

	const daysLeft = Math.ceil(
		(endDate - new Date().getTime() / 1000) / (60 * 60 * 24)
	);
	return (
		<>
			<Overlay2 z={3}>
				<section
					ref={ref}
					className={
						"w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 "
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

					<div className="overflow-y-auto scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8 popup-px space-y-2">
						<div className="">
							<div className={"relative h-[210px]  w-full "}>
								<Image
									src={goalImageUrl || GoalImage}
									alt="goal image"
									fill
									className="object-cover  h-[210px] w-full"
								/>
								<div className="absolute bg-black/60  inset-0  flex flex-col justify-center items-center truncate">
									<h1 className="text-white truncate text-xl md:text-2xl xl:text-3xl text-center font-semibold">
										{" "}
										{goalName}{" "}
									</h1>
								</div>
							</div>
						</div>

						{/* Details */}

						<div className="py-6 space-y-6">
							<div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
								<div className="border w-full rounded-[8px] border-[--lines] px-4 py-2 space-y-2 flex flex-col justify-center items-start font-medium self-stretch text-sm">
									<span className="text-[--highlight] font-normal ">
										Goal Balance
									</span>
									<span className="font-semibold">
										<NumericFormat
											value={amountSaved}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"₦ "}
										/>
									</span>
								</div>

								<div className="border w-full rounded-[8px] border-[--lines] px-4 py-2 space-y-2 flex flex-col justify-center items-start font-medium self-stretch text-sm">
									<span className="text-[--highlight] font-normal whitespace-nowrap">
										Overall Set Goal Amount
									</span>
									<span className="font-semibold">
										<NumericFormat
											value={goalAmount}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"₦ "}
										/>
									</span>
								</div>
							</div>

							{completed && (
								<div className="py-1">
									<p className="text-[--button] text-lg md:text-xl font-semibold text-center">
										Congratulations! You have completed this goal.
									</p>
								</div>
							)}

							{!completed && (
								<div>
									<button
										onClick={toggleShowAddFunds}
										className="btn-1-v1 md:py-3 text-center justify-center"
									>
										Add Funds to Goal{" "}
									</button>
								</div>
							)}

							<div className="hidden flex-col md:flex-row justify-center md:justify-between items-center gap-4">
								<button
									onClick={toggleShowSettings}
									className="btn-2 flex justify-center items-center gap-2"
								>
									<BsGearFill className="text-xl" />
									<span className="text-sm">Goal Settings</span>
								</button>
								<button
									onClick={toggleShowExtendGoal}
									className="btn-2 flex justify-center items-center gap-2"
								>
									<BsCalendar2PlusFill className="text-xl" />
									<span className="text-sm">Extend Goal</span>
								</button>
							</div>
						</div>

						{/* More Details  */}

						<div className="space-y-6">
							<div className="grid grid-cols-2 gap-4">
								<SmallDetailsCard
									title="Start Date"
									value={new Date(startDate * 1000).toDateString()}
								/>
								<SmallDetailsCard
									title="Withdrawal Date"
									value={new Date(endDate * 1000).toDateString()}
								/>

								<SmallDetailsCard title="Interval" value={interval} />
								<SmallDetailsCard
									title="Goal Amount"
									value={
										<NumericFormat
											value={goalAmount}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"₦ "}
										/>
									}
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

								<SmallDetailsCard title="Days Left" value={daysLeft} />
							</div>
						</div>
					</div>
				</section>
			</Overlay2>
		</>
	);
}

export default GoalOverview;
