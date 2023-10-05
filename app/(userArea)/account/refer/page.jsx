"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { PiMoneyDuotone } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import picIcon from "../../../../assets/images/icons/picIcon.svg";
import CopyButton from "../../../components/CopyButton.jsx";
import ReferralHistory from "../../../components/refer/ReferralHistory";

import {
	Withdraw,
	Receipt,
	ReceiptTopBar,
} from "../../../components/home/popups";
import { PopUpTopBar } from "../../../components/security";

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
	const [showWithdraw, setShowWithdraw] = useState(false);
	const [showReceipt, setShowReceipt] = useState(false);

	const [receiptState, setReceiptState] = useState("");

	// Hide Popups when not clicked on
	const withdrawRef = useRef(null);
	const receiptRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (withdrawRef.current && !withdrawRef.current.contains(event.target)) {
				setShowWithdraw(false);
			}
			if (receiptRef.current && !receiptRef.current.contains(event.target)) {
				setShowReceipt(false);
				setShowTopup(false);
				setShowWithdraw(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [showWithdraw, showReceipt]);

	return (
		<main className=" space-y-2 lg:space-y-3 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--color-brand] font-semibold">
					Referrals
				</h3>
				<p>Refer and earn 40% per referral.</p>
			</div>
			<div className="space-y-5">
				<div className="flex justify-end">
					<button className="bg-[--color-brand] flex text-white py-3 px-6 rounded-lg items-center gap-2" onClick={()=>setShowWithdraw(true)}>
						<FaMoneyBill className="text-white text-2xl" /> Withdraw
					</button>
				</div>
				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-7 text-[--text-secondary]">
					<div className="w-full h-[150px] flex flex-col justify-between p-5 bg-[--card-bg-1] rounded-xl">
						<span>
							<PiMoneyDuotone className="text-[--text-secondary] text-lg" />
						</span>
						<p className="text-sm">Total Earned</p>
						<p className="text-xl font-semibold">₦5,000</p>
					</div>

					<div className="w-full h-[150px] flex flex-col justify-between p-5 bg-[--card-bg-2] rounded-xl">
						<span>
							<HiOutlineUsers className="text-[--text-secondary] text-lg" />
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
						additionalClasses="flex md:justify-end"
					/>
				</div>
			</div>
			<ReferralHistory data={referralsData} />

			{showWithdraw && (
				<div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
					<div
						className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
						ref={withdrawRef}
					>
						<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
							<PopUpTopBar
								close={() => setShowWithdraw(false)}
								title="Withdraw Funds"
								desc="Withdraw funds to your desired destination."
							/>
						</div>
						<div className="pt-[230px] h-full">
							<Withdraw
								btnFunc={() => {
									setReceiptState("withdrawal");
									setShowReceipt(true);
								}}
							/>
						</div>
					</div>
				</div>
			)}

			{showReceipt && (
				<div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
					<div
						className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
						ref={receiptRef}
					>
						<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
							<ReceiptTopBar
								close={() => setShowReceipt(false)}
								title="Transaction Type"
								desc={receiptState}
							/>
						</div>
						<div className="pt-[230px] h-full">
							<Receipt
								btnFunc={() => console.log("withdraw")}
								type={receiptState}
							/>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
