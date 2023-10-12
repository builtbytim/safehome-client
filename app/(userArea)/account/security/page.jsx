"use client";

import SecureRoute from "../../../components/SecureRoute";

import { useState, useRef, useEffect } from "react";
import { PasswordTab, SecurityQuestionsTab } from "../../../components/account";
import Overlay from "../../../components/Overlay2";
import { ToggleCard, PopUpTopBar } from "../../../components/security";

function Page({ signOut, authenticationToken, authenticatedUser }) {
  const [securityQuestionToggled, setSecurityQuestionToggled] = useState(false);

  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showSecurityQuestionTab, setShowSecurityQuestionTab] = useState(false);
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false);

  // Hide Popups when not clicked on
  const changePasswordRef = useRef(null);
  const smschangePasswordRef = useRef(null);
  const securityQRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        changePasswordRef.current &&
        !changePasswordRef.current.contains(event.target)
      ) {
        setShowPasswordTab(false);
      }
      if (
        smschangePasswordRef.current &&
        !smschangePasswordRef.current.contains(event.target)
      ) {
        setShowSecurityQuestionTab(false);
      }
      if (
        securityQRef.current &&
        !securityQRef.current.contains(event.target)
      ) {
        setShowSecurityQuestion(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showPasswordTab, showSecurityQuestionTab, showSecurityQuestion]);

  return (
    <main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] pt-8  h-full min-h-[80vh] rounded-2xl">
      <div className="px-6 md:pb-3 space-y-4">
        <h3 className="text-2xl md:text-3xl text-[--color-brand] font-semibold">
          Security
        </h3>
        <p className="text-sm md:text-lg">
          Enable any at least any security options of your choice to protect
          your SafeHome account.
        </p>
      </div>

      <div className="space-y-6">
        <ToggleCard
          heading="Email Verification"
          text="Receive a six digit code sent to your registered Email Address to verify important account actions."
          recommended="yes"
          active
          readOnly
          toggleFunc={() =>
            securityQuestionToggled === true
              ? setSecurityQuestionToggled(false)
              : setShowSecurityQuestion(true)
          }
        />
        <ToggleCard
          heading="Change Password"
          text="Change the password to your SafeHome account"
          recommended="no"
          handleClick={() => setShowPasswordTab(true)}
        />
        <ToggleCard
          heading="Security Question"
          text="Set a security Question to provide more security for your SafeHome account."
          recommended="no"
          handleClick={() => setShowSecurityQuestionTab(true)}
        />
      </div>

      {showPasswordTab && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
              ref={changePasswordRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowPasswordTab(false)}
                  title="Change Password"
                  desc="Change your password using the form below"
                />
              </div>
              <div className="">
                <PasswordTab
                  signOut={signOut}
                  token={authenticationToken}
                  closeParent={() => setShowPasswordTab(false)}
                />
              </div>
            </div>
          </Overlay>
        </div>
      )}

      {showSecurityQuestionTab && (
        <div className="fixed  left-0 w-full  bg-black/50 z-20">
          <Overlay z={3}>
            <div
              className="fixed inset-y-0 right-0 w-full md:w-[493px]  pb-[5vh] bg-white overflow-y-auto shadow"
              ref={smschangePasswordRef}
            >
              <div className="  w-full md:w-[493px] bg-white ">
                <PopUpTopBar
                  close={() => setShowSecurityQuestionTab(false)}
                  title="Security Question"
                  desc="Make sure you input the right information"
                />
              </div>
              <div className=" ">
                <SecurityQuestionsTab
                  signOut={signOut}
                  token={authenticationToken}
                  user={authenticatedUser}
                  closeParent={() => setShowSecurityQuestionTab(false)}
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
