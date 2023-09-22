import Link from "next/link";
import Image from "next/image";
import SavingsImage from "../../../assets/images/icons/SavingsLite.svg";
import TargetImage from "../../../assets/images/icons/target.svg";
import TrendImage from "../../../assets/images/icons/trend.svg";
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
            to="total-balance"
          ></ScrollLink>

          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="expected-returns"
          ></ScrollLink>

          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="expected-roi"
          ></ScrollLink>
        </div>

        {/* Scroll Indicatots end  */}

        <div
          id="scroll-indicators"
          className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
        >
          <div
            id="total-balance"
            className="min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch  rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="self-center">
                <Image src={TrendImage} alt="my funds" width="48" />
              </div>

              <div className="flex flex-row justify-center items-center space-x-2 self-center text-[--text-secondary]">
                <span> Button </span>

                <BiChevronRight className="inline-block text-2xl self-center" />
              </div>
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              Total Balance
            </h2>

            <p className="text-[--text-brand] font-bold text-xl lg:text-2xl">
              ₦0
            </p>
          </div>

          <div
            id="expected-returns"
            className="min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch  rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="self-center">
                <Image src={TrendImage} alt="my funds" width="48" />
              </div>

              <div className="flex flex-row justify-center items-center space-x-2 self-center text-[--text-secondary]">
                <span> Button </span>

                <BiChevronRight className="inline-block text-2xl self-center" />
              </div>
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              Total Expected Returns
            </h2>

            <p className="text-[--text-brand] font-bold text-xl lg:text-2xl">
              ₦0
            </p>
          </div>

          <div
            id="expected-roi"
            className="min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch  rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6"
          >
            <h2 className=" text-[--text-secondary] uppercase font-medium">
              Expected ROI
            </h2>

            <p className="text-[--text-brand] font-bold text-xl lg:text-2xl">
              Up to 20%
            </p>

            <p className=" text-[--text-secondary]  font-medium">Per Annum</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewCard;
