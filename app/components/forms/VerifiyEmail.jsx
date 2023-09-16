"use client";

import React from "react";
import OTPField from "./branded/OTPField";
import { useState } from "react";
import useCountdown from "../../utils/hooks/useCountdown";

const DELAY_MS = 30000;

function VerifiyEmail() {
  const [otp, setOtp] = useState("");

  const { remainingTime, setFutureTimestamp } = useCountdown(
    Date.now() + DELAY_MS
  );

  const disableResend = remainingTime.secondsNum + remainingTime.minutesNum > 0;

  function resendCode() {
    setFutureTimestamp(Date.now() + DELAY_MS);
  }

  return (
    <div className="">
      <div className="py-8 lg:py-16 space-y-6">
        <h2 className="text-black text-center capitalize text-lg lg:text-xl">
          Enter 6 Digits Code{" "}
        </h2>

        <OTPField otp={otp} setOtp={setOtp} numInputs={6} />
      </div>

      {/* Actions  */}

      <div className="flex flex-col justify-center items-center space-y-10">
        {!disableResend ? (
          <button
            onClick={resendCode}
            disabled={disableResend}
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

        <button className="btn-1 max-w-[368px]">Continue</button>
      </div>
    </div>
  );
}

export default VerifiyEmail;
