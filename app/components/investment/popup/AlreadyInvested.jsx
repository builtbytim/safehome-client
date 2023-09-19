"use client";

import { useState } from "react";

import Image from "next/image";
import { MiniHero, InvestmentTab } from "../../investment";

const dubData = [
	{
		heading: "Total Capital",
		content: "18% in 6 months",
	},
	{
		heading: "Maturity Value",
		content: "₦555,073",
	},
	{
		heading: "Profit",
		content: "₦55,073.00",
	},
	{
		heading: "Purchased Units",
		content: "100 Units",
	},
	{
		heading: "Maturity Date",
		content: "23rd of October, 2023",
	},
	{
		heading: "Expected Returns",
		content: "11% in 12 months",
	},
];

const AlreadyInvested = ({ data, showAboutFunction, investNowFunction }) => {
	return (
		<div className="h-full overflow-y-auto">
			<MiniHero img={data.img} title={data.title} quantity={data.quantity} />
			<div className="px-5">
				<div className="py-6 flex justify-between gap-5">
					<p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-medium uppercase text-[--text-secondary]">
						{data.title}
					</p>
					<div className="text-right">
						<p className="text-[--text-brand] font-medium text-xl">
							₦{data.value}
						</p>
						<p className="text-[--placeholder] font-light mt-[-8px]">
							Per unit
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-7">
					<InvestmentTab
						heading="Effective Capital"
						content="₦500,000"
						type="info"
					/>
					<InvestmentTab
						heading="Maturity Value"
						content="₦555,073"
						type="info"
					/>
					<InvestmentTab heading="Returns" content="11.0%" type="info" />
				</div>
				<div className="space-y-3">
					<button
						className="block w-full py-2 px-5 rounded text-white bg-[--text-brand] border border-[--text-brand]"
						onClick={() => investNowFunction()}
					>
						Buy More Units
					</button>
					<button
						className="block w-full py-2 px-5 rounded text-[--text-brand] border border-[--text-brand]"
						onClick={() => showAboutFunction()}
					>
						About this Oppurtunity
					</button>
				</div>
				<div className="py-7 grid grid-cols-2 gap-3">
					{dubData.map((data, index) => (
						<InvestmentTab
							key={index}
							heading={data.heading}
							content={data.content}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AlreadyInvested;
