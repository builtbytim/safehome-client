import React from "react";

const InvestNow = ({ data }) => {
	return (
		<div className="px-7 pb-8 space-y-8 text-[--text-secondary]">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--text-brand] font-semibold">
					Invest Now
				</h3>
				<p>Use the form below to purchase enough investment units.</p>
			</div>

			<div className="flex justify-between gap-5">
				<p className="text-lg leading-[1.6rem] max-h-[3.2rem] font-medium text-[--text-secondary] capitalize">
					{data.title}
				</p>
				<div className="text-right">
					<p className="text-[--text-brand] font-medium text-xl">
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
				<div>
					<p className="form-text">Fund Source</p>
					<input
						type="text"
						placeholder="Select a Funding Source"
						className="form-input"
					/>
				</div>
			</form>
			<div className="flex gap-3">
				<div className="block w-[51px] h-[31px] bg-[--lines] rounded-3xl">
					<button className="block w-[51px] h-[31px] bg-[--lines] rounded-3xl p-[4px]">
						<span className="block w-[23px] h-[23px] bg-white rounded-full"></span>
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
