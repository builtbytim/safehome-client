"use client";

import { useState } from "react";

import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

const dropdownData = [
	{ text: "My Funds" },
	{ text: "Savings Balance" },
	{ text: "Debit card 531212 XXXX XXXX 1234" },
];

const InvestNow = ({ data }) => {
	const [toggleActive, setToggleActive] = useState(false);

	const toggleFunc = () => {
		setToggleActive((prev) => (prev = !prev));
	};

	const [showDropdown, setShowDropdown] = useState(false);
	const [dropdownInputText, setDropdownInputText] = useState(
		dropdownData[0].text
	);

	const changeInputData = (data) => {
		setDropdownInputText(data);
		setShowDropdown(false);
	};

	return (
		<div className="px-7 pb-8 space-y-8 text-[--text-secondary]">
			{/* <div className="py-3 px-7 space-y-2 text-[--text-secondary]">
				<h3 className="text-3xl text-[--text-brand] font-semibold">
					Investment Now
				</h3>
				<p>Use the form below to purchase enough investment units.</p>
			</div> */}

			<div className="flex justify-between gap-5">
				<p className="text-xl leading-[1.65rem] max-h-[3.3rem] font-medium text-[--text-secondary] capitalize">
					{data.title}
				</p>
				<div className="text-right">
					<p className="text-[--text-brand] font-medium text-2xl">
						₦{data.value}
					</p>
					<p className="text-[--placeholder] font-light mt-[-8px]">Per unit</p>
				</div>
			</div>

			<form className="space-y-5">
				<div>
					<p className="form-text">How many units?</p>
					<input
						type="text"
						placeholder="Total number of unit"
						className="form-input"
					/>
				</div>
				<div>
					<p className="form-text">Amount to pay ₦</p>
					<input
						type="text"
						placeholder="Amount auto-generates due to units."
						className="form-input"
					/>
				</div>
				<div className="relative">
					<p className="form-text">Fund Source</p>
					<div className="account-form-icon-container">
						<input
							type="button"
							placeholder="Individual"
							value={dropdownInputText}
							onClick={() => setShowDropdown((prev) => (prev = !prev))}
							className="text-left cursor-pointer"
						/>
						<button
							type="button"
							onClick={() => setShowDropdown((prev) => (prev = !prev))}
						>
							{showDropdown ? (
								<PiCaretUpBold className="w-full h-full text-[--text-secondary]" />
							) : (
								<PiCaretDownBold className="w-full h-full text-[--text-secondary]" />
							)}
						</button>
					</div>
					{/* dropdown */}
					{showDropdown && (
						<div className="absolute left-0 top-[100%] w-full pt-3 h-auto">
							<div className="bg-white w-full border border-[--lines] rounded">
								{dropdownData.map((data, index) => (
									<button
										key={index}
										className="block w-full text-left px-5 py-4 hover:bg-[--color-brand] hover:text-white"
										type="button"
										onClick={() => {
											changeInputData(data.text);
										}}
									>
										{data.text}
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</form>
			<div className="flex gap-3">
				<div className="block w-[51px] h-[31px] bg-[--lines] rounded-3xl">
					<button
						className={`h-[31px] w-[53px] rounded-3xl block p-[3px] ${
							toggleActive
								? "bg-[--green] text-right"
								: "bg-[--lines] text-left"
						}`}
						onClick={() => toggleFunc()}
					>
						<span className="bg-white rounded-full h-[25px] w-[25px] inline-block shadow"></span>
					</button>
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur. Vitae urna placerat augue erat
					in pellentesque. Sed condimentum neque in in egestas eu congue at
					nisi. Turpis pharetra nibh morbi diam eget suspendisse non
					scelerisque. Lacus morbi turpis tristique eleifend sed gravida elit
					fermentum.
				</p>
			</div>

			<div className="py-5">
				<button className="w-full text-white bg-[--text-brand] py-3 px-5 shadow rounded">
					Invest Now
				</button>
			</div>
		</div>
	);
};

export default InvestNow;
