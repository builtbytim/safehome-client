import React from "react";

import OTPField from "../forms/branded/OTPField";

const SMSAuthenticator = ({ saveFunc, closeFunc }) => {
	return (
		<div className="px-8 py-8 flex flex-col items-center gap-8 text-[--primar]">
			<p className="">
				Enter the Code sent to your registered number at{" "}
				<span className="text-[--header]">+234 800 000 0000</span>
			</p>
			<div className="w-full px-7 relative">
				<OTPField />
			</div>
			<button className="text-[--header] p-3 text-center font-medium text-lg">
				RESEND CODE
			</button>
			<div className="space-y-3 w-full pt-5 pb-3">
				<button
					className="block w-full py-3 px-5 rounded text-white bg-[--color-brand] border border-[--color-brand]"
					onClick={() => saveFunc()}
				>
					Save
				</button>
				<button
					className="block w-full py-3 px-5 rounded text-[--header] border border-[--color-brand]"
					onClick={() => closeFunc()}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default SMSAuthenticator;
