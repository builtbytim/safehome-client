import Overlay from "../Overlay2";
import {
  PopUpTopBar,
  CashoutInvestment,
  AlreadyInvested,
  InvestmentInfo,
  InvestNow,
} from "./popup";
import { useRef } from "react";
import useOutsideClickDetector from "../../utils/hooks/useOutsideClickDetector";
import { useQuery } from "react-query";
import queryKeys from "../../utils/queryKeys";
import { createFetcher } from "../../utils/fetchUtils";
import config from "../../utils/config";

function InvestmentInfoPopup({
  selectedAsset,
  closePopup,
  handleShowAboutInvestment,
  openInvestNow,
  authenticatedUser,
  token,
  showInvestNow,
  setShowInvestNow,
  show,
}) {
  const infoRef = useRef(null);
  const investRef = useRef(null);

  const userAlreadyInvested = selectedAsset?.investors?.includes(
    authenticatedUser?.uid
  );

  const investmentMatured = false;

  useOutsideClickDetector(infoRef, () => {
    closePopup();
  });

  useOutsideClickDetector(investRef, () => {
    setShowInvestNow(false);
  });

  const { isLoading, isError, refetch, data, isSuccess, error } = useQuery({
    queryKey: [queryKeys.getMyInvestments, token],
    queryFn: createFetcher({
      url: config.apiPaths.getMyInvestments,
      method: "GET",
      auth: token,
      surfix: `?includeAsset=true&assetUid=${selectedAsset?.uid}`,
    }),

    enabled: !!token && userAlreadyInvested,
    keepPreviousData: true,
  });

  return (
    <>
      {show && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
              ref={infoRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                {investmentMatured ? (
                  <div className="">
                    <div className="">
                      <PopUpTopBar close={closePopup} />
                    </div>
                    <div className="pt-6">
                      <CashoutInvestment
                        data={selectedAsset}
                        showAboutFunction={handleShowAboutInvestment}
                      />
                    </div>
                  </div>
                ) : userAlreadyInvested ? (
                  <div className="">
                    <div className="">
                      <PopUpTopBar close={closePopup} />
                    </div>
                    <div className="pt-6">
                      <AlreadyInvested
                        data={selectedAsset}
                        userInvestmentData={data?.items[0]}
                        isLoading={isLoading}
                        isError={isError}
                        refetch={refetch}
                        isSuccess={isSuccess}
                        showAboutFunction={handleShowAboutInvestment}
                        investNowFunction={openInvestNow}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="">
                      <PopUpTopBar close={closePopup} />
                    </div>
                    <div className="pt-6">
                      <InvestmentInfo
                        data={selectedAsset}
                        showAboutFunction={handleShowAboutInvestment}
                        investNowFunction={openInvestNow}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Overlay>
        </div>
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
                  title={userAlreadyInvested ? "Invest More" : "Invest Now"}
                  desc={
                    userAlreadyInvested
                      ? "Buy more units of this investment"
                      : "Invest in this asset"
                  }
                />
              </div>
              <div className="pt-6">
                <InvestNow
                  token={token}
                  data={selectedAsset}
                  userAlreadyInvested={userAlreadyInvested}
                  closeSelf={() => setShowInvestNow(false)}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}
    </>
  );
}

export default InvestmentInfoPopup;
