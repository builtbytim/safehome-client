import { useState } from "react";
import Overlay2 from "../../Overlay2";
import { Slide } from "react-reveal";
import { BiX } from "react-icons/bi";
import { BsCalendar2PlusFill, BsGearFill } from "react-icons/bs";
import Image from "next/image";
import GoalImage from "../../../../assets/images/investment/inv1.png";
import SmallDetailsCard from "./SmallDetailsCard";
import AddFunds from "./AddFunds";
import ExtendGoal from "./ExtendGoal";
import GoalSetting from "./GoalSetting";

function GoalOverview({ show, toggleShow }) {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showExtendGoal, setShowExtendGoal] = useState(false);
  const [showGoalSetting, setShowGoalSetting] = useState(false);

  function toggleGoalSetting() {
    setShowGoalSetting(!showGoalSetting);
  }

  function toggleExtendGoal() {
    setShowExtendGoal(!showExtendGoal);
  }

  function toggleAddFunds() {
    setShowAddFunds(!showAddFunds);
  }

  if (!show) return null;

  if (showGoalSetting) return <GoalSetting toggleShow={toggleGoalSetting} />;

  if (showExtendGoal) return <ExtendGoal toggleShow={toggleExtendGoal} />;

  if (showAddFunds) return <AddFunds toggleShow={toggleAddFunds} />;

  return (
    <>
      <Overlay2 pos="center">
        <Slide right duration={300} delay={200}>
          <section
            className={
              "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 "
            }
          >
            <div className="flex p-6 flex-row justify-end items-center">
              <div
                onClick={toggleShow}
                className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning"
              >
                <BiX className="text-[--primary] text-xl" />
              </div>
            </div>

            <div className="overflow-y-auto scroll-fix max-h-[90vh] md:max-h-[75vh] pb-8">
              <div className={"relative h-[210px]  w-full"}>
                <Image
                  src={GoalImage}
                  alt="goal image"
                  className="object-cover h-[210px] w-full"
                />
                <div className="absolute bg-black/60 inset-0  flex flex-col justify-center items-center">
                  <span className="text-white text-center">Goal Title</span>
                </div>
              </div>

              {/* Details */}

              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="border w-full rounded-[8px] border-[--lines] px-4 py-2 space-y-1 flex flex-col justify-center items-start font-medium self-stretch text-sm">
                    <span className="text-[--text-brand-2] ">Goal Balance</span>
                    <span className="text-[--primary] font-bold">#50,000</span>
                  </div>

                  <div className="border w-full rounded-[8px] border-[--lines] px-4 py-2 space-y-1 flex flex-col justify-center items-start font-medium self-stretch text-sm">
                    <span className="text-[--text-brand-2] whitespace-nowrap">
                      Overall Set Goal Amount
                    </span>
                    <span className="text-[--primary] font-bold">#500,000</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={toggleAddFunds}
                    className="btn-1-v1 md:py-3 text-center justify-center"
                  >
                    Add Funds to Goal{" "}
                  </button>
                </div>

                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0 md:space-x-6">
                  <button
                    onClick={toggleGoalSetting}
                    className="btn-2-v1 hover:scale-[1.02] font-semibold rounded-[8px] bg-[#ff9100]/10 p-3 inline-flex flex-row justify-start items-center space-x-4"
                  >
                    <BsGearFill className="text-xl" />
                    <span className="text-sm">Goal Settings</span>
                  </button>
                  <button
                    onClick={toggleExtendGoal}
                    className="btn-2-v1 hover:scale-[1.02] font-semibold rounded-[8px] bg-[#ff9100]/10 p-3 inline-flex flex-row justify-start items-center space-x-4"
                  >
                    <BsCalendar2PlusFill className="text-xl" />
                    <span className="text-sm">Extend Goal</span>
                  </button>
                </div>
              </div>

              {/* More Details  */}

              <div className="space-y-6 px-6">
                <div className="grid grid-cols-2 gap-4">
                  <SmallDetailsCard
                    title="Start Date"
                    value="8th August, 2023"
                  />
                  <SmallDetailsCard
                    title="Withdrawal Date"
                    value="7th August, 2024"
                  />

                  <SmallDetailsCard title="Frequency" value="Daily" />
                  <SmallDetailsCard title="Goal Amount" value="#500, 000" />

                  <SmallDetailsCard title="Interest Per Annum" value="9%" />

                  <SmallDetailsCard title="Days Left" value="307" />
                </div>
              </div>
            </div>
          </section>
        </Slide>
      </Overlay2>
    </>
  );
}

export default GoalOverview;
