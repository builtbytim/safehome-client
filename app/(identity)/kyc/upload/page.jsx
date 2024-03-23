"use client";

import SecureRoute from "../../../components/SecureRoute";
import KYCImageUpload from "../../../components/forms/KYCImageUpload";

function Page({ authenticatedUser, authenticationToken }) {
	return (
		<div className="w-full">
			<div className="space-y-6 w-full">
				<h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--header]">
					{" "}
					KYC Verification
				</h1>

				<p className="text-[--text]">Upload your documents below</p>

				<KYCImageUpload token={authenticationToken} user={authenticatedUser} />
			</div>
		</div>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
