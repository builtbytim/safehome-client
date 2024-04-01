"use client";

import SecureRoute from "../../../components/SecureRoute";
import HeaderSavings from "../../../components/layout/headers/HeaderSavings";
import TabSwitch from "../../../components/savings/TabSwitch";
import Image from "next/image";
import TargetIcon from "../../../../assets/images/icons/target.svg";
import { useRouter } from "next/navigation";
import SavingsSVG from "../../../components/svg/SavingsSVG";
import LockSVG from "../../../components/svg/LockSVG";
import TargetSVG from "../../../components/svg/TargetSVG";
import LockedSavings from "../../../components/savings/LockedSavingsCard";
import useUserSavingsStats from "../../../utils/hooks/useUserSavingsStats";
import { NumericFormat } from "react-number-format";
import CreateLockManager from "../../../components/savings/CreateLockManager";
import { useState } from "react";
import useTabParam from "../../../utils/hooks/useTabParam";

import ScrollLink from "../../../components/ScrollLink";
import SavingsImage from "../../../../assets/images/icons/SavingsLite.svg";
import LockedSavingsGridList from "../../../components/savings/LockedSavingsGridList";
const tabItemsArr = [
	[
		{
			name: "Savings",
			img: SavingsSVG,
			tabId: "savings",
			iconColor: "#ff9100",
		},
		{
			name: "Goal Savings",
			img: TargetSVG,
			tabId: "goal",
			iconColor: "#ff9100",
		},

		{
			name: "Investment Savings",
			img: LockSVG,
			tabId: "locked",
			iconColor: "#ff9100",
		},
	],
	[
		{
			name: "On Going",
			tabId: "ongoing",
		},

		{
			name: "Completed",
			tabId: "completed",
		},
	],
];
function Page({ authenticatedUser, authenticationToken }) {
	const router = useRouter();

	tabItemsArr[0][0].handleClick = () => router.push("/savings");
	tabItemsArr[0][1].handleClick = () => router.push("/savings/goals");
	tabItemsArr[0][2].handleClick = () => router.push("/savings/locked");

	const { data } = useUserSavingsStats(authenticationToken, null, null, true);

	const { setTab, tab } = useTabParam("tab02");
	const { setTab: setTab2, tab: tab2 } = useTabParam("tab01", 2, [0, 2]);

	const [showCreateLockF1, setShowCreateLockF1] = useState(false);
	const [selectedLockedPlan, setSelectedLockedPlan] = useState(null);

	function handleSelectLockedPlan(plan) {
		setSelectedLockedPlan(plan);
	}

	function toggleCreateLockF1() {
		setShowCreateLockF1(!showCreateLockF1);
	}

	return (
		<>
			<CreateLockManager
				showForm1={showCreateLockF1}
				toggleForm1={toggleCreateLockF1}
				token={authenticationToken}
				selectedLockedPlan={selectedLockedPlan}
				setSelectedLockedPlan={setSelectedLockedPlan}
			/>

			<div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
				<HeaderSavings
					user={authenticatedUser}
					title="Investment Savings"
					extraClasses="text-[--header] border-[--button]"
				/>

				<main className=" space-y-2 md:space-y-10">
					<section className="bg-white  rounded-brand  pt-8  md:p-8 space-y-4">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
							<div className="col-span-2 flex items-end">
								<TabSwitch
									tabItems={tabItemsArr[0]}
									tabState={tab2}
									setTabState={setTab2}
									extraClasses="text-[--header]border-[--button]"
								/>
							</div>

							<div className="hidden lg:flex lg:justify-end col-span-1">
								<button
									onClick={toggleCreateLockF1}
									className="btn-1 px-7 w-auto"
								>
									Invest your funds
								</button>
							</div>
						</div>
						<div>
							<div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
								<ScrollLink
									containerId="scroll-indicators"
									activeClass="scroll-link-active"
									className="scroll-link"
									to="total-balance"
								></ScrollLink>
								<ScrollLink
									containerId="scroll-indicators"
									activeClass="scroll-link-active"
									className="scroll-link"
									to="interest-earned"
								></ScrollLink>

								<ScrollLink
									containerId="scroll-indicators"
									activeClass="hidden md:inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
									className="hidden md:inline-block rounded-full border p-1 "
									to="interest"
								></ScrollLink>
							</div>
							<div
								id="scroll-indicators"
								className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
							>
								<div
									id="total-balance"
									className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 border border-[--lines]"
								>
									<div>
										<Image src={TargetIcon} alt="my funds" width="48" />
									</div>

									<h2 className=" text-[--text] font-medium">Total Balance</h2>

									<p className="text-[--text] font-bold text-xl lg:text-2xl">
										<NumericFormat
											value={data ? data.lockedSavingsBalance : 0}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"₦ "}
										/>
									</p>
								</div>

								<div
									id="interest-earned"
									className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 border border-[--lines]"
								>
									<div>
										<Image src={SavingsImage} alt="my funds" width="48" />
									</div>

									<h2 className=" text-[--text] font-medium">
										Interest Earned
									</h2>

									<p className="text-[--text] font-bold text-xl lg:text-2xl">
										<NumericFormat
											value={0}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"₦ "}
										/>
									</p>
								</div>
							</div>
							<div className="col-span-5 md:hidden py-3">
								<button onClick={toggleCreateLockF1} className="btn-1">
									Invest your funds{" "}
								</button>
							</div>
						</div>
					</section>

					<section className="bg-white rounded-brand  pt-2 pb-8 md:p-8 space-y-4">
						<TabSwitch
							tabItems={tabItemsArr[1]}
							tabState={tab}
							setTabState={setTab}
							extraClasses="text-[--header]  border-[--button]"
						/>

						<LockedSavingsGridList
							token={authenticationToken}
							launchCreateLockedPlan={toggleCreateLockF1}
							selectLockedPlan={handleSelectLockedPlan}
							completed={tab === 1}
						/>
					</section>
				</main>
			</div>
		</>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
