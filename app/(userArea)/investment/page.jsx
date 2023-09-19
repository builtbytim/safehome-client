"use client";

import { useState } from "react";
import Image from "next/image";
import { Balance, InvestmentCard } from "../../components/investment";
import {
	AboutInvestment,
	AlreadyInvested,
	CashoutInvestment,
	InvestmentInfo,
	InvestNow,
	PopUpTopBar,
} from "../../components/investment/popup";

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
	{
		id: 5,
		img: inv1,
		title: "SMART OFFICE LEKKI",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
	{
		id: 6,
		img: inv2,
		title: "SHOPS IN IKOYI",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
	{
		id: 7,
		img: inv3,
		title: "LANDS IN FREEDOM WAY",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
	{
		id: 8,
		img: inv4,
		title: "DUPLEX IN FREEDOM WAY, LEKKI",
		returns: "10%",
		value: "555,073",
		investors: "1823",
		quantity: "100",
	},
];

export default function Account() {
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

	return (
		<main className="pb-8 md:pb-12 space-y-8 lg:space-y-10">
			<Balance />
			<section className="bg-white rounded-brand pt-5 pb-3 md:py-8">
				<div className="border-b border-[--lines] px-3 md:px-8 flex">
					<button className="tab-button-active">My Investments</button>
					<button className="tab-button">New Oppurtunities</button>
				</div>
				<div className="px-3 py-5 md:p-8 space-y-5 md:space-y-8">
					<div className="flex flex-no-wrap gap-3 scrollbar-fix text-center filter-container content-center overflow-x-auto pb-2">
						<button className="filter-btn-active">All</button>
						<button className="filter-btn">Land Owners Club</button>
						<button className="filter-btn">Home Owners Club</button>
						<button className="filter-btn">Office Owners Club</button>
						<button className="filter-btn">Shop Owners Club</button>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-7 h-[60vh] overflow-y-auto scrollbar-fix pr-3">
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
				</div>
			</section>
			{showInvestmentInfo && (
				<div className="fixed top-[-40px] right-0 w-full md:w-[400px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
					{InvestmentState === "Matured Investment" ? (
						<div>
							<PopUpTopBar close={() => closePopup()} />
							<CashoutInvestment
								data={investments[dataId]}
								showAboutFunction={() => setShowAboutInvestment(true)}
							/>
						</div>
					) : InvestmentState === "Already Invested" ? (
						<div>
							<PopUpTopBar close={() => closePopup()} />
							<AlreadyInvested
								data={investments[dataId]}
								showAboutFunction={() => setShowAboutInvestment(true)}
								investNowFunction={() => openInvestNow()}
							/>
						</div>
					) : (
						<div>
							<PopUpTopBar close={() => closePopup()} />
							<InvestmentInfo
								data={investments[dataId]}
								showAboutFunction={() => setShowAboutInvestment(true)}
								investNowFunction={() => openInvestNow()}
							/>
						</div>
					)}
				</div>
			)}

			{showInvestNow && (
				<div className="fixed top-[-40px] right-0 w-full md:w-[400px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
					<PopUpTopBar close={() => setShowInvestNow(false)} />
					<InvestNow data={investments[dataId]} />
				</div>
			)}
			{showAboutInvestment && (
				<div className="fixed top-[-40px] right-0 w-full md:w-[400px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
					<PopUpTopBar close={() => setShowAboutInvestment(false)} />
					<AboutInvestment
						data={investments[dataId]}
						investNowFunction={() => openInvestNow()}
					/>
				</div>
			)}
		</main>
	);
}
