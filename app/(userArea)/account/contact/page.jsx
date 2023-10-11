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
  <div className="flex flex-row justify-start  border border-[--lines] px-6 py-6 rounded md:rounded-xl items-center">
    <div className="w-[150px]">
      <div className="border-2 border-[--color-brand] text-3xl rounded-full w-[70px] h-[70px] flex items-center justify-center">
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
          You can reach us via our phone numbers, social media profile, email
          etc.
        </p>
      </div>
      <div className="space-y-5">
        <InfoCard
          icon={<PiMapPin className="text-[--color-brand]" />}
          text="Lapal House, 235 Igbosere Road, Onikan, Lagos"
        />
        <InfoCard
          icon={<PiEnvelope className="text-[--color-brand]" />}
          text="Send us a mail at support@safehomecoop.com"
        />
        <InfoCard
          icon={<PiPhone className="text-[--color-brand]" />}
          text="+234 812 994 0742, +234 812 994 0741"
        />
      </div>
      <div className="space-x-6  border border-[--lines] rounded md:rounded-xl px-7 py-9 text-center">
        <div className="flex justify-center space-x-6 md:space-x-10 items-center">
          <PiTwitterLogo className="text-[--text-secondary] text-2xl md:text-3xl" />
          <PiInstagramLogoBold className="text-[--text-secondary] text-2xl md:text-3xl" />
          <RiFacebookFill className="text-[--text-secondary] text-2xl md:text-3xl" />
          <SlSocialLinkedin className="text-[--text-secondary] text-2xl md:text-3xl" />
        </div>
        <p className="py-4">
          Follow us on social media for updates, news, and more:
        </p>
      </div>
    </main>
  );
}
