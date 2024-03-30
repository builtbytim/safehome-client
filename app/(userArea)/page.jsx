"use client";

import OverviewCard from "../components/home/OverviewCard";
import LastNTime from "../components/home/LastNTime";
import SecureRoute from "../components/SecureRoute";
import Header from "../components/layout/headers/Header";
import Overlay from "../components/Overlay2";
import TransactionHistoryTable from "../components/home/TransactionHistoryTable";
import { PopUpTopBar } from "../components/security";
import { Withdraw, Topup } from "../components/home/popups";
import { useState, useRef, useEffect } from "react";
import FilterGroup from "../components/home/FilterGroup";
import ExploreCardsRow from "../components/home/ExploreCardsRow";
import useOutsideClickDetector from "../utils/hooks/useOutsideClickDetector";
import { useSearchParams } from "next/navigation";

function Page({ authenticatedUser, authenticationToken }) {
	const [showTopup, setShowTopup] = useState(false);
	const [showWithdraw, setShowWithdraw] = useState(false);

	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get("action") === "fund") {
			setShowTopup(true);
		}

		if (searchParams.get("action") === "withdraw") {
			setShowWithdraw(true);
		}
	}, [searchParams]);

	// Transaction Filters and Params area

	const [params, setParams] = useState({
		page: 1,
		limit: 5,
		type: "",
		startDate: "",
		endDate: "",
		fromLast: "",
	});

	function clearFilters() {
		setParams((prev) => ({
			...prev,
			type: "",
			startDate: "",
			endDate: "",
			fromLast: "",
		}));
	}

	function setDateFilter(startDate, endDate) {
		setParams((prev) => ({
			...prev,
			startDate,
			endDate,
			fromLast: null,
			page: 1,
		}));
	}

	function setPageFilter(page) {
		setParams((prev) => ({
			...prev,
			page,
		}));
	}

	function setTxTypeFilter(type) {
		setParams((prev) => ({
			...prev,
			type,
			page: 1,
		}));
	}

	function setFromLastFilter(fromLast) {
		setParams((prev) => ({
			...prev,
			fromLast,
			startDate: null,
			endDate: null,
			page: 1,
		}));
	}

	// Transaction Filters and Params area  ends

	// Hide Popups when not clicked on
	const topupRef = useRef(null);
	const withdrawRef = useRef(null);

	useOutsideClickDetector(topupRef, () => setShowTopup(false));
	useOutsideClickDetector(withdrawRef, () => setShowWithdraw(false));

	return (
		<div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
			{/* POPUPS */}
			{showTopup && (
				<div className="fixed  left-0 w-full  bg-black/50 z-20">
					<Overlay z={3}>
						<div
							className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
							ref={topupRef}
						>
							<div className="  w-full md:w-[493px] bg-white ">
								<PopUpTopBar
									close={() => setShowTopup(false)}
									title="Add funds"
									desc="Instantly add funds to this savings Goal."
								/>
							</div>
							<div className="pt-6">
								<Topup
									token={authenticationToken}
									closeSelf={() => setShowTopup(false)}
								/>
							</div>
						</div>
					</Overlay>
				</div>
			)}

			{showWithdraw && (
				<div className="fixed  left-0 w-full  bg-black/50 z-20">
					<Overlay z={3}>
						<div
							className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
							ref={withdrawRef}
						>
							<div className="  w-full md:w-[493px] bg-white ">
								<PopUpTopBar
									close={() => setShowWithdraw(false)}
									title="Withdraw Funds"
									desc="Withdraw funds to your desired destination."
								/>
							</div>
							<div className="pt-6 h-full">
								<Withdraw
									token={authenticationToken}
									closeSelf={() => setShowWithdraw(false)}
								/>
							</div>
						</div>
					</Overlay>
				</div>
			)}

			<Header user={authenticatedUser} />

			<main className=" space-y-2 lg:space-y-10">
				<OverviewCard
					setShowTopup={setShowTopup}
					setShowWithdraw={setShowWithdraw}
					token={authenticationToken}
				/>

				<ExploreCardsRow user={authenticatedUser} />
				<section className="bg-white rounded-brand  pt-7 md:p-8 space-y-4">
					<div className="w-full flex flex-col xl:flex-row justify-between xl:items-center xl:gap-16 xl:pb-1">
						<h1 className="text-[--text] capitalize text-xl sm:text-2xl lg:text-2xl  font-medium">
							Transactions
						</h1>

						<div className="flex flex-wrap xl:justify-end items-center gap-4 lg:gap-6 w-full max-w-full text-sm ">
							<div>
								<LastNTime setFromLastFilter={setFromLastFilter} />
							</div>
							<div>
								<FilterGroup
									setDateFilter={setDateFilter}
									setTxTypeFilter={setTxTypeFilter}
								/>
							</div>
							<button
								onClick={clearFilters}
								className="bg-white border hover:bg-gray-50 transitioning border-[--lines] rounded-lg lg:rounded-brand text-sm px-2 lg:px-4 items-center py-2"
							>
								Clear All
							</button>
						</div>
					</div>

					<TransactionHistoryTable
						params={params}
						token={authenticationToken}
						setPageFilter={setPageFilter}
					/>
				</section>
			</main>
		</div>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
