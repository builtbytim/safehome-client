"use client";

import { useState, useRef, useEffect } from "react";
import SecureRoute from "../../components/SecureRoute";
import Image from "next/image";
import {
	Balance,
	InvestmentCard,
	NoInvestment,
} from "../../components/investment";
import HomeTarget from "../../components/savings/HomeTarget";
import {
	AboutInvestment,
	AlreadyInvested,
	CashoutInvestment,
	InvestmentInfo,
	InvestNow,
	PopUpTopBar,
} from "../../components/investment/popup";
import HeaderInvestments from "../../components/layout/headers/HeaderInvestments";
import TabSwitch from "../../components/savings/TabSwitch";
import OverviewCard from "../../components/investment/OverviewCard";
import inv1 from "../../../assets/images/investment/inv1.png";
import inv2 from "../../../assets/images/investment/inv2.png";
import inv3 from "../../../assets/images/investment/inv3.png";
import inv4 from "../../../assets/images/investment/inv4.png";

const investments = [
	{
		id: 1,
		img: inv1,
		title: "SMART OFFICE LEKKI",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},

	{
		id: 2,
		img: inv2,
		title: "SHOPS IN IKOYI",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
	{
		id: 3,
		img: inv3,
		title: "LANDS IN FREEDOM WAY",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
	{
		id: 4,
		img: inv4,
		title: "DUPLEX IN FREEDOM WAY, LEKKI",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
];

function Page() {
	const [tabState, setTabState] = useState(0);
	const InvestmentStates = [
		"Not invested",
		"Already Invested",
		"Matured Investment",
	];
	const InvestmentState = InvestmentStates[0];
	const [showInvestmentInfo, setShowInvestmentInfo] = useState(false);
	const [showInvestNow, setShowInvestNow] = useState(false);
	const [showAboutInvestment, setShowAboutInvestment] = useState(false);
	const [dataId, setDataId] = useState(0);

	const openInfo = (id) => {
		setDataId(id);
		setShowInvestmentInfo(true);
	};

	const closePopup = () => {
		setShowInvestmentInfo(false);
	};

	const openInvestNow = () => {
		setShowAboutInvestment(false);
		setShowInvestNow(true);
	};

	// Hide Overlays when not clicked on
	const infoRef = useRef(null);
	const aboutRef = useRef(null);
	const investRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (infoRef.current && !infoRef.current.contains(event.target)) {
				setShowInvestmentInfo(false);
			}
			if (aboutRef.current && !aboutRef.current.contains(event.target)) {
				setShowAboutInvestment(false);
				setShowInvestmentInfo(false);
			}
			if (investRef.current && !investRef.current.contains(event.target)) {
				setShowInvestNow(false);
				setShowInvestmentInfo(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [showInvestmentInfo, showAboutInvestment, showInvestNow]);

	return (
		<main className="pb-8 md:pb-12 space-y-8 lg:space-y-10">
			<HeaderInvestments title="Investments" extraClasses="text-[--primary]" />

			<OverviewCard />
			<section className="bg-white rounded-brand pt-5 pb-3 md:py-8">
				<div className="border-b border-[--lines] px-3 md:px-8 flex">
					<button
						className={tabState === 0 ? "tab-button-active" : "tab-button"}
						onClick={() => setTabState(0)}
					>
						My Investments
					</button>
					<button
						className={tabState === 1 ? "tab-button-active" : "tab-button"}
						onClick={() => setTabState(1)}
					>
						New Oppurtunities
					</button>
					<button
						className={tabState === 2 ? "tab-button-active" : "tab-button"}
						onClick={() => setTabState(2)}
					>
						Completed
					</button>
				</div>
				<div className="px-3 py-5 md:p-8 space-y-5 md:space-y-8">
					<div className="flex flex-no-wrap gap-3 scrollbar-fix text-center filter-container content-center overflow-x-auto pb-2">
						<button className="filter-btn-active">All</button>
						<button className="filter-btn">Land Owners Club</button>
						<button className="filter-btn">Home Owners Club</button>
						<button className="filter-btn">Office Owners Club</button>
						<button className="filter-btn">Shop Owners Club</button>
					</div>

					{/* New Oppurtunities Tab */}
					{tabState === 0 && (
						<NoInvestment investNowFunc={() => setTabState(1)} />
					)}

					{/* New Oppurtunities Tab */}
					{tabState === 1 && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-7 lg:max-h-[60vh] overflow-y-auto scrollbar-fix pr-3">
							{investments.map((investment, index) => (
								<InvestmentCard
									key={index}
									img={investment.img}
									title={investment.title}
									returns={investment.returns}
									value={investment.value}
									investors={investment.investors}
									quantity={investment.quantity}
									openInfo={() => openInfo(index)}
								/>
							))}
						</div>
					)}

					{/* Completed */}
					{tabState === 2 && (
						<NoInvestment investNowFunc={() => setTabState(1)} />
					)}
				</div>
			</section>
			{showInvestmentInfo && (
				<div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
					<div
						className="fixed top-0 right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
						ref={infoRef}
					>
						{InvestmentState === "Matured Investment" ? (
							<div className="relative">
								<div className="fixed top-0 right-0 z-[1] w-full md:w-[450px]">
									<PopUpTopBar close={() => closePopup()} />
								</div>
								<div className="pt-[100px]">
									<CashoutInvestment
										data={investments[dataId]}
										showAboutFunction={() => setShowAboutInvestment(true)}
									/>
								</div>
							</div>
						) : InvestmentState === "Already Invested" ? (
							<div className="relative">
								<div className="fixed top-0 right-0 z-[1] w-full md:w-[450px]">
									<PopUpTopBar close={() => closePopup()} />
								</div>
								<div className="pt-[100px]">
									<AlreadyInvested
										data={investments[dataId]}
										showAboutFunction={() => setShowAboutInvestment(true)}
										investNowFunction={() => openInvestNow()}
									/>
								</div>
							</div>
						) : (
							<div className="relative">
								<div className="fixed top-0 right-0 z-[1] w-full md:w-[450px]">
									<PopUpTopBar close={() => closePopup()} />
								</div>
								<div className="pt-[100px]">
									<InvestmentInfo
										data={investments[dataId]}
										showAboutFunction={() => setShowAboutInvestment(true)}
										investNowFunction={() => openInvestNow()}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{showInvestNow && (
				<div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
					<div
						className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
						ref={investRef}
					>
						<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
							<PopUpTopBar
								close={() => setShowInvestNow(false)}
								title="Invest Now"
								desc="Use the form below to purchase enough investment units."
							/>
						</div>
						<div className="pt-[230px]">
							<InvestNow data={investments[dataId]} />
						</div>
					</div>
				</div>
			)}
			{showAboutInvestment && (
				<div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
					<div
						className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
						ref={aboutRef}
					>
						<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
							<PopUpTopBar
								close={() => setShowAboutInvestment(false)}
								title="About Investment"
								desc="Use the form below to purchase enough investment units."
							/>
						</div>
						<div className="pt-[230px]">
							<AboutInvestment
								data={investments[dataId]}
								investNowFunction={() => openInvestNow()}
							/>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
