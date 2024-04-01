"use client";

import { BsX } from "react-icons/bs";

function CancelButton() {
	return (
		<div className="p-2 rounded-full cursor-pointer hover:bg-[--b1] transitioning">
			<BsX
				onClick={() => {
					window.history.back();
				}}
				className="text-3xl  text-[#ff9100] "
			/>
		</div>
	);
}

export default CancelButton;
