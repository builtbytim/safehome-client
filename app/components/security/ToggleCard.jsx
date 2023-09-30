import React from "react";

import { PiQuestionFill } from "react-icons/pi";

const ToggleCard = ({ heading, text, recommended, active, toggleFunc }) => {
	return (
		<div className="flex w-full pb-5 border-b border-[--lines] tex-[--text-secondary] items-center">
			<div className="space-y-2 w-full">
				<h3 className="tems-center text-lg font-medium w-full">
<<<<<<< HEAD
					{heading} <PiQuestionFill className="text-[--green] inline mb-1" />{" "}
=======
					{heading}{" "}
					<PiQuestionFill className="text-[--color-green] inline mb-1" />{" "}
>>>>>>> a093b9abec02d8f87703b932daae9f59e68fe111
					{recommended === "yes" && (
						<span className="text-[--placeholder]">(Recommended)</span>
					)}
				</h3>
				<p>{text}</p>
			</div>

			<div className="">
				<button
					className={`h-[31px] w-[53px] rounded-3xl block p-[3px] ${
<<<<<<< HEAD
						active ? "bg-[--green] text-right" : "bg-[--lines] text-left"
=======
						active ? "bg-[--color-green] text-right" : "bg-[--lines] text-left"
>>>>>>> a093b9abec02d8f87703b932daae9f59e68fe111
					}`}
					onClick={() => toggleFunc()}
				>
					<span className="bg-white rounded-full h-[25px] w-[25px] inline-block shadow"></span>
				</button>
			</div>
		</div>
	);
};

export default ToggleCard;
