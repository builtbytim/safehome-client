import React from "react";

const NoInvestment = ({ investNowFunc }) => {
	return (
		<div className="border border-[--lines] p-10 rounded-xl">
			<div className="w-full max-w-[800px] mx-auto space-y-3 text-center">
				<h2 className="text-xl md:text-2xl lg:text-3xl text-[--text-brand] font-semibold">
					Start Investing
				</h2>
				<p className="text-[--text] text-sm md:text-base">
					Start investing in verified oppurtunities. Let&apos;s help you get
					started.
				</p>
				<div className="w-full  mx-auto space-y-3 pt-3 max-w-md">
					<button
						className="btn-1-v2  w-full  block"
						onClick={() => investNowFunc()}
					>
						INVEST NOW
					</button>
					<button className="btn-2-v2 w-full ">LEARN MORE</button>
				</div>
			</div>
		</div>
	);
};

export default NoInvestment;
