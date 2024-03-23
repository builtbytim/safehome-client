import config from "../../../utils/config";
import ConfirmPasswordReset from "../../../components/forms/ConfirmPasswordReset";

export const metadata = {
	name: "Confirm reset password",
	description: config.app.description,
};

async function Page() {
	return (
		<div className=" space-y-6 w-full">
			<div className="">
				<h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--header]">
					Confirm Password Reset
				</h1>
			</div>

			<ConfirmPasswordReset />
		</div>
	);
}

export default Page;
