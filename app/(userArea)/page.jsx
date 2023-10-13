"use client";

import OverviewCard from "../components/home/OverviewCard";
import LastNTime from "../components/home/LastNTime";
import SecureRoute from "../components/SecureRoute";
import Header from "../components/layout/headers/Header";
import Overlay from "../components/Overlay2";
import TransactionHistoryTable from "../components/home/TransactionHistoryTable";
import { PopUpTopBar } from "../components/security";
import {
  Withdraw,
  Receipt,
  ReceiptTopBar,
  Topup,
} from "../components/home/popups";
import { useState, useRef, useEffect } from "react";
import FilterGroup from "../components/home/FilterGroup";
import ExploreCardsRow from "../components/home/ExploreCardsRow";

function Page({ authenticatedUser, authenticationToken }) {
  const [showTopup, setShowTopup] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptState, setReceiptState] = useState("");

  // Hide Popups when not clicked on
  const topupRef = useRef(null);
  const withdrawRef = useRef(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (topupRef.current && !topupRef.current.contains(event.target)) {
        setShowTopup(false);
      }
      if (withdrawRef.current && !withdrawRef.current.contains(event.target)) {
        setShowWithdraw(false);
      }
      if (receiptRef.current && !receiptRef.current.contains(event.target)) {
        setShowReceipt(false);
        setShowTopup(false);
        setShowWithdraw(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showTopup, showWithdraw, showReceipt]);

  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
      {/* POPUPS */}
      {showTopup && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
              ref={topupRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowTopup(false)}
                  title="Add funds"
                  desc="Instantly add funds to this savings Goal."
                />
              </div>
              <div className="pt-6 h-full">
                <Topup
                  token={authenticationToken}
                  closeSelf={() => setShowTopup(false)}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}

      {showWithdraw && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
              ref={withdrawRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowWithdraw(false)}
                  title="Withdraw Funds"
                  desc="Withdraw funds to your desired destination."
                />
              </div>
              <div className="pt-6 h-full">
                <Withdraw
                  token={authenticationToken}
                  closeSelf={() => setShowWithdraw(false)}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}

      {showReceipt && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
              ref={topupRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <ReceiptTopBar
                  token={authenticationToken}
                  close={() => setShowReceipt(false)}
                  title="Transaction Type"
                  desc={receiptState}
                />
              </div>
              <div className="pt-6 h-full">
                <Receipt
                  btnFunc={() => console.log("withdraw")}
                  type={receiptState}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}

      <Header user={authenticatedUser} />

      <main className=" space-y-2 lg:space-y-10">
        <OverviewCard
          setShowTopup={setShowTopup}
          setShowWithdraw={setShowWithdraw}
          token={authenticationToken}
        />

        <ExploreCardsRow />
        <section className="bg-white rounded-brand pb-8  space-y-4">
          <div className="flex flex-row justify-between items-center pt-8 md:px-8">
            <div className="flex justify-start items-center space-x-16">
              <h1 className="  text-[--placeholder] md:text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
                Transactions
              </h1>
              <LastNTime />
            </div>

            <FilterGroup />
          </div>

          <TransactionHistoryTable token={authenticationToken} />
        </section>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
