import React from "react";
import { PiQuestionFill } from "react-icons/pi";
import cn from "classnames";

const ToggleCard = ({
	heading,
	text,
	recommended,
	active,
	toggleFunc,
	handleClick = null,
	readOnly = false,
	isLoading = false,
}) => {
	return (
		<div
			onClick={handleClick}
			className="flex w-full border-b border-[--lines] [--text-secondary] items-start hover:bg-[--b1] hover:cursor-pointer transitioning account-p py-6 lg:py-6  space-x-8"
		>
			<div className="space-y-2 w-full">
				<h3 className="tems-center text-lg leading-[110%] md:text-xl font-semibold w-full">
					{heading} <PiQuestionFill className="text-[--green] inline mb-1" />{" "}
					{recommended === "yes" && (
						<span className="text-[--placeholder] text-sm md:text-lg font-normal">
							(Recommended)
						</span>
					)}
				</h3>
				<p className="text-sm md:text-base">{text}</p>
			</div>

			{toggleFunc && (
				<div className="pt-1">
					<button
						title={
							readOnly
								? "You can't change this setting because it is required for your account."
								: ""
						}
						disabled={readOnly || isLoading}
						className={
							`h-[29.5px] w-[48px] rounded-3xl block p-[3px] ${
								active ? "bg-[--green] text-right" : "bg-[--lines] text-left"
							}` +
							cn({
								" cursor-pointer": !readOnly,
								" cursor-not-allowed opacity-40 pointer-events-none ":
									readOnly || isLoading,
							})
						}
						onClick={() => toggleFunc()}
					>
						<span className="bg-white rounded-full h-[23.5px] w-[23.5px] inline-block shadow"></span>
					</button>
				</div>
			)}
		</div>
	);
};

export default ToggleCard;
