"use client";

import Image from "next/image";

import BalanceIcon from "../../../assets/images/icons/investment_balance.svg";

const Balance = () => {
	return (
		<main className="p-5 md:p-8 bg-white rounded-2xl lg:rounded-3xl text-[--text-secondary]">
			<div className="space-y-6 border border-[--lines] rounded-xl lg:rounded-2xl p-6 md:p-10">
				<Image
					src={BalanceIcon}
					alt="balance"
					width={48}
					height={48}
					className="object-contain w-[48px] h-[48px]"
				/>

				<div className="space-y-2">
					<p className="font-medium lg:text-lg">Total Balance</p>
					<p className="font-medium text-2xl lg:text-3xl text-[--text-brand]">
						₦1,000,000.00
					</p>
				</div>
			</div>
		</main>
	);
};

export default Balance;
