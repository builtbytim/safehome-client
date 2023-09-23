"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import picIcon from "../../../../assets/images/icons/picIcon.svg";

export default function Update() {
	const [isHidden, setIsHidden] = useState(true);
	const fileRef = useRef(null);

	const openFile = () => {
		// `current` points to the mounted file input element
		fileRef.current.click();
	};
	return (
		<main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--color-brand] font-semibold">
					Profile Information
				</h3>
				<p>
					Simply fill and upload the required information below, and we’ll take
					it from here.
				</p>
			</div>

			<form className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-7 w-full">
				<div className="col-span-3">
					<p className="account-form-text">Residential Address</p>
					<input
						type="text"
						placeholder="Individual"
						className="account-form-input"
					/>
				</div>
				<div className="col-span-2">
					<p className="account-form-text">State</p>
					<div className="account-form-icon-container">
						<input type="text" placeholder="Individual" />
						<button
							type="button"
							onClick={() => setIsHidden((prev) => (prev = !prev))}
						>
							{isHidden ? (
								<PiCaretDownBold className="w-full h-full text-[--text-secondary]" />
							) : (
								<PiCaretUpBold className="w-full h-full text-[--text-secondary]" />
							)}
						</button>
					</div>
				</div>
			</form>

			<div className="w-full space-y-2">
				<p className="grid grid-cols-1 gap-5 md:gap-7 max-w-[480px] text-medium">
					Upload Valid ID Image (Int’l passport, Nimc - National ID Card,
					Driver’s License, Voter’s Card)
				</p>
				<div className="rounded w-full h-[200px] bg-[--b1] flex items-center justify-center gap-3 border border-[--lines]">
					<Image
						priority
						src={picIcon}
						alt="User"
						width={18}
						height={18}
						className="w-[18px] h-[18px] object-contain"
					/>
					<button onClick={() => openFile()}>Upload Image</button>
					<input
						type="file"
						id="file"
						ref={fileRef}
						style={{ display: "none" }}
					/>
				</div>
			</div>

			<div className="py-10 text-center">
				<button className="w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg">
					Update Profile
				</button>
			</div>
		</main>
	);
}
