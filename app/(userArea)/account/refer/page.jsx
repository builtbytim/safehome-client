"use client";

import { useState } from "react";
import Image from "next/image";

import { PiMoneyDuotone } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import picIcon from "../../../../assets/images/icons/picIcon.svg";
import CopyButton from "../../../components/CopyButton.jsx";

const referralsData = [
	{
		date: "6th September, 2023",
		name: "Stephen Jobs",
	},
	{
		date: "6th September, 2023",
		name: "John Doe",
	},
	{
		date: "6th September, 2023",
		name: "Francis Drake",
	},
];

export default function Refer() {
	return (
		<main className=" space-y-2 lg:space-y-3 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--color-brand] font-semibold">
					Referrals
				</h3>
				<p>Refer and earn 40% per referral.</p>
			</div>
			<div>
				<div className="flex justify-end">
					<button className="bg-[--color-brand] flex text-white py-3 px-6 rounded-lg items-center gap-2">
						<FaMoneyBill className="text-white text-2xl" /> Withdraw
					</button>
				</div>
				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-7 text-[--color-brand]">
					<div className="w-full h-[150px] flex flex-col justify-between p-5 bg-[--card-bg-1] rounded-xl">
						<span>
							<PiMoneyDuotone className="text-[--color-brand] text-lg" />
						</span>
						<p className="text-sm">Total Earned</p>
						<p className="text-xl font-semibold">₦5,000</p>
					</div>

					<div className="w-full h-[150px] flex flex-col justify-between p-5 bg-[--card-bg-2] rounded-xl">
						<span>
							<HiOutlineUsers className="text-[--color-brand] text-lg" />
						</span>
						<p className="text-sm">Referrals</p>
						<p className="text-xl font-semibold">{referralsData.length}</p>
					</div>

					{/* Copy buttons */}
					<CopyButton
						link="https://www.google.com/"
						type="link"
						additionalClasses=""
					/>
					<CopyButton
						link="ITEHHOH"
						type="code"
						additionalClasses="text-right"
					/>
				</div>
			</div>
		</main>
	);
}
