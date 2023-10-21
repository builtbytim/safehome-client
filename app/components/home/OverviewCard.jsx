"use client";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Image from "next/image";
import FundsImage from "../../../assets/images/icons/Funds.svg";
import Savingsmage from "../../../assets/images/icons/SavingsLite.svg";
import TrendsImage from "../../../assets/images/icons/Trends.svg";
import LoanImage from "../../../assets/images/icons/loan.svg";
import ScrollLink from "../ScrollLink";
import { NumericFormat } from "react-number-format";
import useUserWallet from "../../utils/hooks/useUserWallet";
import useUserInvestmentStats from "../../utils/hooks/useUserInvestmentStats";
import useUserSavingsStats from "../../utils/hooks/useUserSavingsStats";
import cn from "classnames";

function OverviewCard({ setShowTopup, setShowWithdraw, token }) {
  const { data, isLoading, isError, isSuccess, refetch } = useUserWallet(
    token,
    null,
    null
  );

  const {
    data: savingsData,
    isError: savingsIsError,
    isLoading: savingsIsLoading,
    isSuccess: savingsIsSuccess,
    refetch: savingsRefetch,
  } = useUserSavingsStats(token, null, null, true);

  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    refetch: refetch2,
  } = useUserInvestmentStats(token, null, null, true);

  return (
    <section className="bg-white rounded-brand  md:p-8 space-y-4 lg:space-y-8">
      <div className="hidden md:flex flex-row justify-between items-center">
        <h1 className="text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
          Overview
        </h1>

        <div className="hidden self-center md:flex justify-center items-center space-x-4">
          <button
            className="btn-2 px-6 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center"
            onClick={() => setShowWithdraw(true)}
          >
            <AiOutlineMinus className="" />
            <span>Withdraw</span>
          </button>

          <button
            className="btn-1 px-6 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center"
            onClick={() => setShowTopup(true)}
          >
            <AiOutlinePlus className="" />
            <span>Add Fund</span>
          </button>
        </div>
      </div>

      <div>
        {/* Scroll Indicators  */}

        <div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="my-funds"
          ></ScrollLink>

          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="total-savings"
          ></ScrollLink>

          <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="total-investments"
          ></ScrollLink>

          {/* <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="total-loans"
          ></ScrollLink> */}
        </div>

        {/* Scroll Indicatots end  */}

        <div
          id="scroll-indicators"
          className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
        >
          <div
            id="my-funds"
            className="bg-[#8d4000]/10 w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div>
              <Image src={FundsImage} alt="my funds" width="48" />
            </div>

            <h2 className=" text-[--text-secondary] font-medium"> My Funds </h2>

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
            id="total-savings"
            className="bg-[#ff6100]/10 w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 "
          >
            <div>
              <Image src={Savingsmage} alt="my funds" width="48" />
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              {" "}
              Total Savings{" "}
            </h2>

            <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
              <NumericFormat
                value={savingsData ? savingsData.balance : 0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦ "}
              />
            </p>
          </div>

          <div
            id="total-investments"
            className="bg-[#ff6100]/10 w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px]  rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div>
              <Image src={TrendsImage} alt="my funds" width="48" />
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              {" "}
              Total Investments
            </h2>

            <div className="flex flex-row items-center justify-start space-x-2">
              <p className="text-[--text-secondary] self-center font-bold text-xl lg:text-2xl">
                <NumericFormat
                  value={data2 ? data2.balance : 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦ "}
                />
              </p>

              {isError2 && (
                <button
                  onClick={refetch2}
                  disabled={isLoading2}
                  className={
                    "text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--lines] flex flex-row justify-center items-center " +
                    cn({
                      "pointer-events-none opacity-50": isLoading2,
                    })
                  }
                >
                  <span className="self-center"> Retry </span>
                </button>
              )}
            </div>
          </div>

          {/* <div
            id="total-loans"
            className="bg-[#ff6100]/10 w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div>
              <Image src={LoanImage} alt="my funds" width="48" />
            </div>

            <h2 className=" text-[--text-secondary] font-medium">
              {" "}
              Total Loan
            </h2>

            <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
              ₦0
            </p>
          </div> */}
        </div>
      </div>

      <div className=" flex flex-row  md:hidden justify-between items-center space-x-4">
        <button
          className="btn-2 py-3 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center"
          onClick={() => setShowWithdraw(true)}
        >
          <AiOutlineMinus className="" />
          <span>Withdraw</span>
        </button>

        <button
          className="btn-1 py-3 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center"
          onClick={() => setShowTopup(true)}
        >
          <AiOutlinePlus className="" />
          <span>Add Fund</span>
        </button>
      </div>
    </section>
  );
}

export default OverviewCard;
