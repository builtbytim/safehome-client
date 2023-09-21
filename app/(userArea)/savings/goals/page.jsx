"use client";

import SecureRoute from "../../../components/SecureRoute";
import HeaderSavings from "../../../components/layout/headers/HeaderSavings";
import OverviewCard from "../../../components/savings/OverviewCard";
import TabSwitch from "../../../components/savings/TabSwitch";
import Image from "next/image";
import HomeTarget from "../../../components/savings/HomeTarget";
import SavingsImage from "../../../../assets/images/icons/savings.svg";
import TargetImage from "../../../../assets/images/icons/target.svg";
import LockImage from "../../../../assets/images/icons/lock.svg";

function Page({ authenticatedUser }) {
  const tabItemsArr = [
    [
      {
        name: "Savings",
        img: SavingsImage,
      },
      {
        name: "Goal",
        img: TargetImage,
      },

      {
        name: "Locked Savings",
        img: LockImage,
      },
    ],
    [
      {
        name: "My Goals",
      },

      {
        name: "Completed",
      },
    ],
  ];

  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
      <HeaderSavings
        user={authenticatedUser}
        title="Goal Savings"
        extraClasses="text-[--text-brand-2]"
      />

      <main className=" space-y-2 lg:space-y-10">
        <section className="bg-white  rounded-brand  pt-8  md:p-8 space-y-4">
          <TabSwitch
            tabItems={tabItemsArr[0]}
            extraClasses="text-[--text-brand-2]  border-[--text-brand-2]"
          />

          <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
            <div className="col-span-5 self-stretch md:col-span-3 xl:col-span-4 rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6">
              <div>
                <Image src={TargetImage} alt="my funds" width="48" />
              </div>

              <h2 className=" text-[--text-secondary] font-medium">
                Total Balance
              </h2>

              <p className="text-[--text-brand-2] font-bold text-xl lg:text-2xl">
                ₦0
              </p>
            </div>

            <div className="col-span-5 md:hidden">
              <span className="text-[--text-brand-2] uppercase">
                {" "}
                Interest &nbsp;&nbsp;
              </span>{" "}
              <span className="text-[--text-secondary]"> 5% p.a </span>
            </div>
            <div className="col-span-5 md:hidden">
              <button className="btn-3 ">Create a goal</button>
            </div>

            <div className="hidden self-stretch md:flex md:col-span-2 xl:col-span-1 rounded-brand border border-[--lines] p-6  flex-col justify-center items-start space-y-6">
              <p className=" text-[--text-secondary] uppercase font-medium">
                Interest
              </p>
              <p className="text-[--text-brand-2] font-bold text-xl lg:text-2xl">
                0%
              </p>
              <p className=" text-[--text-secondary] font-medium">Per Annum</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-brand  pt-2 pb-8 md:p-8 space-y-4">
          <TabSwitch
            tabItems={tabItemsArr[1]}
            extraClasses="text-[--text-brand-2]  border-[--text-brand-2]"
          />

          {/* Home targets starts  */}

          <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
            {Array.from({ length: 10 })
              .fill(0)
              .map((v, i) => {
                return <HomeTarget key={i} />;
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
