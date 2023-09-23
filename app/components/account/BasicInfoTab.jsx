import Image from "next/image";

const BasicInfoTab = () => {
	return (
		<div className="py-7 space-y-5 font-medium">
			<div className="flex gap-2 items-center">
				<div className="rounded-full h-[96px] w-[96px] overflow-hidden">
					<Image
						priority
						src="https://i.pravatar.cc/150?u=helios@g.com"
						alt="User"
						width={96}
						height={96}
						className="w-full h-full object-cover"
					/>
				</div>
				<button className="p-3">Tap to Change Avatar</button>
			</div>
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

export default BasicInfoTab;
