"use client";

import SecureRoute from "../../components/SecureRoute";
import HeaderSavings from "../../components/layout/headers/HeaderSavings";
import OverviewCard from "../../components/savings/OverviewCard";
import TabSwitch from "../../components/savings/TabSwitch";
import Link from "next/link";
import useTabParam from "../../utils/hooks/useTabParam";
import GoalSavingsGridList from "../../components/savings/GoalSavingsGridList";

const tabItems = [
  {
    name: "Ongoing Savings",
  },
  {
    name: "Competed",
  },
];

function Page({ authenticatedUser, authenticationToken }) {
  const { tab: tabState, setTab: setTabState } = useTabParam("tab", 0, [0, 1]);

  return (
    <>
      {/* Pop ups starts  */}

      {/* Pop ups ends  */}
      <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
        <HeaderSavings user={authenticatedUser} />

        <main className=" space-y-2 lg:space-y-10">
          <OverviewCard token={authenticationToken} />
          <section className="bg-white rounded-brand  py-8 md:p-8 space-y-4">
            <div className="flex flex-row justify-start items-center space-x-4 max-w-[70%] md:max-w-[60%] lg:max-w-[40%] ">
              <Link className="w-full" href="/savings/goals">
                <button className="btn-1 text-sm "> Goal Savings </button>
              </Link>

              <Link className="w-full" href="/savings/locked">
                <button className="btn-2 text-sm "> Locked Savings </button>
              </Link>
            </div>
            <TabSwitch
              tabItems={tabItems}
              tabState={tabState}
              setTabState={setTabState}
            />

            {/* Home targets starts  */}

            <GoalSavingsGridList
              token={authenticationToken}
              completed={tabState === 1}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
