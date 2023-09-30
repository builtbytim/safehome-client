import React from "react";

const Receipt = ({ type, btnFunc }) => {
	return (
		<div className="px-7 space-y-3 pb-12">
			<div className="space-y-3">
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Date</p>
					<p>18 June 2023, 12:56:39</p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Ammount</p>
					<p>₦20,000.00</p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">
						Balance after transaction
					</p>
					<p>₦480,000.00</p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Account Name</p>
					<p>Akinlewu </p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Session ID</p>
					<p>090110230618125643785557 </p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Status</p>
					<p className="text-[--green] font-semibold">Completed </p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Account Number</p>
					<p>2008400000 </p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">PAyment Reference</p>
					<p>NYELCQDSNRN </p>
				</div>
				<div className="border-b border-[--lines] py-4 flex justify-between items-center gap-5 px-1">
					<p className="text-[--placeholder] font-light">Fee</p>
					<p>₦35 </p>
				</div>
			</div>
			<div className="py-8">
				<button
					className="w-full text-white bg-[--color-brand] py-3 px-5 shadow rounded"
					// onClick={() => btnFunc()}
				>
					{type === "withdrawal" ? "Withdraw" : "Top-up"}
				</button>
			</div>
			{/* <div className="flex justify-between gap-5">
				<div className="py-4 space-y-1">
					<p className="text-[--placeholder] font-light">Session ID</p>
					<p>090110230618125643785557</p>
				</div>
				<div className="py-4 space-y-1">
					<p className="text-[--placeholder] font-light">Status</p>
					<p>Complete</p>
				</div>
			</div> */}
		</div>
	);
};

export default Receipt;
