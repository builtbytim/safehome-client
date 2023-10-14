import Overlay from "../Overlay2";
import {
  PopUpTopBar,
  CashoutInvestment,
  AlreadyInvested,
  InvestmentInfo,
} from "./popup";
import { useRef } from "react";
import useOutsideClickDetector from "../../utils/hooks/useOutsideClickDetector";

function InvestmentInfoPopup({
  InvestmentState = "Investment Info",
  investments,
  dataId,
  closePopup,
  handleShowAboutInvestment,
  openInvestNow,
}) {
  const infoRef = useRef(null);

  useOutsideClickDetector(infoRef, () => {
    closePopup();
  });

  return (
    <div className="fixed  left-0 w-full  bg-black/50 z-20">
      <Overlay z={3}>
        <div
          className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
          ref={infoRef}
        >
          <div className="  w-full md:w-[493px] bg-white ">
            {InvestmentState === "Matured Investment" ? (
              <div className="">
                <div className="">
                  <PopUpTopBar close={() => closePopup()} />
                </div>
                <div className="pt-6">
                  <CashoutInvestment
                    data={investments[dataId]}
                    showAboutFunction={handleShowAboutInvestment}
                  />
                </div>
              </div>
            ) : InvestmentState === "Already Invested" ? (
              <div className="">
                <div className="">
                  <PopUpTopBar close={() => closePopup()} />
                </div>
                <div className="pt-6">
                  <AlreadyInvested
                    data={investments[dataId]}
                    showAboutFunction={handleShowAboutInvestment}
                    investNowFunction={() => openInvestNow()}
                  />
                </div>
              </div>
            ) : (
              <div className="">
                <div className="">
                  <PopUpTopBar close={() => closePopup()} />
                </div>
                <div className="pt-6">
                  <InvestmentInfo
                    data={investments[dataId]}
                    showAboutFunction={handleShowAboutInvestment}
                    investNowFunction={() => openInvestNow()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Overlay>
    </div>
  );
}

export default InvestmentInfoPopup;
