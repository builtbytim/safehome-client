import Image from "next/image";

const SecurityQuestionAuth = ({ saveFunc, closeFunc }) => {
	return (
		<div className="px-7 pb-7 flex flex-col justify-between gap-5 h-full">
			<form className="space-y-5">
				<div>
					<p className="account-form-text">Security Question</p>
					<input
						type="text"
						placeholder="e.g What is the name of your first pet"
						className="account-form-input"
					/>
				</div>
				<div>
					<p className="account-form-text">Correct Answer</p>
					<input
						type="text"
						placeholder="e.g Jack"
						className="account-form-input"
					/>
				</div>
			</form>
			<div className="space-y-3 w-full pt-5 pb-3">
				<button
					className="block w-full py-3 px-5 rounded text-white bg-[--color-brand] border border-[--color-brand]"
					onClick={() => saveFunc()}
				>
					Save
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

export default SecurityQuestionAuth;
