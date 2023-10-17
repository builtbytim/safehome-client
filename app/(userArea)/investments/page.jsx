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
import MyInvestments from "../../components/investment/MyInvestments";
import MiniFetchStatusIndicator from "../../components/MiniFetchStatusIndicator";

function Page({ authenticationToken, authenticatedUser }) {
  const [tabState, setTabState] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 8,
    ownersClub: "all",
  });
  const [showInvestmentInfo, setShowInvestmentInfo] = useState(false);
  const [showInvestNow, setShowInvestNow] = useState(false);
  const [showAboutInvestment, setShowAboutInvestment] = useState(false);
  const [selectedAssetUid, setSelectedAssetUid] = useState(null);

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

      enabled: !!authenticationToken && tabState === 1,

      keepPreviousData: true,
    });

  const investibleAssets = data?.items || [];

  const selectedAsset =
    investibleAssets.find((asset) => asset.uid === selectedAssetUid) || null;

  const openInfo = (id) => {
    setSelectedAssetUid(id);
    setShowInvestmentInfo(true);
  };

  function setParamsPage(value) {
    setParams((prev) => ({ ...prev, page: value }));
  }

  function setOwnersFilter(value) {
    return () => {
      setParams((prev) => ({ ...prev, ownersClub: value }));
    };
  }

  function clearFilters() {
    setParams((prev) => ({ ...prev, ownersClub: "all", page: 1 }));
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

  useOutsideClickDetector(infoRef, () => setShowInvestmentInfo(false));
  useOutsideClickDetector(aboutRef, () => setShowAboutInvestment(false));

  return (
    <main className="pb-8 md:pb-12 space-y-8 lg:space-y-10">
      <HeaderInvestments
        token={authenticationToken}
        title="Investments"
        extraClasses="text-[--primary]"
      />

      <OverviewCard token={authenticationToken} />
      <section className="bg-white rounded-brand pt-6 pb-10 md:py-8 text-sm">
        <TabSwitch
          tabState={tabState}
          setTabState={(v) => {
            setTabState(v);
            clearFilters();
          }}
        />
        <div className=" md:px-8 pt-4 space-y-2 md:space-y-4">
          <div className="w-full flex flex-row justify-between items-center ">
            <div className="flex-1 w-full self-center">
              <ClubOwnersFilter
                setOwnerFilter={setOwnersFilter}
                ownersClub={params.ownersClub}
              />
            </div>
          </div>
          <MiniFetchStatusIndicator
            show={tabState === 1}
            isFetching={isFetching}
            isLoading={isLoading}
            retry={refetch}
            isError={isError}
            isSuccess={isSuccess}
            successText={
              data ? `Showing ${data.numItems} of ${data.entries} ` : ""
            }
          />

          {/* New Oppurtunities Tab */}
          {tabState === 0 && (
            <MyInvestments
              token={authenticationToken}
              setTabState={setTabState}
              params={params}
              openInfo={openInfo}
              setParamsPage={setParamsPage}
            />
          )}

          {/* New Oppurtunities Tab */}
          {tabState === 1 && (
            <AssetList
              isLoading={isLoading}
              isError={isError}
              data={data}
              refetch={refetch}
              isSuccess={isSuccess}
              isFetching={isFetching}
              error={error}
              openInfo={openInfo}
              setParamsPage={setParamsPage}
            />
          )}

          {/* Completed */}
          {tabState === 2 && (
            <MyInvestments
              token={authenticationToken}
              setTabState={setTabState}
              params={params}
              openInfo={openInfo}
              setParamsPage={setParamsPage}
              completed
            />
          )}
        </div>
      </section>

      <InvestmentInfoPopup
        investibleAssets={investibleAssets}
        selectedAsset={selectedAsset}
        closePopup={closePopup}
        authenticatedUser={authenticatedUser}
        openInvestNow={openInvestNow}
        handleShowAboutInvestment={handleShowAboutInvestment}
        token={authenticationToken}
        show={showInvestmentInfo}
        setShowInvestNow={setShowInvestNow}
        showInvestNow={showInvestNow}
      />

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
                  data={selectedAsset}
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
