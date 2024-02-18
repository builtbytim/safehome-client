import Link from "next/link";
import Image from "next/image";
import SavingsImage from "../../../assets/images/icons/SavingsLite.svg";
import TargetImage from "../../../assets/images/icons/target.svg";
import TrendImage from "../../../assets/images/icons/trend.svg";
import LockImage from "../../../assets/images/icons/lock.svg";
import ScrollLink from "../ScrollLink";
import { BiChevronRight } from "react-icons/bi";
import useUserInvestmentStats from "../../utils/hooks/useUserInvestmentStats";
import { NumericFormat } from "react-number-format";
import cn from "classnames";

function OverviewCard({ token }) {
  const { data, isError, isLoading, isSuccess, refetch } =
    useUserInvestmentStats(token, null, null, true);

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
            className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch  rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="self-center">
                <Image src={TrendImage} alt="my funds" width="48" />
              </div>

              {/* <div className="flex flex-row justify-center items-center space-x-2 self-center text-[--text-secondary]">
                <span> Button </span>

                <BiChevronRight className="inline-block text-2xl self-center" />
              </div> */}
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              Total Balance
            </h2>

            <div className="flex flex-row items-center justify-start space-x-2">
              <p className="text-[--text-secondary] self-center font-bold text-xl lg:text-2xl">
                <NumericFormat
                  value={data ? data.balance : 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦ "}
                />
              </p>

              {isError && (
                <button
                  onClick={refetch}
                  disabled={isLoading}
                  className={
                    "text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--lines] flex flex-row justify-center items-center " +
                    cn({
                      "pointer-events-none opacity-50": isLoading,
                    })
                  }
                >
                  <span className="self-center"> Retry </span>
                </button>
              )}
            </div>
          </div>

          <div
            id="expected-returns"
            className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch  rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div className="w-full flex flex-row justify-between items-center">
              <div className="self-center">
                <Image src={TrendImage} alt="my funds" width="48" />
              </div>

              {/* <div className="flex flex-row justify-center items-center space-x-2 self-center text-[--text-secondary]">
                <span> Button </span>

                <BiChevronRight className="inline-block text-2xl self-center" />
              </div> */}
            </div>

            <h2 className=" text-[--text-secondary] font-medium">Returns</h2>

            <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
              <NumericFormat
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </p>
          </div>

          <div
            id="expected-roi"
            className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch  rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6"
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
