"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import picIcon from "../../../../assets/images/icons/picIcon.svg";

export default function Update() {
	const [isHidden, setIsHidden] = useState(true);
	const fileRef = useRef(null);

	const openFile = () => {
		// `current` points to the mounted file input element
		fileRef.current.click();
	};

	const [showCalender, setShowCalender] = useState(false);
	const [calenderInputText, setCalenderInputText] = useState("DD/MM/YYYY");
	const [dateState, setDateState] = useState(new Date());
	const changeDate = (e) => {
		setDateState(e);
	};

	// Hide calender when not clicked on
	const calenderRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (calenderRef.current && !calenderRef.current.contains(event.target)) {
				setShowCalender(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [showCalender]);

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

			<form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 w-full">
				<div className="md:col-span-2">
					<p className="account-form-text">Residential Address</p>
					<input
						type="text"
						placeholder="Your Address"
						className="account-form-input"
					/>
				</div>
				<div className="md:col-span-1">
					<p className="account-form-text">State</p>
					<div className="account-form-icon-container">
						<input type="text" placeholder="e.g Lagos" />
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
				<div className="md:col-span-1 relative">
					<p className="account-form-text">Date of Birth</p>
					<div className="account-form-icon-container">
						<input
							type="button"
							placeholder="Individual"
							value={moment(dateState).format("DD/MM/YYYY")}
							onClick={() => setShowCalender((prev) => (prev = !prev))}
							className="text-left cursor-pointer"
						/>
						<button
							type="button"
							onClick={() => setShowCalender((prev) => (prev = !prev))}
						>
							{showCalender ? (
								<PiCaretUpBold className="w-full h-full text-[--text-secondary]" />
							) : (
								<PiCaretDownBold className="w-full h-full text-[--text-secondary]" />
							)}
						</button>
					</div>
					{showCalender && (
						<div
							className="absolute left-0 top-[100%] w-full pt-3 h-auto"
							ref={calenderRef}
						>
							<Calendar value={dateState} onChange={changeDate} />
						</div>
					)}
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
