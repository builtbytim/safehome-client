import React from "react";

import { BiSolidCopy } from "react-icons/bi";

const CopyButton = ({ link, type, additionalClasses }) => {
	return (
		<div className={`${additionalClasses}`}>
			<button className="rounded-[1rem] bg-[--b1] pl-7 space-x-7">
				<span className="inline-block">{link}</span>{" "}
				<span className="capitalize inline-block bg-white px-5 py-2">
					<BiSolidCopy className="inline-block" /> Copy {type}
				</span>
			</button>
		</div>
	);
};

export default CopyButton;
