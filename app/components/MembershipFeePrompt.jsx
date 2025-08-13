"use client";

import Overlay from "./Overlay3";
import { useDataStore, useUiStore } from "../utils/store";
import useBodyScrollLock from "../utils/hooks/useBodyScrollLock";
import { useMutation } from "react-query";
import config from "../utils/config";
import { createFetcher } from "../utils/fetchUtils";
import queryKeys from "../utils/queryKeys";
import Spinner from "./Spinner";

export default function MembershipFeePrompt() {
	const user = useDataStore((state) => state.data.usr);
	useBodyScrollLock(user && !user.hasPaidMembershipFee);

	const token = useDataStore((state) => state.data.token);

	const toggleSuperOverlay = useUiStore((state) => state.toggleSuperOverlay);

	// pay membership fee mutation

	const {
		mutate: payMembershipFee,
		isLoading: payMembershipFeeLoading,
		isError: payMembershipFeeError,
		isSuccess: payMembershipFeeSuccess,
		error: payMembershipFeeErrorData,
	} = useMutation({
		mutationFn: createFetcher({
			url: config.apiPaths.payMembershipFee,
			method: "POST",
			auth: token,
		}),

		mutationKey: [queryKeys.payMembershipFee, token],

		onSuccess: (data) => {
			toggleSuperOverlay(true);
			window.location.href = data["redirect_url"];
		},

		onError: (err) => {
			console.log(err);
		},
	});

	function handlePayClick() {
		if (user && !user.hasPaidMembershipFee && !payMembershipFeeLoading) {
			payMembershipFee();
		}
	}

	return null;

	if (user && !user.hasPaidMembershipFee && !payMembershipFeeSuccess) {
		return (
			<Overlay z={4}>
				<div className="w-[90%] max-w-sm bg-white mt-4 pt-6 md:pt-10 pb-6 px-4 rounded-[8px] ">
					<div className="flex flex-row text-[--header] justify-start  items-center">
						<h1 className=" font-semibold text-base md:text-lg xl:text-xl   self-center  capitalize">
							Complete your Membership process
						</h1>
					</div>

					{payMembershipFeeError && (
						<div className="mt-2">
							<p className="text-sm text-[--text-danger]">{payMembershipFeeErrorData?.message}</p>
						</div>
					)}

					<p className="text-[--text] mt-3  text-sm md:text-base first-letter:uppercase">
						Hello there! We are glad you signed up for SafeHome. However, you must pay a one-time membership fee of{" "}
						<span className="font-semibold">₦5,000</span> to complete your membership process. You will be able to use
						all of SafeHome&apos;s features after you make the payment.
					</p>

					<div className="mt-4 flex flex-row justify-end items-center w-full">
						<button onClick={handlePayClick} disabled={payMembershipFeeLoading} className="btn-1 ">
							{payMembershipFeeLoading ? <Spinner /> : "Pay Now"}
						</button>
					</div>
				</div>
			</Overlay>
		);
	}

	return null;
}
