"use client";

import SecureRoute from "../../../components/SecureRoute";
import HeaderSavings from "../../../components/layout/headers/HeaderSavings";
import TabSwitch from "../../../components/savings/TabSwitch";
import Image from "next/image";
import TargetIcon from "../../../../assets/images/icons/target.svg";
import { useRouter } from "next/navigation";
import SavingsSVG from "../../../components/svg/SavingsSVG";
import LockSVG from "../../../components/svg/LockSVG";
import TargetSVG from "../../../components/svg/TargetSVG";
import LockedSavings from "../../../components/savings/LockedSavings";

function Page({ authenticatedUser }) {
  const router = useRouter();
  const tabItemsArr = [
    [
      {
        name: "Savings",
        img: SavingsSVG,
        tabId: "savings",
        url: "/savings",
        iconColor: "#ff9100",
      },
      {
        name: "Goal",
        img: TargetSVG,
        tabId: "goal",
        url: "/savings/goals?tabGoals=goal",
        iconColor: "#ff9100",
      },

      {
        name: "Locked Savings",
        img: LockSVG,
        tabId: "locked",
        url: "/savings/locked?tabGoals=locked",
        iconColor: "#8d4000",
      },
    ],
    [
      {
        name: "On Going",
        tabId: "ongoing",
      },

      {
        name: "Completed",
        tabId: "completed",
      },
    ],
  ];

  function handleTabChange(tabId) {
    if (tabId === tabItemsArr[0][0].tabId) {
      return router.push("/savings");
    }
  }

  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
      <HeaderSavings
        user={authenticatedUser}
        title="Locked Savings"
        extraClasses="text-[--color-brand] border-[--color-brand]"
      />

      <main className=" space-y-2 md:space-y-10">
        <section className="bg-white  rounded-brand  pt-8  md:p-8 space-y-4">
          <div className="flex flex-row justify-between items-center space-x-8">
            <TabSwitch
              tabParamName="tabGoals"
              defaultTab={2}
              tabItems={tabItemsArr[0]}
              persistActiveTab={handleTabChange}
              extraClasses="text-[--color-brand]  border-[--color-brand]"
            />

            <div className="hidden md:block ">
              <button className="btn-3 bg-[#8d4000] hover:bg-[#8d4000]/80 px-6 whitespace-nowrap ">
                Lock your funds
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
            <div className="col-span-5 self-stretch md:col-span-5 xl:col-span-5 rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6">
              <div>
                <Image src={TargetIcon} alt="my funds" width="48" />
              </div>

              <h2 className=" text-[--text-secondary] font-medium">
                Total Balance
              </h2>

              <p className="text-[--color-brand] font-bold text-xl lg:text-2xl">
                ₦0
              </p>
            </div>

            <div className="col-span-5 md:hidden">
              <button className="btn-3 bg-[#8d4000] hover:bg-[#8d4000]/80  ">
                Lock your funds{" "}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-brand  pt-2 pb-8 md:p-8 space-y-4">
          <TabSwitch
            tabParamName="tab02"
            tabItems={tabItemsArr[1]}
            extraClasses="text-[--color-brand]  border-[--color-brand]"
          />

          <div className="space-y-4 pt-4">
            {Array(6)
              .fill(2)
              .map((v, i) => {
                return <LockedSavings key={i} />;
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
