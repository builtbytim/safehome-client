"use client";

import OTPField from "./branded/OTPField";
import { useState } from "react";
import useCountdown from "../../utils/hooks/useCountdown";
import BarLoader from "../BarLoader";
import useRequestOtp from "../../utils/hooks/useRequestOtp";
import useConfirmOtp from "../../utils/hooks/useConfirmOtp";
import { useNotifyStore } from "../../utils/store";
import { useRouter } from "next/navigation";

const DELAY_MS = 30000;

function VerifyEmail({ email }) {
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const router = useRouter();

  const { remainingTime, setFutureTimestamp } = useCountdown(Date.now());

  const setNotify = useNotifyStore((state) => state.setNotify);

  function onError(err) {
    setNotify({
      show: true,
      title: "Unable to request OTP",
      content: err?.message,
    });
    reset();
  }

  function onError2(err) {
    setNotify({
      show: true,
      title: "Unable to confirm OTP",
      content: err?.message,
    });
    confirmOtpReset();
  }

  function onSuccess(data) {
    if (!codeSent) {
      setCodeSent(true);
    }
    setFutureTimestamp(Date.now() + (DELAY_MS + resendCount * DELAY_MS));
    setResendCount(resendCount + 1);
  }

  function onSuccess2(data) {
    setNotify({
      show: true,
      title: "OTP Confirmed",
      content:
        "Your account has been successfully verified. Proceed to sign in.",
      acceptText: "Continue",
      allowClose: false,
      onAccept: () => {
        router.replace("/sign-in");
      },
    });
  }

  const { mutate, isLoading, reset, data } = useRequestOtp(onError, onSuccess);
  const {
    mutate: confirmOtpReq,
    isLoading: confirmOtpIsLoading,
    reset: confirmOtpReset,
  } = useConfirmOtp(onError2, onSuccess2);

  const disableResend = remainingTime.secondsNum + remainingTime.minutesNum > 0;

  function resendCode() {
    if (disableResend) return;

    if (isLoading) return;
    mutate({ email, channel: "EMAIL" });
  }

  function handleActionBtn() {
    if (!codeSent) {
      mutate({ email, channel: "EMAIL" });
      return;
    }

    if (confirmOtpIsLoading) return;

    confirmOtpReq({
      channel: "EMAIL",
      token: otp,
      foreignKey: email,
      uid: data.uid,
    });
  }

  return (
    <div className="">
      <BarLoader v={0} active={isLoading || confirmOtpIsLoading} />

      <p className="text-[--text-secondary]">
        A code will be sent to {email}, kindly input the code to confirm your
        account.
      </p>
      <div className="py-8 lg:py-16 space-y-6">
        <h2 className="text-black text-center capitalize text-lg lg:text-xl">
          Enter 6 Digits Code{" "}
        </h2>

        <OTPField otp={otp} setOtp={setOtp} numInputs={6} />
      </div>

      {/* Actions  */}

      <div className="flex flex-col justify-center items-center space-y-10">
        <>
          {!disableResend ? (
            <button
              onClick={resendCode}
              disabled={disableResend || !codeSent}
              className="text-[--color-brand] disabled:pointer-events-none disabled:opacity-60 block  border-b border-[--color-brand] pb-1 hover:text-[--color-brand-hover] transitioning  text-center"
            >
              Resend Verification Code
            </button>
          ) : (
            <p className="text-[--placeholder] block  border-b border-[--placeholder] pb-1">
              {" "}
              Retry in{" "}
              {remainingTime.minutesNum > 0 && `${remainingTime.minutesStr}: `}
              {remainingTime.secondsStr}
            </p>
          )}
        </>

        <button
          disabled={
            (codeSent && otp.length < 6) || confirmOtpIsLoading || isLoading
          }
          onClick={handleActionBtn}
          className="btn-1 max-w-[368px]"
        >
          {codeSent ? "Continue" : "Send Code"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
