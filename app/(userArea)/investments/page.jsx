"use client";

import { useState } from "react";
import SecureRoute from "../../components/SecureRoute";
import Image from "next/image";
import { Balance, InvestmentCard } from "../../components/investment";
import HomeTarget from "../../components/savings/HomeTarget";
import {
  AboutInvestment,
  AlreadyInvested,
  CashoutInvestment,
  InvestmentInfo,
  InvestNow,
  PopUpTopBar,
} from "../../components/investment/popup";
import HeaderInvestments from "../../components/layout/headers/HeaderInvestments";
import TabSwitch from "../../components/savings/TabSwitch";
import OverviewCard from "../../components/investment/OverviewCard";
import inv1 from "../../../assets/images/investment/inv1.png";

const investments = [
  {
    id: 1,
    img: inv1,
    title: "SMART OFFICE LEKKI",
    returns: "10%",
    value: "555,073",
    investors: "1823",
    quantity: "100",
  },
];

function Page() {
  const InvestmentStates = [
    "Not invested",
    "Already Invested",
    "Matured Investment",
  ];
  const InvestmentState = InvestmentStates[0];
  const [showInvestmentInfo, setShowInvestmentInfo] = useState(false);
  const [showInvestNow, setShowInvestNow] = useState(false);
  const [showAboutInvestment, setShowAboutInvestment] = useState(false);
  const [dataId, setDataId] = useState(0);

  const openInfo = (id) => {
    setDataId(id);
    setShowInvestmentInfo(true);
  };

  const closePopup = () => {
    setShowInvestmentInfo(false);
  };

  const openInvestNow = () => {
    setShowAboutInvestment(false);
    setShowInvestNow(true);
  };

  return (
    <main className="pb-8 md:pb-12 space-y-8 lg:space-y-10">
      <HeaderInvestments title="Investments" extraClasses="text-[--primary]" />

      <OverviewCard />
      <section className="bg-white rounded-brand pt-5 pb-3 md:py-8">
        <TabSwitch
          extraClasses="text-[--text-brand-2] border-[--text-brand-2]"
          tabItems={[
            {
              name: "My Investments",
            },
            {
              name: "New Opportunities",
            },
          ]}
        />

        <div className="pt-2 pb-8 md:p-8 space-y-4">
          {/* <div className="flex flex-no-wrap gap-3 scrollbar-fix text-center filter-container content-center overflow-x-auto pb-2 ">
            <button className="filter-btn-active">All</button>
            <button className="filter-btn">Land Owners Club</button>
            <button className="filter-btn">Home Owners Club</button>
            <button className="filter-btn">Office Owners Club</button>
            <button className="filter-btn">Shop Owners Club</button>
          </div> */}

          <div className="grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
            {Array.from({ length: 10 }).map((v, index) => (
              <HomeTarget key={index} />
            ))}
          </div>
        </div>
      </section>
      {showInvestmentInfo && (
        <div className="fixed top-[-40px] right-0 w-full md:w-[400px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
          {InvestmentState === "Matured Investment" ? (
            <div>
              <PopUpTopBar close={() => closePopup()} />
              <CashoutInvestment
                data={investments[dataId]}
                showAboutFunction={() => setShowAboutInvestment(true)}
              />
            </div>
          ) : InvestmentState === "Already Invested" ? (
            <div>
              <PopUpTopBar close={() => closePopup()} />
              <AlreadyInvested
                data={investments[dataId]}
                showAboutFunction={() => setShowAboutInvestment(true)}
                investNowFunction={() => openInvestNow()}
              />
            </div>
          ) : (
            <div>
              <PopUpTopBar close={() => closePopup()} />
              <InvestmentInfo
                data={investments[dataId]}
                showAboutFunction={() => setShowAboutInvestment(true)}
                investNowFunction={() => openInvestNow()}
              />
            </div>
          )}
        </div>
      )}

      {showInvestNow && (
        <div className="fixed top-[-40px] right-0 w-full md:w-[400px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
          <PopUpTopBar close={() => setShowInvestNow(false)} />
          <InvestNow data={investments[dataId]} />
        </div>
      )}
      {showAboutInvestment && (
        <div className="fixed top-[-40px] right-0 w-full md:w-[400px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow">
          <PopUpTopBar close={() => setShowAboutInvestment(false)} />
          <AboutInvestment
            data={investments[dataId]}
            investNowFunction={() => openInvestNow()}
          />
        </div>
      )}
    </main>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
