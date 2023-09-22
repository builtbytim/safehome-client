import Link from "next/link";
import Image from "next/image";
import SavingsImage from "../../../assets/images/icons/SavingsLite.svg";
import TargetImage from "../../../assets/images/icons/target.svg";
import LockImage from "../../../assets/images/icons/lock.svg";
import ScrollLink from "../ScrollLink";
import { BiChevronRight } from "react-icons/bi";

function OverviewCard() {
  return (
    <section className="bg-white rounded-brand  md:p-8 space-y-4 lg:space-y-8">
      <div className="hidden md:flex flex-row justify-between items-center">
        <h1 className="text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
          {" "}
          Overview{" "}
        </h1>
      </div>

      <div>
        {/* Scroll Indicators  */}

        <div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="interest-earned"
          ></ScrollLink>

          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="goal-savings"
          ></ScrollLink>
        </div>

        {/* Scroll Indicatots end  */}

        <div
          id="scroll-indicators"
          className="flex  flex-row justify-start items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
        >
          <Link
            href="/kyc/picture"
            id="interest-earned"
            className="bg-[#1E07001A] self-stretch min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <h2 className=" text-[--text-secondary] font-medium">
              KYC Picture
            </h2>
          </Link>

          <Link
            href="/kyc/visuals"
            id="goal-savings"
            className="bg-[#FF91001A] self-stretch min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 "
          >
            <h2 className=" text-[--text-secondary] font-medium">
              KYC Visuals
            </h2>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OverviewCard;
