"use client";
import SecureRoute from "../../components/SecureRoute";

function Page() {
	return (
		<div className="min-h-screen flex  justify-center items-center  w-full">
			<p className="text-base md:text-lg lg:text-xl  text-[#C4C4C4] xl:text-2xl font-semibold  ">
				Coming Soon
			</p>
		</div>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
