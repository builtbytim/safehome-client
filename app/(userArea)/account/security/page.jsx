"use client";

import { useState, useRef, useEffect } from "react";
import { PasswordTab } from "../../../components/account";

import {
  ToggleCard,
  Authenticator,
  SMSAuthenticator,
  PopUpTopBar,
  SecurityQuestionAuth,
} from "../../../components/security";

export default function Security() {
  const [securityQuestionToggled, setSecurityQuestionToggled] = useState(false);

  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [showSecurityQuestionTab, setShowSecurityQuestionTab] = useState(false);
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false);

  const saveAuth = () => {
    setShowPasswordTab(false);
    setAuthAppToggled(true);
  };

  const saveSMSAuth = () => {
    setShowSecurityQuestionTab(false);
    setSmsAuthToggled(true);
  };

  const setSecurityQuestion = () => {
    setShowSecurityQuestion(false);
    setSecurityQuestionToggled(true);
  };

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
    <main className=" space-y-8 lg:space-y-8 text-[--text-secondary] border border-[--lines] pt-8 px-6 h-full min-h-[80vh] rounded-2xl">
      <div className="pb-3 space-y-2">
        <h3 className="text-3xl text-[--color-brand] font-semibold">
          Security
        </h3>
        <p>
          Enable any at least any security options of your choice to protect
          your SafeHome account.
        </p>
      </div>

      <div className="space-y-7">
        <ToggleCard
          heading="Change Password"
          text="Change the password to your SafeHome account"
          recommended="no"
          handleClick={() => setShowPasswordTab(!showPasswordTab)}
        />
        <ToggleCard
          heading="Security Question"
          text="Set a security Question to provide more security for your SafeHome account."
          recommended="no"
        />
        <ToggleCard
          heading="Email Verification"
          text="Receive a six digit code sent to your registered Email Address."
          recommended="yes"
          active={securityQuestionToggled}
          toggleFunc={() =>
            securityQuestionToggled === true
              ? setSecurityQuestionToggled(false)
              : setShowSecurityQuestion(true)
          }
        />
      </div>

      {showPasswordTab && (
        <div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
          <div
            className="fixed top-[-40px] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
            ref={changePasswordRef}
          >
            <div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
              <PopUpTopBar
                close={() => setShowPasswordTab(false)}
                title="About Investment"
                desc="Use the form below to purchase enough investment units."
              />
            </div>
            <div className="pt-[230px]">
              <PasswordTab />
            </div>
          </div>
        </div>
      )}

      {showSecurityQuestionTab && (
        <div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
          <div
            className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
            ref={smschangePasswordRef}
          >
            <div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
              <PopUpTopBar
                close={() => setShowSecurityQuestionTab(false)}
                title="Text Message"
                desc="Receive a prompt from your mobile app to confirm it’s you."
              />
            </div>
            <div className="pt-[230px]">
              <SMSAuthenticator
                saveFunc={() => saveSMSAuth()}
                closeFunc={() => setShowSecurityQuestionTab(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showSecurityQuestion && (
        <div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
          <div
            className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
            ref={securityQRef}
          >
            <div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
              <PopUpTopBar
                close={() => setShowSecurityQuestion(false)}
                title="Security Question"
                desc="Answer a security question to confirm it’s you."
              />
            </div>
            <div className="pt-[230px] h-full">
              <SecurityQuestionAuth
                saveFunc={() => setSecurityQuestion()}
                closeFunc={() => setShowSecurityQuestion(false)}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
