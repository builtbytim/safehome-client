"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import { BsCheck } from "react-icons/bs";
import picIcon from "../../../../assets/images/icons/picIcon.svg";

export default function Notification() {
	const [isHidden, setIsHidden] = useState(true);
	const fileRef = useRef(null);

	const openFile = () => {
		fileRef.current.click();
	};

	return (
		<main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--color-brand] font-semibold">
					Notification
				</h3>
				<p>Manage the kind of messages you get from safeHome</p>
			</div>

			<div className="space-y-8 max-w-[650px]">
				<div className="space-y-4">
					<div>
						<h3 className="font-medium text-xl pb-1">Login Alerts</h3>
						<p>Notifications on successful log ins to your account</p>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="radio-btn-container">
								Push Notification
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
						<div>
							<label className="radio-btn-container">
								Email
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<div>
						<h3 className="font-medium text-xl pb-1">
							Investments & Savings Alerts
						</h3>
						<p>Notifications on new opportunities and purchased investments</p>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="radio-btn-container">
								Push Notification
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
						<div>
							<label className="radio-btn-container">
								Email
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<div>
						<h3 className="font-medium text-xl pb-1">Transaction Alerts</h3>
						<p>Notifications on new opportunities and purchased investments</p>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="radio-btn-container">
								Push Notification
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
						<div>
							<label className="radio-btn-container">
								Email
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<div>
						<h3 className="font-medium text-xl pb-1">Transaction Alerts</h3>
						<p>Notifications on new opportunities and purchased investments</p>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="radio-btn-container">
								Push Notification
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
						<div>
							<label className="radio-btn-container">
								Email
								<input type="checkbox" />
								<span className="checkmark">
									<BsCheck className="text-white w-full h-full" />
								</span>
							</label>
						</div>
					</div>
				</div>

				<div className="py-10 text-center">
					<button className="w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg">
						Save Changes
					</button>
				</div>
			</div>
		</main>
	);
}
