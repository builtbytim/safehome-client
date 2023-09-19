"use client";

import { useState } from "react";

import Image from "next/image";
import { MiniHero, InvestmentTab } from "../../investment";

const dubData = [
	{
		heading: "Expected Returns",
		content: "18% in 6 months",
	},
	{
		heading: "Offer Closing Date",
		content: "18th of August 2023",
	},
	{
		heading: "Expected Returns",
		content: "18% in 6 months",
	},
	{
		heading: "Offer Closing Date",
		content: "18th of August 2023",
	},
];

const InvestmentInfo = ({ data, showAboutFunction, investNowFunction }) => {
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
				<div className="space-y-3">
					<button
						className="block w-full py-2 px-5 rounded text-white bg-[--text-brand] border border-[--text-brand]"
						onClick={() => investNowFunction()}
					>
						Invest Now
					</button>
					<button
						className="block w-full py-2 px-5 rounded text-[--text-brand] border border-[--text-brand]"
						onClick={() => showAboutFunction()}
					>
						About this Oppurtunity
					</button>
				</div>
				<div className="py-7 grid grid-cols-1 gap-3 space-y-3">
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

export default InvestmentInfo;
