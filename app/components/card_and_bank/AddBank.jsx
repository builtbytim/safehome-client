import React from "react";

const AddBank = ({ closeFunc }) => {
	return (
		<div className="px-8 pb-5 space-y-5 text-[--primary]">
			<form className="space-y-5">
				<div>
					<p className="form-text">Bank Name</p>
					<input type="text" placeholder="Select Bank" className="form-input" />
				</div>
				<div>
					<p className="form-text">Account Number</p>
					<input type="text" placeholder="0000000000" className="form-input" />
				</div>
				<div>
					<p className="bg-[--b1] py-3 px-5 rounded-lg shadow">
						ADEWALE ADEPOJU
					</p>
				</div>
			</form>
			<div className="space-y-3 w-full pt-8 pb-3">
				<button className="block w-full py-3 px-5 rounded text-white bg-[--color-brand] border border-[--color-brand]">
					Add Bank
				</button>
				<button
					className="block w-full py-3 px-5 rounded text-[--color-brand] border border-[--color-brand]"
					onClick={() => closeFunc()}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default AddBank;
