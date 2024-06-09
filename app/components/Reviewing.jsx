"use client";

import KycSuccess from "../../assets/images/kycsuccess.png";
import Image from "next/image";
import useCountdown from "../utils/hooks/useCountdown";
import { useRouter } from "next/navigation";
import config from "../utils/config";

function Reviewing() {
	const router = useRouter();

	function onCountEnd() {
		router.replace(config.authenticatedHome);
	}
	const { remainingTime } = useCountdown(Date.now() + 6 * 1000, onCountEnd);

	const { secondsNum } = remainingTime;

	return (
		<section className="fixed inset-y-0 inset-x-0 bg-gradient-to-b from-[#ff9100]  to-[#1E0700] flex flex-col justify-center items-center  w-full min-h-screen space-y-16 z-20">
			<div>
				<Image
					src={KycSuccess}
					alt="reviewing kyc"
					priority
					width="300"
					height="300"
				/>
			</div>
			<div className="max-w-2xl space-y-8 px-6 pb-10 md:pb-16">
				<h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-white">
					We are reviewing your information
				</h1>

				<p className="text-center text-white/90 text-base md:text-lg lg:text-xl">
					We will send you an email in the next few minutes to confirm your
					verification status.
				</p>

				<div className="flex flex-col justify-center items-center">
					<div className="">
						<span className="text-center text-white/90  inline-block  text-2xl md:text-3xl lg:text-4xl font-semibold">
							{secondsNum}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Reviewing;
