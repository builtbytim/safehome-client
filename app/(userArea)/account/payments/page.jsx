"use client";

import { useState, useRef } from "react";
import Overlay from "../../../components/Overlay2";
import SecureRoute from "../../../components/SecureRoute";
import {
	DebitCardTab,
	BankDetailsTab,
	AddCard,
	AddBank,
} from "../../../components/card_and_bank";
import { PopUpTopBar } from "../../../components/security";
import useTabParam from "../../../utils/hooks/useTabParam";

function Page({ authenticatedUser, authenticationToken }) {
	const { tab: tabState, setTab: setTabState } = useTabParam("tab", 0);
	const toggleRef = useRef();
	const [showAddCard, setShowAddCard] = useState(false);
	const [showAddBank, setShowAddBank] = useState(false);

	return (
		<main className=" space-y-8 lg:space-y-8 text-[--text] border border-[--lines] account-p h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="popup-header">Card & Bank Settings</h3>
				<p>Enter your card details to easily add funds to your account.</p>
			</div>

			<div className="space-y-8">
				<div className="flex justify-between gap-[2px]">
					<button
						className={
							" md:w-full " +
							(tabState === 0
								? "account-tab-button-active"
								: "account-tab-button")
						}
						onClick={() => setTabState(0)}
					>
						Debit Cards
					</button>

					<button
						className={
							" md:w-full " +
							(tabState === 1
								? "account-tab-button-active"
								: "account-tab-button")
						}
						onClick={() => setTabState(1)}
					>
						Bank Details
					</button>
				</div>

				{tabState === 0 && <DebitCardTab token={authenticationToken} />}
				{tabState === 1 && <BankDetailsTab token={authenticationToken} />}
				<div className="pt-10">
					{tabState === 0 ? (
						<div className="py-10 text-center">
							<button
								className="btn-1 max-w-[400px]"
								onClick={() => setShowAddCard(true)}
							>
								Add New Card
							</button>
						</div>
					) : tabState == 1 ? (
						<div className="py-10 text-center">
							<button
								className="btn-1 max-w-[400px]"
								onClick={() => setShowAddBank(true)}
							>
								Add New Bank
							</button>
						</div>
					) : null}
				</div>

				{showAddCard && (
					<div className="fixed  left-0 w-full  bg-black/50 z-20">
						<Overlay z={3}>
							<div
								className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
								ref={toggleRef}
							>
								<div className="  w-full md:w-[493px] bg-white ">
									<PopUpTopBar
										close={() => setShowAddCard(false)}
										title="Add a New Card"
										desc="Enter your debit card details."
									/>
								</div>
								<div className="pt-6">
									<AddCard
										token={authenticationToken}
										closeFunc={() => setShowAddCard(false)}
									/>
								</div>
							</div>
						</Overlay>
					</div>
				)}
				{showAddBank && (
					<div className="fixed  left-0 w-full  bg-black/50 z-20">
						<Overlay z={3}>
							<div
								className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
								ref={toggleRef}
							>
								<div className="  w-full md:w-[493px] bg-white ">
									<PopUpTopBar
										close={() => setShowAddBank(false)}
										title="Add a Bank"
										desc="Enter your bank details."
									/>
								</div>
								<div className="pt-6">
									<AddBank
										token={authenticationToken}
										closeFunc={() => setShowAddBank(false)}
									/>
								</div>
							</div>
						</Overlay>
					</div>
				)}
			</div>
		</main>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
