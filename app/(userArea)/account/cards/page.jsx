"use client";

import { useState, useRef } from "react";
import Overlay from "../../../components/Overlay2";
import SecureRoute from "../../../components/SecureRoute";
import {
  DebitCardTab,
  BankDetailsTab,
  AddCard,
  AddBank,
} from "../../../components/card_and_bank";
import { PopUpTopBar } from "../../../components/security";

function Page({ authenticatedUser, authenticationToken }) {
  const [tabState, setTabState] = useState(0);
  const toggleRef = useRef();
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);

  return (
    <main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
      <div className="pb-3 space-y-2">
        <h3 className="text-2xl md:text-3xl text-[--color-brand] font-semibold">
          Card & Bank Settings
        </h3>
        <p>Enter your card details to easily add funds to your account.</p>
      </div>

      <div className="space-y-8">
        <div className="flex gap-1">
          <button
            className={tabState === 0 ? "tab-button-active-2" : "tab-button-2"}
            onClick={() => setTabState(0)}
          >
            Debit Cards
          </button>
          <button
            className={tabState === 1 ? "tab-button-active-2" : "tab-button-2"}
            onClick={() => setTabState(1)}
          >
            Bank Details
          </button>
        </div>
        {tabState === 0 && <DebitCardTab token={authenticationToken} />}
        {tabState === 1 && <BankDetailsTab token={authenticationToken} />}
        <div>
          {tabState === 5 ? (
            <div className="py-10 text-center">
              <button
                className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                onClick={() => setShowAddCard(true)}
              >
                Add New Card
              </button>
            </div>
          ) : tabState == 1 ? (
            <div className="py-10 text-center">
              <button
                className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                onClick={() => setShowAddBank(true)}
              >
                Add New Bank
              </button>
            </div>
          ) : null}
        </div>

        {showAddCard && (
          <div className="fixed  left-0 w-full  bg-black/50 z-20">
            <Overlay z={3}>
              <div
                className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
                ref={toggleRef}
              >
                <div className="  w-full md:w-[493px] bg-white ">
                  <PopUpTopBar
                    close={() => setShowAddCard(false)}
                    title="Add a New Card"
                    desc="Make sure you input the right information."
                  />
                </div>
                <div className="pt-6">
                  <AddCard closeFunc={() => setShowAddCard(false)} />
                </div>
              </div>
            </Overlay>
          </div>
        )}
        {showAddBank && (
          <div className="fixed  left-0 w-full  bg-black/50 z-20">
            <Overlay z={3}>
              <div
                className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
                ref={toggleRef}
              >
                <div className="  w-full md:w-[493px] bg-white ">
                  <PopUpTopBar
                    close={() => setShowAddBank(false)}
                    title="Add a Bank"
                    desc="Make sure you input the right information."
                  />
                </div>
                <div className="pt-6">
                  <AddBank
                    token={authenticationToken}
                    closeFunc={() => setShowAddBank(false)}
                  />
                </div>
              </div>
            </Overlay>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
