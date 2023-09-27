"use client";

import Spinner from "../Spinner";
import { useSearchParams, useRouter } from "next/navigation";
import config from "../../utils/config";
import {
  fetchUtil,
  makeUrl,
  extractErrorMessage,
} from "../../utils/fetchUtils";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import queryKeys from "../../utils/queryKeys";

function ConfirmPasswordReset() {
  const [inputs, setInputs] = useState({ uid: null, token: null });
  const [invalid, setInvalid] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const { isLoading, mutate, isSuccess, isError, error } = useMutation({
    mutationKey: [queryKeys.confirmResetPassword, inputs],
    mutationFn: async () => {
      const body = inputs;
      const url = makeUrl(config.apiPaths.confirmResetPassword);
      const res = await fetchUtil({
        method: "POST",
        body,
        url,
      });

      if (res.success) {
        return res.data;
      } else {
        throw { message: extractErrorMessage(res) };
      }
    },
  });

  useEffect(() => {
    if (searchParams.has("uid") && searchParams.has("token")) {
      setInputs({
        uid: searchParams.get("uid"),
        token: searchParams.get("token"),
      });
    } else {
      setInvalid(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isSuccess) return;

    if (inputs.uid && inputs.token) {
      mutate();
    }
  }, [inputs]);

  return (
    <>
      <div className="text-[--text-secondary]">
        {isLoading && <p>Verifying your reset token...</p>}
        {isSuccess && <p> Reset token verified </p>}
        {isError && <p> Reset token verification failed </p>}
        {invalid && <p> Invalid reset token </p>}
      </div>

      <div>
        {!isSuccess && !isError && !invalid && (
          <div className="py-24 flex flex-col justify-center items-center">
            <Spinner size="huge" />
          </div>
        )}

        {isSuccess && (
          <div className="py-8 flex flex-col justify-center items-center">
            <p className="text-[--text-secondary] text-center">
              Your password has been reset successfully. Please proceed and sign
              in with your new password.
            </p>

            <button
              className="mt-8 text-primary hover:text-primary-dark"
              onClick={() => {
                router.replace("/sign-in");
              }}
            >
              Sign in
            </button>
          </div>
        )}

        {isError && (
          <div className="py-8 flex flex-col justify-center items-center">
            <p className="text-[--text-secondary] text-center">
              Your password reset could not be completed.{" "}
              {typeof error.message !== "object" && error.message}
            </p>

            <button
              className="mt-8 text-primary hover:text-primary-dark"
              onClick={() => {
                router.replace("/");
              }}
            >
              Go Home
            </button>
          </div>
        )}

        {invalid && (
          <div className="py-8 flex flex-col justify-center items-center">
            <p className="text-[--text-secondary] text-center">
              {" "}
              The reset link you entered is invalid or incomplete, please check
              your inbox and click on the link again.
            </p>

            <button
              className="mt-8 text-primary hover:text-primary-dark"
              onClick={() => {
                router.replace("/");
              }}
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ConfirmPasswordReset;
