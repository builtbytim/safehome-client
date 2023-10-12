"use client";

import SecureRoute from "../../../components/SecureRoute";
import { useState } from "react";

import { BasicInfoTab, NextOfKinTab } from "../../../components/account";

function Page({ authenticatedUser, authenticationToken, signOut }) {
  const [tabState, setTabState] = useState(0);

  return (
    <main className=" space-y-8 lg:space-y-10 text-[--text-secondary] border border-[--lines] p-5 h-full rounded-2xl">
      <div className="pb-3 space-y-2">
        <h3 className="text-2xl md:text-3xl text-[--color-brand] font-semibold">
          Account Settings
        </h3>
        <p>
          Simply fill and upload the required information below, and we’ll take
          it from here
        </p>
      </div>
      <div>
        <div className="flex justify-between gap-[2px]">
          <button
            className={
              " md:w-full " +
              (tabState === 0
                ? "account-tab-button-active"
                : "account-tab-button")
            }
            onClick={() => setTabState(0)}
          >
            Basic Information
          </button>

          <button
            className={
              " md:w-full " +
              (tabState === 1
                ? "account-tab-button-active"
                : "account-tab-button")
            }
            onClick={() => setTabState(1)}
          >
            Next of Kin
          </button>
        </div>
        {tabState === 0 ? (
          <BasicInfoTab user={authenticatedUser} token={authenticationToken} />
        ) : tabState === 1 ? (
          <NextOfKinTab token={authenticationToken} signOut={signOut} />
        ) : null}
      </div>
    </main>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
