import config from "../../../utils/config";
import VerifyEmail from "../../../components/forms/VerifyEmail";

export const metadata = {
	name: "Verify email",
	description: config.app.description,
};

async function Page({ params }) {
	return (
		<div className=" space-y-6">
			<div className="">
				<h1 className="font-semibold  text-xl lg:text-2xl text-left text-[--header]">
					{" "}
					Email Verification
				</h1>
			</div>

			<VerifyEmail email={decodeURIComponent(params.email)} />
		</div>
	);
}

export default Page;
