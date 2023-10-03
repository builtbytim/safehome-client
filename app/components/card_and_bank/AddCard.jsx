import React from "react";

const AddCard = ({ closeFunc }) => {
	return (
		<div className="px-8 pb-5 space-y-5 text-[--primary]">
			<form className="space-y-5">
				<div>
					<p className="form-text">Card Number</p>
					<input
						type="text"
						placeholder="Total number of unit"
						className="form-input"
					/>
				</div>
				<div className="grid grid-cols-2 gap-5">
					<div>
						<p className="form-text">Expiry Date</p>
						<input type="text" placeholder="DD/YY" className="form-input" />
					</div>
					<div>
						<p className="form-text">CVV</p>
						<input type="text" placeholder="011" className="form-input" />
					</div>
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

export default AddCard;
