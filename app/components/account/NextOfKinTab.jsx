import Image from "next/image";

const NextOfKinTab = () => {
	return (
		<div className="py-7 space-y-7 font-medium">
			<form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
				<div>
					<p className="account-form-text">First Name</p>
					<input
						type="text"
						placeholder="First Name"
						className="account-form-input"
					/>
				</div>
				<div>
					<p className="account-form-text">Last Name</p>
					<input
						type="text"
						placeholder="Last Name"
						className="account-form-input"
					/>
				</div>
				<div>
					<p className="account-form-text">Relationship</p>
					<input
						type="text"
						placeholder="e.g Brother"
						className="account-form-input"
					/>
				</div>
				<div>
					<p className="account-form-text">Email</p>
					<input
						type="text"
						placeholder="mail@email.com"
						className="account-form-input"
					/>
				</div>
				<div>
					<p className="account-form-text">Telephone</p>
					<input
						type="text"
						placeholder="+2348000000000"
						className="account-form-input"
					/>
				</div>
			</form>
		</div>
	);
};

export default NextOfKinTab;
