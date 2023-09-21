"use client";

import SecureRoute from "../../components/SecureRoute";
import HeaderSavings from "../../components/layout/headers/HeaderSavings";
import OverviewCard from "../../components/savings/OverviewCard";
import TabSwitch from "../../components/savings/TabSwitch";
import HomeTargetImage from "../../../assets/images/target-home.jpeg";
import Image from "next/image";

function Page({ authenticatedUser }) {
  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
      <HeaderSavings user={authenticatedUser} />

      <main className=" space-y-2 lg:space-y-10">
        <OverviewCard />
        <section className="bg-white rounded-brand  py-8 md:p-8 space-y-4">
          <TabSwitch />

          <div className="flex flex-row justify-start items-center space-x-4 max-w-[70%] md:max-w-[60%] lg:max-w-[40%] ">
            <button className="btn-1 text-sm "> Goal Savings </button>
            <button className="btn-2 text-sm"> Locked Savings </button>
          </div>

          {/* Home targets starts  */}

          <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
            {Array.from({ length: 10 })
              .fill(0)
              .map((v, i) => {
                return (
                  <div className="rounded-brand" key={i}>
                    <div className="grid grid-cols-5 p-1 md:p-0 rounded-brand border border-[--lines]">
                      <div className="col-span-5  xl:col-span-2 border border-transparent rounded-brand self-stretch ">
                        <Image
                          className="rounded-[16px]  md:rounded-r-0 object-cover"
                          width="100%"
                          height="100%"
                          src={HomeTargetImage}
                          alt="home target"
                        />
                      </div>

                      <div className="self-stretch rounded-r-[16px] col-span-5 xl:col-span-3 py-4 px-2 md:px-4 space-y-4">
                        <h1 className="text-[--primary] text-left font-bold capitalize text-lg  ">
                          Goal Title
                        </h1>

                        <div className=" flex flex-row justify-between items-center">
                          <div className="flex flex-col justify-center items-start">
                            <span className="text-[--text-brand-2] font-medium text-sm">
                              ₦50,000
                            </span>
                            <span className="text-[--primary] text-left  capitalize text-sm  ">
                              {" "}
                              Amount Saved{" "}
                            </span>
                          </div>

                          <div className="flex flex-col justify-center items-end md:items-start">
                            <span className="text-[--text-brand-2] font-medium text-sm">
                              307
                            </span>
                            <span className="text-[--primary] text-left  capitalize text-sm  ">
                              Days Left
                            </span>
                          </div>
                        </div>

                        {/* Progress bar and percent */}

                        <div className="flex flex-row  justify-between items-center md:items-start space-x-8 lg:space-x-16">
                          <div className="relative self-center w-full h-[10px] rounded-brand  bg-[#DDDDDD] ">
                            <div className="absolute w-[20%] h-full rounded-brand border-transparent bg-[--text-brand-2]"></div>
                          </div>

                          <div className="self-center">
                            <span className="text-[--primary] md:font-medium text-left  capitalize text-sm  ">
                              10%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
