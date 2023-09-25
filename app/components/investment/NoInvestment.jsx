import React from "react";

const NoInvestment = ({ investNowFunc }) => {
	return (
		<div className="border border-[--lines] p-10 rounded-xl">
			<div className="w-full max-w-[800px] mx-auto space-y-3 text-center">
				<h2 className="text-3xl text-[--text-brand] font-semibold">
					Start Investing
				</h2>
				<p className="text-[--text-secondary] text-lg">
					{
						"Start investing in verified oppurtunities. Let's help you get started."
					}
				</p>
				<div className="w-full max-w-[250px] mx-auto space-y-3 pt-3">
					<button
						className="block w-full py-2 px-3 text-white bg-[--text-brand] rounded-lg"
						onClick={() => investNowFunc()}
					>
						INVEST NOW
					</button>
					<button className="block w-full py-2 px-3 text-[--text-brand] border border-[--text-brand] rounded-lg">
						LEARN MORE
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoInvestment;
