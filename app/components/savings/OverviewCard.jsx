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

          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="locked-savings"
          ></ScrollLink>
        </div>

        {/* Scroll Indicatots end  */}

        <div
          id="scroll-indicators"
          className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
        >
          <div
            id="interest-earned"
            className="bg-[#1E07001A] min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div>
              <Image src={SavingsImage} alt="my funds" width="48" />
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              {" "}
              Interest Earned{" "}
            </h2>

            <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
              ₦0
            </p>
          </div>

          <Link
            href="/savings/goals"
            id="goal-savings"
            className="bg-[#FF91001A] min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 "
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="self-center">
                <Image src={TargetImage} alt="my funds" width="48" />
              </div>

              <div className="flex flex-row justify-center items-center space-x-2 self-center text-[--text-secondary]">
                <span> Create Goal </span>

                <BiChevronRight className="inline-block text-2xl self-center" />
              </div>
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              {" "}
              Goal Savings{" "}
            </h2>

            <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
              ₦0
            </p>
          </Link>

          <Link
            href="/savings/locked"
            id="locked-savings"
            className="bg-[#ff6100]/10 min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="self-center">
                <Image src={LockImage} alt="my funds" width="48" />
              </div>

              <div className="flex flex-row justify-center items-center space-x-2 self-center text-[--text-secondary]">
                <span> Lock funds </span>

                <BiChevronRight className="inline-block text-2xl self-center" />
              </div>
            </div>
            <h2 className=" text-[--text-secondary] font-medium">
              {" "}
              Locked Savings{" "}
            </h2>

            <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
              ₦0
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OverviewCard;
