"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import picIcon from "../../../../assets/images/icons/picIcon.svg";

export default function Security() {
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
					Security
				</h3>
				<p>
					You can reach us via our phone numbers, social media profiles, email
					etc.
				</p>
			</div>
		</main>
	);
}
