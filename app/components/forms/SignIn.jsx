"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BarLoader from "../BarLoader";
import useSignIn from "../../utils/hooks/useSignIn";
import { useNotifyStore } from "../../utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import config from "../../utils/config";
import { saveToLocalStorage } from "../../utils/security";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useState } from "react";

function SignIn() {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();

  const mode =
    searchParams.get(config.signInModeParam) || config.signInModes.REGULAR;

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const router = useRouter();

  function onError(err, vars) {
    const action = err.action;

    switch (action) {
      case "VERIFY_EMAIL":
        setNotify({
          show: true,
          title: "Unable to sign in",
          content: err?.message,
          onAcceptText: "Verify Email",
          onAccept: () => {
            router.push(
              `/verify-email/${vars.username}?authCode=${err?.authCode}`
            );
          },
        });

        break;

      case "VERIFY_KYC":
        setNotify({
          show: true,
          title: "Unable to sign in",
          content: err?.message,
          onAcceptText: "Verify KYC",
          onAccept: () => {
            router.push(`/kyc?authCode=${err?.authCode}`);
          },
        });

        break;

      default:
        setNotify({
          show: true,
          title: "Unable to sign in",
          content: err?.message,
        });
        reset();
        break;
    }
  }

  function onSuccess(data) {
    const tokenObj = {
      ...data,

      createdAt: Date.now(),
    };

    saveToLocalStorage(tokenObj, `${config.localStorageKey}:token`);

    if (searchParams.has(config.redirectSearchParam)) {
      let targetUrl = searchParams.get(config.redirectSearchParam);

      const decodedUrl = decodeURIComponent(targetUrl);

      if (config.signInRedirectIgnore.includes(decodedUrl)) {
        router.push(config.authenticatedHome);
        return;
      }

      router.push(decodedUrl);
      return;
    }

    router.push(config.authenticatedHome);
  }

  const { mutate, isLoading, reset } = useSignIn(onSuccess, onError);

  function handleSignIn(values) {
    if (isLoading) return;

    const body = {
      username: values.email,
      password: values.password,
    };

    mutate(body);
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      })}
      onSubmit={handleSignIn}
    >
      {({ isValid }) => (
        <Form className="flex  flex-col border-0 justify-center items-center space-y-4">
          <BarLoader active={isLoading} />

          <div>
            <legend className="font-bold text-center text-lg lg:text-xl text-[--color-brand]">
              {mode === config.signInModes.AUTH_FAILED &&
                "Session Expired, Log in again"}
              {mode === config.signInModes.REGULAR && "Welcome Back"}

              {mode === config.signInModes.NEW_USER && "Log in to your account"}
              {!Object.values(config.signInModes).includes(mode) &&
                "Welcome Back"}
            </legend>
            <p className="text-center text-xs text-[--text-secondary] ">
              {" "}
              Securely log in to your SafeHome{" "}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center space-y-6 w-full">
            <div className="w-full relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="email"
                className="text-[--text-secondary] text-sm text-left"
              >
                Email Address
              </label>

              <Field
                name="email"
                type="email"
                className="field-1"
                placeholder="Email"
              />

              <ErrorMessage
                name="email"
                component="div"
                className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>

            <div className="w-full relative flex flex-col justify-center items-start space-y-2">
              <label
                htmlFor="password"
                className="text-[--text-secondary] text-sm text-left"
              >
                Password
              </label>

              <div className="relative w-full">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="field-1"
                  placeholder="Password"
                />

                <div
                  className="absolute top-[50%] -translate-y-[50%] right-[5%] text-[--text-secondary]  text-right cursor-pointer text-xl"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </div>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full pt-8 space-y-4 ">
            <button
              disabled={!isValid || isLoading}
              type="submit"
              className="btn-1"
            >
              Log in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignIn;
