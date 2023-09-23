"use client";

import { useState } from "react";
import Image from "next/image";
import HideIcon from "../../../assets/images/icons/password-hide.svg";
import ShowIcon from "../../../assets/images/icons/password-show.svg";

const PasswordTab = () => {
	const [isHidden1, setIsHidden1] = useState(true);
	const [isHidden2, setIsHidden2] = useState(true);
	const [isHidden3, setIsHidden3] = useState(true);
	return (
		<div className="py-7 font-medium">
			<form className="grid grid-cols-1 gap-5 md:gap-7 max-w-[500px]">
				<div>
					<p className="account-form-text">Old Password</p>
					<div className="account-form-icon-container">
						<input
							type={isHidden1 ? "password" : "text"}
							placeholder="Old Password"
						/>
						<button type="button" onClick={() => setIsHidden1((prev) => !prev)}>
							<Image
								priority
								src={isHidden1 ? ShowIcon : HideIcon}
								alt="User"
								width="auto"
								height="auto"
								className="w-full h-full object-cover"
							/>
						</button>
					</div>
				</div>
				<div>
					<p className="account-form-text">New Password</p>
					<div className="account-form-icon-container">
						<input
							type={isHidden2 ? "password" : "text"}
							placeholder="New Password"
						/>
						<button type="button" onClick={() => setIsHidden2((prev) => !prev)}>
							<Image
								priority
								src={isHidden2 ? ShowIcon : HideIcon}
								alt="User"
								width="auto"
								height="auto"
								className="w-full h-full object-cover"
							/>
						</button>
					</div>
				</div>
				<div>
					<p className="account-form-text">Confirm Password</p>
					<div className="account-form-icon-container">
						<input
							type={isHidden3 ? "password" : "text"}
							placeholder="Confirm Password"
						/>
						<button type="button" onClick={() => setIsHidden3((prev) => !prev)}>
							<Image
								priority
								src={isHidden3 ? ShowIcon : HideIcon}
								alt="User"
								width="auto"
								height="auto"
								className="w-full h-full object-cover"
							/>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PasswordTab;
