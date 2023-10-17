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
import LockedSavings from "../../../components/savings/LockedSavings";
import {
	CreateSafelock,
	CreateSafelockStage2,
	CreateSafelockPreview,
	SafelockOverview,
} from "../../../components/savings/lockedPopups";
import { useState } from "react";

import ScrollLink from "../../../components/ScrollLink";
import SavingsImage from "../../../../assets/images/icons/SavingsLite.svg";
const tabItemsArr = [
	[
		{
			name: "Savings",
			img: SavingsSVG,
			tabId: "savings",
			url: "/savings",
			iconColor: "#ff9100",
		},
		{
			name: "Goal",
			img: TargetSVG,
			tabId: "goal",
			url: "/savings/goals?tabGoals=goal",
			iconColor: "#ff9100",
		},

		{
			name: "Locked Savings",
			img: LockSVG,
			tabId: "locked",
			url: "/savings/locked?tabGoals=locked",
			iconColor: "#8d4000",
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
function Page({ authenticatedUser }) {
	const router = useRouter();

	const [showCreateSafeLock, setShowCreateSafeLock] = useState(false);
	const [showCreateSafeLock2, setShowCreateSafeLock2] = useState(false);
	const [showCreateSafeLockPreview, setShowCreateSafeLockPreview] = useState(
		false
	);
	const [showSafelockOverview, setShowSafelockOverview] = useState(false);

	function toggleShowSafelockOverview() {
		setShowSafelockOverview(!showSafelockOverview);
	}

	function toggleShowCreateSafeLockPreview() {
		setShowCreateSafeLockPreview(!showCreateSafeLockPreview);
	}

	function toggleShowCreateSafeLock() {
		setShowCreateSafeLock(!showCreateSafeLock);
	}

	function toggleShowCreateSafeLock2() {
		setShowCreateSafeLock2(!showCreateSafeLock2);
	}

	function handleSubmitLockduration() {
		toggleShowCreateSafeLock2();
		toggleShowCreateSafeLock();
	}

	function handleTabChange(tabId) {
		if (tabId === tabItemsArr[0][0].tabId) {
			return router.push("/savings");
		}
	}

	if (showSafelockOverview)
		return <SafelockOverview toggleShow={toggleShowSafelockOverview} />;

	if (showCreateSafeLockPreview)
		return (
			<CreateSafelockPreview toggleShow={toggleShowCreateSafeLockPreview} />
		);

	if (showCreateSafeLock)
		return (
			<CreateSafelock
				handleSubmit={handleSubmitLockduration}
				toggleShow={toggleShowCreateSafeLock}
			/>
		);

	if (showCreateSafeLock2)
		return (
			<CreateSafelockStage2
				handleSubmit={toggleShowCreateSafeLockPreview}
				toggleShow={toggleShowCreateSafeLock2}
			/>
		);

	return (
		<>
			<div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
				<HeaderSavings
					user={authenticatedUser}
					title="Locked Savings"
					extraClasses="text-[--color-brand] border-[--color-brand]"
				/>

				<main className=" space-y-2 md:space-y-10">
					<section className="bg-white  rounded-brand  pt-8  md:p-8 space-y-4">
						<div className="flex flex-row justify-between items-center space-x-8">
							<TabSwitch
								tabParamName="tabGoals"
								defaultTab={2}
								tabItems={tabItemsArr[0]}
								persistActiveTab={handleTabChange}
								extraClasses="text-[--color-brand]  border-[--color-brand]"
							/>

							<div className="hidden md:block ">
								<button
									onClick={toggleShowCreateSafeLock}
									className="btn-3 bg-[#8d4000] hover:bg-[#8d4000]/80 px-6 whitespace-nowrap "
								>
									Lock your funds
								</button>
							</div>
						</div>
						<div>
							<div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
								<ScrollLink
									containerId="scroll-indicators"
									activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
									className="inline-block rounded-full border p-1 "
									to="total-balance"
								></ScrollLink>
								<ScrollLink
									containerId="scroll-indicators"
									activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
									className="inline-block rounded-full border p-1 "
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

									<h2 className=" text-[--text-secondary] font-medium">
										Total Balance
									</h2>

									<p className="text-[--color-brand] font-bold text-xl lg:text-2xl">
										₦0
									</p>
								</div>

								<div
									id="interest-earned"
									className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 border border-[--lines]"
								>
									<div>
										<Image src={SavingsImage} alt="my funds" width="48" />
									</div>

									<h2 className=" text-[--text-secondary] font-medium">
										Interest Earned
									</h2>

									<p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
										₦0
									</p>
								</div>
							</div>
							<div className="col-span-5 md:hidden py-3">
								<button
									onClick={toggleShowCreateSafeLock}
									className="btn-3 bg-[#8d4000] hover:bg-[#8d4000]/80  "
								>
									Lock your funds{" "}
								</button>
							</div>
						</div>
					</section>

					<section className="bg-white rounded-brand  pt-2 pb-8 md:p-8 space-y-4">
						<TabSwitch
							tabParamName="tab02"
							tabItems={tabItemsArr[1]}
							extraClasses="text-[--color-brand]  border-[--color-brand]"
						/>

						<div className="space-y-4 pt-4">
							{Array(6)
								.fill(2)
								.map((v, i) => {
									return <LockedSavings key={i} />;
								})}
						</div>
					</section>
				</main>
			</div>
		</>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
