"use client";

import SecureRoute from "../../components/SecureRoute";
import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Image from "next/image";
import { useDataStore } from "../../utils/store";

import {
  BasicInfoTab,
  PasswordTab,
  NextOfKinTab,
} from "../../components/account";

function Page({ authenticatedUser, authenticationToken, signOut }) {
  const [tabState, setTabState] = useState(0);
  const setDataStore = useDataStore((state) => state.setData);

  useEffect(() => {
    setDataStore({ user: authenticatedUser });
  }, [authenticatedUser]);

  return (
    <main className=" space-y-8 lg:space-y-10 text-[--text-secondary] border border-[--lines] p-5 h-full rounded-2xl">
      <div className="pb-3 space-y-2">
        <h3 className="text-3xl text-[--color-brand] font-semibold">
          Account Settings
        </h3>
        <p>
          Simply fill and upload the required information below, and we’ll take
          it from here
        </p>
      </div>
      <div>
        <div className="flex gap-[2px]">
          <button
            className={
              tabState === 0
                ? "account-tab-button-active"
                : "account-tab-button"
            }
            onClick={() => setTabState(0)}
          >
            Basic Information
          </button>
          <button
            className={
              tabState === 1
                ? "account-tab-button-active"
                : "account-tab-button"
            }
            onClick={() => setTabState(1)}
          >
            Password
          </button>
          <button
            className={
              tabState === 2
                ? "account-tab-button-active"
                : "account-tab-button"
            }
            onClick={() => setTabState(2)}
          >
            Next of Kin
          </button>
        </div>
        {tabState === 0 ? (
          <BasicInfoTab user={authenticatedUser} />
        ) : tabState === 1 ? (
          <PasswordTab token={authenticationToken} signOut={signOut} />
        ) : (
          <NextOfKinTab />
        )}
        <div>
          {tabState === 4 ? (
            <div className="py-10 text-center">
              <button className="w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg">
                Update Next of Kin
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
