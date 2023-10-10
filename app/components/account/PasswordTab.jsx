"use client";

import { useState } from "react";
import Image from "next/image";
import HideIcon from "../../../assets/images/icons/password-hide.svg";
import ShowIcon from "../../../assets/images/icons/password-show.svg";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useChangePassword from "../../utils/hooks/useChangePassword";
import BarLoader from "../BarLoader";
import { useNotifyStore } from "../../utils/store";

const PasswordTab = ({ signOut, token }) => {
  const setNotify = useNotifyStore((state) => state.setNotify);

  function onSuccess(data) {
    setNotify({
      show: true,
      content:
        "Password changed successfully, you must sign in with your new password to continue",
      allowClose: false,
      onAcceptText: "Proceed",
      onAccept: signOut,
    });
  }

  function onError(err) {
    setNotify({
      show: true,
      content: err.message,
      allowClose: true,
      onAcceptText: "Close",
      onAccept: () => setNotify({ show: false }),
    });
  }

  const { mutate, isLoading } = useChangePassword(onSuccess, onError);

  const [isHidden1, setIsHidden1] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);

  async function handleSubmit(values) {
    if (isLoading) return;

    const payload = {
      body: {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },

      token,
    };

    mutate(payload);
  }

  return (
    <div className="py-7 font-medium w-full ">
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string()
            .min(8, "Must be 8 characters or more")
            .max(25, "Too long")
            .required("Required"),
          newPassword: Yup.string()
            .min(8, "Must be 8 characters or more")
            .max(25, "Too long")
            .required("Required"),
          newPasswordConfirmation: Yup.string()
            .min(8, "Must be 8 characters or more")
            .max(25, "Too long")
            .required("Required")
            .test(
              "passwords-match",
              "New passwords must match",
              function (value) {
                return this.parent.newPassword === value;
              }
            ),
        })}
      >
        {({ isValid }) => {
          return (
            <Form className="w-full relative py-6">
              <div className="grid grid-cols-1 gap-5 md:gap-7 w-full  max-w-[500px]">
                <BarLoader active={isLoading} />

                <div>
                  <p className="account-form-text">Current Password</p>
                  <div className="account-form-icon-container relative">
                    <Field
                      type={isHidden1 ? "password" : "text"}
                      placeholder="Current Password"
                      name="currentPassword"
                    />
                    <button
                      type="button"
                      onClick={() => setIsHidden1((prev) => !prev)}
                    >
                      <Image
                        priority
                        src={isHidden1 ? ShowIcon : HideIcon}
                        alt="User"
                        width="auto"
                        height="auto"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                </div>
                <div>
                  <p className="account-form-text">New Password</p>
                  <div className="account-form-icon-container relative">
                    <Field
                      type={isHidden2 ? "password" : "text"}
                      placeholder="New Password"
                      name="newPassword"
                    />
                    <button
                      type="button"
                      onClick={() => setIsHidden2((prev) => !prev)}
                    >
                      <Image
                        priority
                        src={isHidden2 ? ShowIcon : HideIcon}
                        alt="User"
                        width="auto"
                        height="auto"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                </div>
                <div>
                  <p className="account-form-text">Confirm New Password</p>
                  <div className="account-form-icon-container relative">
                    <Field
                      type={isHidden2 ? "password" : "text"}
                      placeholder="Confirm Password"
                      name="newPasswordConfirmation"
                    />
                    <button
                      type="button"
                      onClick={() => setIsHidden2((prev) => !prev)}
                    >
                      <Image
                        priority
                        src={isHidden2 ? ShowIcon : HideIcon}
                        alt="User"
                        width="auto"
                        height="auto"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <ErrorMessage
                      name="newPasswordConfirmation"
                      component="div"
                      className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                </div>
              </div>
              <div className="py-10 text-center flex flex-col justify-center items-center w-full">
                <button
                  disabled={!isValid || isLoading}
                  className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                >
                  Change Password
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PasswordTab;
