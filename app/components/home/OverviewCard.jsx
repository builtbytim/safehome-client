"use client";

import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import Image from "next/image";
import FundsImage from "../../../assets/images/icons/Funds.svg";
import Savingsmage from "../../../assets/images/icons/SavingsLite.svg";
import TrendsImage from "../../../assets/images/icons/Trends.svg";
import LoanImage from "../../../assets/images/icons/loan.svg";
import ScrollLink from "../ScrollLink";

import { Topup, Withdraw, Receipt, ReceiptTopBar } from "./popups";
import { PopUpTopBar } from "../../components/security";

function OverviewCard() {
	const [showTopup, setShowTopup] = useState(false);
	const [showWithdraw, setShowWithdraw] = useState(false);
	const [showReceipt, setShowReceipt] = useState(false);

	const [receiptState, setReceiptState] = useState("");

	return (
		<section className="bg-white rounded-brand  md:p-8 space-y-4 lg:space-y-8">
			<div className="hidden md:flex flex-row justify-between items-center">
				<h1 className="text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
					{" "}
					Overview{" "}
				</h1>

				<div className=" md:hidden self-center">
					<PiDotsThreeOutlineVertical className="text-xl text-[--placeholder]" />
				</div>

				<div className="hidden self-center md:flex justify-center items-center space-x-4">
					<button
						className="btn-2 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center"
						onClick={() => setShowWithdraw(true)}
					>
						<AiOutlineMinus className="" />
						<span>Withdraw</span>
					</button>

					<button
						className="btn-1 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center"
						onClick={() => setShowTopup(true)}
					>
						<AiOutlinePlus className="" />
						<span>Add Fund</span>
					</button>
				</div>
			</div>

			<div>
				{/* Scroll Indicators  */}

				<div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
					<ScrollLink
						containerId="scroll-indicators"
						activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
						className="inline-block rounded-full border p-1 "
						to="my-funds"
					></ScrollLink>

					<ScrollLink
						containerId="scroll-indicators"
						activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
						className="inline-block rounded-full border p-1 "
						to="total-savings"
					></ScrollLink>

					<ScrollLink
						containerId="scroll-indicators"
						activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
						className="inline-block rounded-full border p-1 "
						to="total-investments"
					></ScrollLink>

					<ScrollLink
						containerId="scroll-indicators"
						activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
						className="inline-block rounded-full border p-1 "
						to="total-loans"
					></ScrollLink>
				</div>

				{/* Scroll Indicatots end  */}

				<div
					id="scroll-indicators"
					className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
				>
					<div
						id="my-funds"
						className="bg-[#8d4000]/10 min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
					>
						<div>
							<Image src={FundsImage} alt="my funds" width="48" />
						</div>

						<h2 className=" text-[--text-secondary] font-medium"> My Funds </h2>

						<p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
							₦0
						</p>
					</div>

					<div
						id="total-savings"
						className="bg-[#ff6100]/10 min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 "
					>
						<div>
							<Image src={Savingsmage} alt="my funds" width="48" />
						</div>

						<h2 className=" text-[--text-secondary] font-medium">
							{" "}
							Total Savings{" "}
						</h2>

						<p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
							₦0
						</p>
					</div>

					<div
						id="total-investments"
						className="bg-[#ff6100]/10 min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
					>
						<div>
							<Image src={TrendsImage} alt="my funds" width="48" />
						</div>

						<h2 className=" text-[--text-secondary] font-medium">
							{" "}
							Total Investments
						</h2>

						<p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
							₦0
						</p>
					</div>

					<div
						id="total-loans"
						className="bg-[#ff6100]/10 min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
					>
						<div>
							<Image src={LoanImage} alt="my funds" width="48" />
						</div>

						<h2 className=" text-[--text-secondary] font-medium">
							{" "}
							Total Loan
						</h2>

						<p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
							₦0
						</p>
					</div>
				</div>
			</div>

			<div className=" flex flex-row  md:hidden justify-between items-center space-x-4">
				<button
					className="btn-2 py-3 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center"
					onClick={() => setShowWithdraw(true)}
				>
					<AiOutlineMinus className="" />
					<span>Withdraw</span>
				</button>

				<button
					className="btn-1 py-3 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center"
					onClick={() => setShowTopup(true)}
				>
					<AiOutlinePlus className="" />
					<span>Add Fund</span>
				</button>
			</div>

			{/* POPUPS */}
			{showTopup && (
				<div className="fixed top-[-40px] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
					<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
						<PopUpTopBar
							close={() => setShowTopup(false)}
							title="Add funds"
							desc="Instantly add funds to this savings Goal."
						/>
					</div>
					<div className="pt-[230px] h-full">
						<Topup
							btnFunc={() => {
								setReceiptState("top-up");
								setShowReceipt(true);
							}}
						/>
					</div>
				</div>
			)}

			{showWithdraw && (
				<div className="fixed top-[-40px] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
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
			)}

			{showReceipt && (
				<div className="fixed top-[-40px] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
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
			)}
		</section>
	);
}

export default OverviewCard;
