"use client";

import { useRef } from "react";
import SecureRoute from "../../../components/SecureRoute";

import {
	PiMapPin,
	PiEnvelope,
	PiPhone,
	PiTwitterLogo,
	PiInstagramLogo,
	PiWhatsappLogo,
} from "react-icons/pi";
import { RiFacebookFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";

const InfoCard = ({ icon, text }) => (
	<div className="flex flex-row justify-start  border border-[--lines] p-4 md:p-6 gap-4 md:gap-6 rounded md:rounded-xl items-center">
		<div className="self-start md:self-center w-[50px]">
			<div className="border border-[--button] text-2xl md:text-2xl md:text-white` rounded-full w-[50px] h-[50px] flex items-center justify-center">
				{icon}
			</div>
		</div>
		<p className="self-start md:self-center overflow-ellipsis break-words">
			{text}
		</p>
	</div>
);

function Page() {
	const fileRef = useRef(null);

	const openFile = () => {
		// `current` points to the mounted file input element
		fileRef.current.click();
	};
	return (
		<main className=" space-y-8 lg:space-y-8 text-[--text] border border-[--lines] account-p h-full min-h-[80vh] rounded-2xl">
			<div className="pb-0 space-y-1">
				<h3 className="popup-header">Contact Us</h3>
				<p>
					You can reach us via our phone numbers, social media profile, email
					etc.
				</p>
			</div>
			<div className="space-y-3">
				<InfoCard
					icon={<PiMapPin className="text-[--header]" />}
					text="Lapal House, 235 Igbosere Road, Onikan, Lagos"
				/>
				<InfoCard
					icon={<PiEnvelope className="text-[--header]" />}
					text="Send us a mail at marketing@safehomecoop.com"
				/>
				<InfoCard
					icon={<PiPhone className="text-[--header]" />}
					text={
						<span>
							{" "}
							+234 812 994 0742 <br /> +234 812 994 0741{" "}
						</span>
					}
				/>
			</div>
			<div className="space-y-4  border border-[--lines] rounded md:rounded-xl p-7 text-center">
				<div className="flex justify-center space-x-6 md:space-x-10 items-center">
					<a href="https://twitter.com/safehomecoop">
						<PiTwitterLogo className="text-[--text] text-2xl md:text-3xl" />
					</a>

					<a href="https://www.instagram.com/safehomecoop/">
						<PiInstagramLogo className="text-[--text] text-2xl md:text-3xl" />
					</a>
					<a href="https://web.facebook.com/safehomecoop/">
						<RiFacebookFill className="text-[--text] text-2xl md:text-3xl" />
					</a>
					<a href="https://www.linkedin.com/in/safe-home/">
						<SlSocialLinkedin className="text-[--text] text-2xl md:text-3xl" />
					</a>

					<a href="http://wa.me/2348129940741">
						<PiWhatsappLogo className="text-[--text] text-2xl md:text-3xl" />
					</a>
				</div>
				<p className="">
					Follow us on social media for updates, news, and more.
				</p>
			</div>
		</main>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
