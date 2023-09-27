"use client";

import OTPField from "./branded/OTPField";
import { useEffect, useState } from "react";
import useCountdown from "../../utils/hooks/useCountdown";
import BarLoader from "../BarLoader";
import useRequestOtp from "../../utils/hooks/useRequestOtp";
import useConfirmOtp from "../../utils/hooks/useConfirmOtp";
import { useNotifyStore } from "../../utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeFromBase64 } from "../../utils/security";
import cn from "classnames";

const DELAY_MS = 30000;

function VerifyEmail({ email }) {
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const router = useRouter();
  const params = useSearchParams();
  const [authCode, setAuthCode] = useState(null);

  const { remainingTime, setFutureTimestamp } = useCountdown(Date.now());

  const setNotify = useNotifyStore((state) => state.setNotify);

  // extract auth code

  useEffect(() => {
    if (authCode) return;

    if (params.has("authCode")) {
      const t = params.get("authCode");

      setAuthCode(t);
    }
  }, [params, authCode]);

  // auto confirm of email if token is supplied via search params

  useEffect(() => {
    if (!authCode) return;

    if (params.get("uid") && params.get("token")) {
      const uid = params.get("uid");
      const token = decodeFromBase64(params.get("token"));

      // console.log({ uid, token });

      if (uid && token) {
        setOtp(token);
        setCodeSent(true);

        confirmOtpReq({
          channel: "EMAIL",
          token,
          foreignKey: email,
          uid,
          authCode,
        });

        return;
      }
    } else {
      if (email) {
        mutate({ email, channel: "EMAIL", authCode });
      }
    }
  }, [authCode]);

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
      content: "Your email has been confirmed. Proceed to KYC.",
      onAcceptText: "Continue",
      allowClose: false,
      onAccept: () => {
        router.replace(`/verify-kyc/document?authCode=${data.code}`);
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

    setOtp("");
    mutate({ email, channel: "EMAIL", authCode });
  }

  function handleActionBtn() {
    if (!codeSent) {
      mutate({ email, channel: "EMAIL", authCode });
      return;
    }

    if (confirmOtpIsLoading) return;

    confirmOtpReq({
      channel: "EMAIL",
      token: otp,
      foreignKey: email,
      uid: data?.uid || params.get("uid"),
      authCode,
    });
  }

  return (
    <div className="">
      <BarLoader v={0} active={isLoading || confirmOtpIsLoading} />

      <p className="text-[--text-secondary]">
        A code will be sent to {email}, kindly input the code to confirm your
        account.
      </p>

      {/* Code Sent Notification  */}

      <p
        className={
          "text-[--color-brand] pt-2 text-sm " +
          cn({
            " visible ": codeSent,
            " invisible ": !codeSent,
          })
        }
      >
        Code sent to {email}. Please check your inbox.
      </p>

      <div className="py-8 lg:py-12 space-y-6">
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
