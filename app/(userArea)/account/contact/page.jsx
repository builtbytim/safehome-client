"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import {
	PiMapPin,
	PiEnvelope,
	PiPhone,
	PiTwitterLogo,
	PiInstagramLogoBold,
} from "react-icons/pi";
import { RiFacebookFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import picIcon from "../../../../assets/images/icons/picIcon.svg";

const InfoCard = ({ icon, text }) => (
	<div className="flex flex-row gap-3 md:gap-5 border border-[--lines] px-7 py-5 rounded md:rounded-xl item-start">
		<div className="w-[150px]">
			<div className="border-2 border-[--color-brand] text-2xl rounded-full w-[70px] h-[70px] flex items-center justify-center">
				{icon}
			</div>
		</div>
		<p className="">{text}</p>
	</div>
);

export default function Contact() {
	const [isHidden, setIsHidden] = useState(true);
	const fileRef = useRef(null);

	const openFile = () => {
		// `current` points to the mounted file input element
		fileRef.current.click();
	};
	return (
		<main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
			<div className="pb-3 space-y-2">
				<h3 className="text-3xl text-[--color-brand] font-semibold">
					Contact Us
				</h3>
				<p>
					You can reach us via our phone numbers, social media profiles, email
					etc.
				</p>
			</div>
			<div className="space-y-5">
				<InfoCard
					icon={<PiMapPin className="text-[--color-brand]" />}
					text="Lorem ipsum dolor sit amet consectetur. Faucibus lectus non hendrerit tellus. Fermentum quis egestas aliquet non placerat tincidunt ac nisl sagittis. Massa ultricies libero ante tempor. Sagittis odio quisque "
				/>
				<InfoCard
					icon={<PiEnvelope className="text-[--color-brand]" />}
					text="Lorem ipsum dolor sit amet consectetur. Faucibus lectus non hendrerit tellus. Fermentum quis egestas aliquet non placerat tincidunt ac nisl sagittis. Massa ultricies libero ante tempor. Sagittis odio quisque "
				/>
				<InfoCard
					icon={<PiPhone className="text-[--color-brand]" />}
					text="Lorem ipsum dolor sit amet consectetur. Faucibus lectus non hendrerit tellus. Fermentum quis egestas aliquet non placerat tincidunt ac nisl sagittis. Massa ultricies libero ante tempor. Sagittis odio quisque "
				/>
			</div>
			<div className="space-y-7 border border-[--lines] rounded md:rounded-xl px-7 py-9 text-center">
				<div className="flex justify-center gap-3 items-center">
					<PiTwitterLogo className="text-[--text-secondary] text-2xl" />
					<PiInstagramLogoBold className="text-[--text-secondary] text-2xl" />
					<RiFacebookFill className="text-[--text-secondary] text-2xl" />
					<SlSocialLinkedin className="text-[--text-secondary] text-2xl" />
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur. Faucibus lectus non hendrerit
					tellus. Fermentum quis egestas aliquet non placerat tincidunt ac nisl
					sagittis. Massa ultricies libero ante tempor. Sagittis odio quisque{" "}
				</p>
			</div>
		</main>
	);
}
