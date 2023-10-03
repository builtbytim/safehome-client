"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import {
	DebitCardTab,
	BankDetailsTab,
	AddCard,
	AddBank,
} from "../../../components/card_and_bank";
import { PopUpTopBar } from "../../../components/security";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import picIcon from "../../../../assets/images/icons/picIcon.svg";

export default function Card() {
	const [tabState, setTabState] = useState(0);

	const [showAddCard, setShowAddCard] = useState(false);
	const [showAddBank, setShowAddBank] = useState(false);

	return (
		<main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--color-brand] font-semibold">
					Card & Bank Settings
				</h3>
				<p>Enter your card details to easily add funds to your account.</p>
			</div>

			<div className="space-y-8">
				<div className="flex gap-1">
					<button
						className={tabState === 0 ? "tab-button-active-2" : "tab-button-2"}
						onClick={() => setTabState(0)}
					>
						Debit Cards
					</button>
					<button
						className={tabState === 1 ? "tab-button-active-2" : "tab-button-2"}
						onClick={() => setTabState(1)}
					>
						Bank Details
					</button>
				</div>
				{tabState === 0 && <DebitCardTab />}
				{tabState === 1 && <BankDetailsTab />}
				<div>
					{tabState === 0 ? (
						<div className="py-10 text-center">
							<button
								className="w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
								onClick={() => setShowAddCard(true)}
							>
								Add New Card
							</button>
						</div>
					) : (
						<div className="py-10 text-center">
							<button
								className="w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
								onClick={() => setShowAddBank(true)}
							>
								Add New Bank
							</button>
						</div>
					)}
				</div>

				{showAddCard && (
					<div className="fixed top-[-40px] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
						<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
							<PopUpTopBar
								close={() => setShowAddCard(false)}
								title="Add a New Card"
								desc="Make sure you input the right information."
							/>
						</div>
						<div className="pt-[230px]">
							<AddCard closeFunc={() => setShowAddCard(false)} />
						</div>
					</div>
				)}
				{showAddBank && (
					<div className="fixed top-[-40px] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
						<div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
							<PopUpTopBar
								close={() => setShowAddBank(false)}
								title="Add a Bank"
								desc="Make sure you input the right information."
							/>
						</div>
						<div className="pt-[230px]">
							<AddBank closeFunc={() => setShowAddBank(false)} />
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
