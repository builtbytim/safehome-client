"use client";

import SecureRoute from "../../components/SecureRoute";
import HeaderSavings from "../../components/layout/headers/HeaderSavings";
import OverviewCard from "../../components/savings/OverviewCard";
import TabSwitch from "../../components/savings/TabSwitch";
import useTabParam from "../../utils/hooks/useTabParam";
import GoalSavingsGridList from "../../components/savings/GoalSavingsGridList";
import CreateGoalManager from "../../components/savings/CreateGoalManager";
import GoalOverviewManager from "../../components/savings/GoalOverviewManager";
import { useState } from "react";
import CreateLockManager from "../../components/savings/CreateLockManager";
import RecentSavingsActivityList from "../../components/savings/RecentSavingsActivityList";

const tabItems = [
	{
		name: "Ongoing Savings",
	},
	{
		name: "Completed",
	},
];

function Page({ authenticatedUser, authenticationToken }) {
	const { tab: tabState, setTab: setTabState } = useTabParam("tab", 0, [0, 1]);
	const [showGoalCreationF1, setShowGoalCreationF1] = useState(false);
	const [showGoalCreationF2, setShowGoalCreationF2] = useState(false);
	const [showCreateLockF1, setShowCreateLockF1] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState(null);

	function toggleGoalCreationF1() {
		setShowGoalCreationF1(!showGoalCreationF1);
	}

	function toggleGoalCreationF2() {
		setShowGoalCreationF2(!showGoalCreationF2);
	}

	function toggleCreateLockF1() {
		setShowCreateLockF1(!showCreateLockF1);
	}

	return (
		<>
			<CreateGoalManager
				showForm1={showGoalCreationF1}
				showForm2={showGoalCreationF2}
				toggleForm1={toggleGoalCreationF1}
				toggleForm2={toggleGoalCreationF2}
				token={authenticationToken}
			/>

			<CreateLockManager
				showForm1={showCreateLockF1}
				toggleForm1={toggleCreateLockF1}
				token={authenticationToken}
			/>

			{selectedGoal && (
				<GoalOverviewManager
					token={authenticationToken}
					selectedGoal={selectedGoal}
					setSelectedGoal={setSelectedGoal}
				/>
			)}

			<div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
				<HeaderSavings user={authenticatedUser} />

				<main className=" space-y-2 lg:space-y-10">
					<OverviewCard
						launchCreateGoal={toggleGoalCreationF1}
						launchCreateLock={toggleCreateLockF1}
						token={authenticationToken}
					/>
					<section className="bg-white rounded-brand  py-8 md:p-8 space-y-4">
						<h1 className="text-[--header] capitalize text-base md:text-xl  font-semibold">
							Recent Activity
						</h1>

						<RecentSavingsActivityList token={authenticationToken} />
					</section>
				</main>
			</div>
		</>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
