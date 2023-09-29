"use client";

import SecureRoute from "../../../components/SecureRoute";
import HeaderSavings from "../../../components/layout/headers/HeaderSavings";
import TabSwitch from "../../../components/savings/TabSwitch";
import Image from "next/image";
import HomeTarget from "../../../components/savings/HomeTarget";
import TargetIcon from "../../../../assets/images/icons/target.svg";
import { useRouter } from "next/navigation";
import SavingsSVG from "../../../components/svg/SavingsSVG";
import LockSVG from "../../../components/svg/LockSVG";
import TargetSVG from "../../../components/svg/TargetSVG";
import {
  GoalCreation,
  GoalCreation2,
  GoalOverview,
} from "../../../components/savings/goalsPopups";
import { useState } from "react";

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

function Page({ authenticatedUser }) {
  const router = useRouter();
  const [showGoalCreationF1, setShowGoalCreationF1] = useState(false);
  const [showGoalCreationF2, setShowGoalCreationF2] = useState(false);
  const [showGoalOverview, setShowGoalOverview] = useState(false);

  function toggleGoalOverview() {
    setShowGoalOverview(!showGoalOverview);
  }

  function toggleGoalCreationF1() {
    setShowGoalCreationF1(!showGoalCreationF1);
  }

  function toggleGoalCreationF2() {
    setShowGoalCreationF2(!showGoalCreationF2);
  }

  function handleSubmitGoalCreation1(values) {
    setShowGoalCreationF1(false);
    setShowGoalCreationF2(true);
  }

  function handleTabChange(tabId) {
    if (tabId === tabItemsArr[0][0].tabId) {
      return router.push("/savings");
    }

    if (tabId === tabItemsArr[0][2].tabId) {
      return router.push("/savings/locked");
    }
  }

  return (
    <>
      <GoalCreation
        toggleShow={toggleGoalCreationF1}
        show={showGoalCreationF1}
        handleSubmit={handleSubmitGoalCreation1}
      />

      <GoalCreation2
        toggleShow={toggleGoalCreationF2}
        show={showGoalCreationF2}
      />

      <GoalOverview show={showGoalOverview} toggleShow={toggleGoalOverview} />

      <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
        <HeaderSavings
          user={authenticatedUser}
          title="Goal Savings"
          extraClasses="text-[--text-brand-2]"
        />

        <main className=" space-y-2 md:space-y-10">
          <section className="bg-white  rounded-brand  pt-8  md:p-8 space-y-4">
            <div className="flex flex-row justify-between items-center space-x-8">
              <TabSwitch
                tabParamName="tabGoals"
                tabItems={tabItemsArr[0]}
                persistActiveTab={handleTabChange}
                defaultTab={1}
                extraClasses="text-[--text-brand-2]  border-[--text-brand-2]"
              />

              <div onClick={toggleGoalCreationF1} className="hidden md:block ">
                <button className="btn-3 px-6 whitespace-nowrap ">
                  Create a goal
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
              <div className="col-span-5 self-stretch md:col-span-3 xl:col-span-4 rounded-[8px] md:rounded-[16px] border border-[--lines] p-6 flex flex-col justify-center items-start space-y-6">
                <div>
                  <Image src={TargetIcon} alt="my funds" width="48" />
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
              <div
                onClick={toggleGoalCreationF1}
                className="col-span-5 md:hidden"
              >
                <button className="btn-3 ">Create a goal</button>
              </div>

              <div className="hidden self-stretch md:flex md:col-span-2 xl:col-span-1 rounded-brand border border-[--lines] p-6  flex-col justify-center items-start space-y-6">
                <p className=" text-[--text-secondary] uppercase font-medium">
                  Interest
                </p>
                <p className="text-[--text-brand-2] font-bold text-xl lg:text-2xl">
                  0%
                </p>
                <p className=" text-[--text-secondary] font-medium">
                  Per Annum
                </p>
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
              {Array.from({ length: 4 })
                .fill(0)
                .map((v, i) => {
                  return <HomeTarget key={i} />;
                })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
