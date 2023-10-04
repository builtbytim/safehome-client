"use client";
import { useState } from "react";

import { BiSolidCopy } from "react-icons/bi";
import { BsFillClipboardCheckFill } from "react-icons/bs";

const CopyButton = ({ link, type, additionalClasses }) => {
	const [showCopied, setShowCopied] = useState(false);

	const copy = (data) => {
		navigator.clipboard.writeText(data) || window.clipboardData.setData(data);
		setShowCopied(true);
		setTimeout(() => {
			setShowCopied(false);
		}, 1000);
	};
	return (
		<div className={`${additionalClasses} w-full`}>
			<button
				className="rounded-[1.3rem] bg-[--b1] pl-7 space-x-7 flex items-center w-auto text-sm"
				onClick={() => copy(link)}
			>
				<span className="block font-light">{link}</span>{" "}
				<span className="capitalize bg-white px-5 py-3 rounded-l-[1.3rem] flex items-center">
					<BiSolidCopy className="block mr-2" />{" "}
					<span className="hidden lg:block">Copy {type}</span>
				</span>
			</button>
			{showCopied && (
				<div className="fixed left-0 bottom-0 pb-8 px-5 w-full flex justify-center z-[1000] ">
					<p className="bg-white shadow py-3 px-5 text-center w-full max-w-[400px] rounded-lg z-[100] text-lg font-medium flex items-center justify-center gap-3 border border-[--green]">
						<BsFillClipboardCheckFill className="inline-block text-xl text-[--green]" />{" "}
						Copied {type} to Clipboard
					</p>
				</div>
			)}
		</div>
	);
};

export default CopyButton;
