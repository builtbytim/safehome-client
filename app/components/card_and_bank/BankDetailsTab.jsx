import React from "react";

import Image from "next/image";

import bankLogo from "../../../assets/images/zenith-logo.svg";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const banksData = [
	{
		logo: bankLogo,
		name: "ADEWALE ADEP",
		bank: "Zenith Bank",
		acct_num: "2190909090",
	},
	{
		logo: bankLogo,
		name: "ADEWALE ADEP",
		bank: "Zenith Bank",
		acct_num: "2190909090",
	},
];

// const iconBox = ({ icon, text, buttonFunction }) => (
// 	<button
// 		className="w-full py-2 bg-white hover:bg-[--color-brand] hover:text-white flex gap-2"
// 		onClick={() => buttonFunction()}
// 	>
// 		<div>{icon}</div>
// 		<p>{text}</p>
// 	</button>
// );

const CardDisplay = ({ logo, name, bank, acct_num }) => (
	<div
		className={`rounded-lg w-full h-[195px] p-5 pt-6 flex flex-col justify-between bg-[--b1] shadow`}
	>
		<div className="flex items-center justify-between gap-3">
			<div className="h-[50px] w-auto max-w-[75px]">
				<Image
					src={logo}
					alt="card"
					width="auto"
					height="auto"
					className="w-auto h-full object-contain"
				/>
			</div>
			<PiDotsThreeVerticalBold className="text-xl" />
		</div>
		<div className="w-full pt-5">
			<p className="font-semibold text-xl flex gap-3 w-full uppercase">
				{name}
			</p>
		</div>

		<div className="flex justify-between gap-2 items-end font-medium">
			<p className="">{bank}</p>
			<p>{acct_num}</p>
		</div>
	</div>
);

const BankDetailsTab = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[650px]">
			{banksData.map((data, index) => (
				<CardDisplay
					key={index}
					logo={data.logo}
					name={data.name}
					bank={data.bank}
					acct_num={data.acct_num}
					id={index}
				/>
			))}
		</div>
	);
};

export default BankDetailsTab;
