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
import { GoalOverview } from "../../../components/savings/goalsPopups";
import ScrollLink from "../../../components/ScrollLink";
import { useState } from "react";
import SavingsImage from "../../../../assets/images/icons/SavingsLite.svg";
import CreateGoalManager from "../../../components/savings/CreateGoalManager";

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

function Page({ authenticatedUser, authenticationToken }) {
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
      <CreateGoalManager
        showForm1={showGoalCreationF1}
        showForm2={showGoalCreationF2}
        toggleForm1={toggleGoalCreationF1}
        toggleForm2={toggleGoalCreationF2}
        token={authenticationToken}
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

            <div>
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
                  to="interest-earned"
                ></ScrollLink>

                <ScrollLink
                  containerId="scroll-indicators"
                  activeClass="hidden md:inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
                  className="hidden md:inline-block rounded-full border p-1 "
                  to="interest"
                ></ScrollLink>
              </div>
              <div
                id="scroll-indicators"
                className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
              >
                <div
                  id="total-balance"
                  className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 border border-[--lines]"
                >
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

                <div
                  id="interest-earned"
                  className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 border border-[--lines]"
                >
                  <div>
                    <Image src={SavingsImage} alt="my funds" width="48" />
                  </div>

                  <h2 className=" text-[--text-secondary] font-medium">
                    Interest Earned
                  </h2>

                  <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
                    ₦0
                  </p>
                </div>

                <div
                  id="interest"
                  className="hidden self-stretch w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 md:flex flex-col justify-center items-start space-y-6 border border-[--lines]"
                >
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

              {/* Mobile Interest Info */}
              <div className="col-span-5 md:hidden py-2">
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
            </div>
          </section>

          <section className="bg-white rounded-brand  pt-2 pb-8 md:p-8 space-y-4">
            <TabSwitch
              tabItems={tabItemsArr[1]}
              extraClasses="text-[--text-brand-2]  border-[--text-brand-2]"
            />

            {/* Home targets starts  */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
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
