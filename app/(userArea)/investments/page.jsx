"use client";

import { useState, useRef } from "react";
import SecureRoute from "../../components/SecureRoute";
import Overlay from "../../components/Overlay2";
import { NoInvestment } from "../../components/investment";
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
import useOutsideClickDetector from "../../utils/hooks/useOutsideClickDetector";
import { useQuery } from "react-query";
import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import config from "../../utils/config";
import Spinner from "../../components/Spinner";

function Page({ authenticationToken, authenticatedUser }) {
  const [tabState, setTabState] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 4,
    ownersClub: "all",
  });
  const [showInvestmentInfo, setShowInvestmentInfo] = useState(false);
  const [showInvestNow, setShowInvestNow] = useState(false);
  const [showAboutInvestment, setShowAboutInvestment] = useState(false);
  const [dataId, setDataId] = useState(0);

  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page);
  queryParams.append("limit", params.limit);
  queryParams.append("ownersClub", params.ownersClub);

  const { isLoading, isError, refetch, data, isSuccess, error, isFetching } =
    useQuery({
      queryKey: [queryKeys.getTransactions, authenticationToken, params],
      queryFn: createFetcher({
        url: config.apiPaths.getInvestmentAssets,
        method: "GET",
        auth: authenticationToken,
        surfix: `?${queryParams.toString()}`,
      }),

      enabled: !!authenticationToken,

      keepPreviousData: true,
    });

  const investments = data?.items || [];

  const openInfo = (id) => {
    setDataId(id);
    setShowInvestmentInfo(true);
  };

  function setOwnersFilter(value) {
    return () => {
      setParams((prev) => ({ ...prev, ownersClub: value }));
    };
  }

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

  useOutsideClickDetector(infoRef, () => setShowInvestmentInfo(false));
  useOutsideClickDetector(aboutRef, () => setShowAboutInvestment(false));
  useOutsideClickDetector(investRef, () => setShowInvestNow(false));

  return (
    <main className="pb-8 md:pb-12 space-y-8 lg:space-y-10">
      <HeaderInvestments title="Investments" extraClasses="text-[--primary]" />

      <OverviewCard />
      <section className="bg-white rounded-brand pt-5 pb-3 md:py-8 text-sm">
        <TabSwitch tabState={tabState} setTabState={setTabState} />
        <div className=" md:px-8 pt-4 space-y-2 md:space-y-4">
          <div className="w-full flex flex-row justify-between items-center ">
            <div className="flex-1 w-full self-center">
              <ClubOwnersFilter
                setOwnerFilter={setOwnersFilter}
                ownersClub={params.ownersClub}
              />
            </div>
          </div>
          <div className="self-start flex flex-row justify-start items-start">
            {isFetching && !isLoading ? (
              <Spinner size="tiny" />
            ) : (
              isSuccess && (
                <span className="text-xs text-[--placeholder]">
                  {data.numItems} of {data?.entries}
                </span>
              )
            )}
          </div>

          {/* New Oppurtunities Tab */}
          {tabState === 0 && (
            <NoInvestment investNowFunc={() => setTabState(1)} />
          )}

          {/* New Oppurtunities Tab */}
          {tabState === 1 && (
            <AssetList
              isLoading={isLoading}
              isError={isError}
              data={data}
              refetch={refetch}
              isSuccess={isSuccess}
              error={error}
              openInfo={openInfo}
            />
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
              ref={investRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowInvestNow(false)}
                  title="Invest Now"
                  desc="Invest in this asset"
                />
              </div>
              <div className="pt-6">
                <InvestNow
                  token={authenticationToken}
                  data={investments[dataId]}
                  closeSelf={() => setShowInvestNow(false)}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}
      {showAboutInvestment && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              ref={aboutRef}
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto "
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
