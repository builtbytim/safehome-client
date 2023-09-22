"use client";

import SecureRoute from "../../components/SecureRoute";
import HeaderSavings from "../../components/layout/headers/HeaderSavings";
import OverviewCard from "../../components/account/OverviewCard";

function Page({ authenticatedUser }) {
  const tabItems = [
    {
      name: "Ongoing Savings",
    },
    {
      name: "Competed",
    },

    {
      name: "Transactions",
    },
  ];
  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
      <HeaderSavings title="Account" user={authenticatedUser} />

      <main className=" space-y-2 lg:space-y-10">
        <OverviewCard />
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
