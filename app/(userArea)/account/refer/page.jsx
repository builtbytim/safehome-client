"use client";

import { useState, useRef } from "react";
import { PiMoneyDuotone } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import CopyButton from "../../../components/CopyButton.jsx";
import ReferralHistory from "../../../components/refer/ReferralHistory";
import ScrollLink from "../../../components/ScrollLink";
import { createFetcher } from "../../../utils/fetchUtils.js";
import queryKeys from "../../../utils/queryKeys";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNotifyStore } from "../../../utils/store";
import config from "../../../utils/config";
import LoadingView from "../../../components/LoadingView.jsx";
import ErrorMessageView from "../../../components/ErrorMessageView.jsx";
import SecureRoute from "../../../components/SecureRoute.jsx";
import { NumericFormat } from "react-number-format";
import { useRouter, usePathname } from "next/navigation.js";

import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";

function Page({ authenticatedUser, authenticationToken: token }) {
	const setNotify = useNotifyStore((state) => state.setNotify);
	const router = useRouter();
	const pathname = usePathname();
	const queryClient = useQueryClient();

	const {
		mutate: withdrawBonus,
		isLoading: withdrawIsLoading,
		isError: withdrawIsError,
		data: withdrawData,
		isSuccess: withdrawIsSuccess,
	} = useMutation({
		mutationKey: [queryKeys.withdrawMyReferralBonus, token],
		mutationFn: createFetcher({
			url: config.apiPaths.withdrawMyReferralBonus,
			method: "POST",
			auth: token,
		}),

		onSuccess(data) {
			queryClient.invalidateQueries(queryKeys.getReferralProfile);
			queryClient.invalidateQueries(queryKeys.getWallet);

			setNotify({
				show: true,
				content: "We have transferred your referral bonus to your wallet.",
				onAcceptText: "View receipt",
				onAccept: () => {
					router.push(`${pathname}?showTx=true&txRef=${data.reference}`);
				},

				OnRejectText: "Close",
			});
		},
		onError(error) {
			setNotify({
				show: true,
				content: error.message,
			});
		},
	});

	const { isLoading, isError, refetch, data, isSuccess } = useQuery({
		queryKey: [queryKeys.getReferralProfile, token],
		queryFn: createFetcher({
			url: config.apiPaths.getReferralProfile,
			method: "GET",
			auth: token,
		}),

		// onSuccess(d) {
		//   console.log(d);
		// },
	});

	function handleWithdrawClick() {
		if (withdrawIsLoading) return;

		if (data.referralBonus < 5000) {
			setNotify({
				show: true,
				content: "You have not earned up to ₦5,000",
			});
			return;
		}

		setNotify({
			show: true,
			isConfirmation: true,
			content: "Proceed with withdrawal?",
			onAccept: withdrawBonus,
			onAcceptText: "Withdraw",
			onRejectText: "Cancel",
		});
	}

	return (
		<main className=" space-y-2 lg:space-y-3 text-[--text] border border-[--lines] account-p h-full min-h-[80vh] rounded-2xl">
			<div className="pb-0 space-y-1">
				<h3 className="popup-header">Referrals</h3>
				<p>Refer and earn ₦2,000 per referral.</p>
			</div>

			{isLoading && (
				<div className="flex py-16 justify-center items-center  w-full">
					<LoadingView />
				</div>
			)}

			{isError && (
				<div className="flex py-16 justify-center items-center  w-full">
					<ErrorMessageView
						message="Something went wrong. Please try again."
						refetch={refetch}
					/>
				</div>
			)}

			{isSuccess && data && (
				<section className="space-y-2">
					<div className="space-y-2">
						<div className="flex justify-end">
							<button
								disabled={data.referralBonus <= 0}
								onClick={handleWithdrawClick}
								className="btn-1 max-w-[150px] bg-[--button] flex text-white text-center justify-center items-center py-3 px-6 rounded-lg  space-x-2"
							>
								<FaMoneyBill className="text-white text-2xl" />
								<span>Withdraw</span>
							</button>
						</div>
						{/* Cards */}

						<div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
							<ScrollLink
								containerId="refer-scroll-indicators"
								activeClass="scroll-link-active"
								className="scroll-link"
								to="total-balance"
							></ScrollLink>
							<ScrollLink
								containerId="refer-scroll-indicators"
								activeClass="scroll-link-active"
								className="scroll-link"
								to="referrals"
							></ScrollLink>
						</div>
						<div
							id="refer-scroll-indicators"
							className="flex   flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
						>
							<div
								id="total-balance"
								className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch flex flex-col justify-between p-6 bg-[--card-bg-1] rounded-xl space-y-6"
							>
								<span>
									<PiMoneyDuotone className="text-[--text] text-4xl" />
								</span>
								<p className="text-base">Total Earned</p>
								<p className="text-2xl font-bold">
									<NumericFormat
										value={data.referralBonus}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"₦ "}
									/>
								</p>
							</div>

							<div
								id="referrals"
								className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch flex flex-col justify-between p-6 bg-[--card-bg-1] rounded-xl space-y-6"
							>
								<span>
									<HiOutlineUsers className="text-[--text] text-4xl" />
								</span>
								<p className="text-base">Referrals</p>
								<p className="text-2xl font-bold">
									<NumericFormat
										value={data.referralCount}
										displayType={"text"}
										thousandSeparator={true}
									/>
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 text-[--text] pt-4">
							{/* Copy buttons */}
							<CopyButton
								link={data.referralLink}
								type="link"
								additionalClasses=""
							/>
							{/* <CopyButton
                link={data.referralCode}
                type="code"
                additionalClasses="flex md:justify-end"
              /> */}
						</div>
					</div>
					<ReferralHistory proceed={isSuccess} token={token} />
				</section>
			)}
		</main>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
