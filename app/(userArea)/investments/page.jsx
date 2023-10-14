"use client";

import { useState, useRef, useEffect } from "react";
import SecureRoute from "../../components/SecureRoute";
import Overlay from "../../components/Overlay2";
import { InvestmentCard, NoInvestment } from "../../components/investment";
import {
  AboutInvestment,
  InvestNow,
  PopUpTopBar,
} from "../../components/investment/popup";
import HeaderInvestments from "../../components/layout/headers/HeaderInvestments";
import OverviewCard from "../../components/investment/OverviewCard";
import ClubOwnersFilter from "../../components/investment/ClubOwnersFilter";
import TabSwitch from "../../components/investment/TabSwitch";
import AssetList from "../../components/investment/AssetList";
import InvestmentInfoPopup from "../../components/investment/InvestmentInfoPopup";
import { dummyAssets } from "../../utils/constants";

let investments = dummyAssets;

function Page() {
  const [tabState, setTabState] = useState(0);

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
    setShowInvestmentInfo(false);
    setShowInvestNow(true);
  };

  function handleShowAboutInvestment() {
    setShowAboutInvestment(true);
    setShowInvestNow(false);
    setShowInvestmentInfo(false);
  }

  // Hide Overlays when not clicked on
  const infoRef = useRef(null);
  const aboutRef = useRef(null);
  const investRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInvestmentInfo(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setShowAboutInvestment(false);
        setShowInvestmentInfo(false);
      }
      if (investRef.current && !investRef.current.contains(event.target)) {
        setShowInvestNow(false);
        setShowInvestmentInfo(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showInvestmentInfo, showAboutInvestment, showInvestNow]);

  return (
    <main className="pb-8 md:pb-12 space-y-8 lg:space-y-10">
      <HeaderInvestments title="Investments" extraClasses="text-[--primary]" />

      <OverviewCard />
      <section className="bg-white rounded-brand pt-5 pb-3 md:py-8 text-sm">
        <TabSwitch tabState={tabState} setTabState={setTabState} />
        <div className=" md:px-8 pt-4 space-y-4 md:space-y-4">
          <ClubOwnersFilter />

          {/* New Oppurtunities Tab */}
          {tabState === 0 && (
            <NoInvestment investNowFunc={() => setTabState(1)} />
          )}

          {/* New Oppurtunities Tab */}
          {tabState === 1 && (
            <AssetList investments={investments} openInfo={openInfo} />
          )}

          {/* Completed */}
          {tabState === 2 && (
            <NoInvestment investNowFunc={() => setTabState(1)} />
          )}
        </div>
      </section>
      {showInvestmentInfo && (
        <InvestmentInfoPopup
          investments={investments}
          dataId={dataId}
          closePopup={closePopup}
          openInvestNow={openInvestNow}
          handleShowAboutInvestment={handleShowAboutInvestment}
        />
      )}

      {showInvestNow && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto "
              ref={infoRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowInvestNow(false)}
                  title="Invest Now"
                  desc="Invest in this asset"
                />
              </div>
              <div className="pt-6">
                <InvestNow data={investments[dataId]} />
              </div>
            </div>
          </Overlay>
        </div>
      )}
      {showAboutInvestment && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto "
              ref={infoRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowAboutInvestment(false)}
                  title="About Investment"
                  desc="Read more about this investment"
                />
              </div>
              <div className="pt-6">
                <AboutInvestment
                  data={investments[dataId]}
                  investNowFunction={() => openInvestNow()}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}
    </main>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
