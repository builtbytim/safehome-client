"use client";

import { useState } from "react";
import Image from "next/image";
import HideIcon from "../../../assets/images/icons/password-hide.svg";
import GenericSelectField from "../forms/branded/GenericSelectField";
import ShowIcon from "../../../assets/images/icons/password-show.svg";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useChangePassword from "../../utils/hooks/useChangePassword";
import BarLoader from "../BarLoader";
import { useNotifyStore } from "../../utils/store";
import { securityQuestions } from "../../utils/constants";
import { TbRulerMeasure } from "react-icons/tb";

const SecurityQuestionsForm = ({ signOut, token, closeParent }) => {
  const setNotify = useNotifyStore((state) => state.setNotify);

  function onSuccess(data) {
    closeParent();

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
    closeParent();

    setNotify({
      show: true,
      content: err.message,
      allowClose: true,
      onAcceptText: "Close",
      onAccept: () => setNotify({ show: false }),
    });
  }

  const { mutate, isLoading } = useChangePassword(onSuccess, onError);

  async function handleSubmit(values) {
    if (isLoading) return;

    const payload = {
      body: {},

      token,
    };

    mutate(payload);
  }

  return (
    <div className="py-6 bg-white font-medium w-full ">
      <Formik
        validateOnMount
        initialValues={{
          question1: "",
          answer1: "",
          question2: "",
          answer2: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          question1: Yup.string()
            .required("Please select a security question")
            .oneOf(
              securityQuestions.map((q) => q.value),
              "Invalid question"
            ),
          answer1: Yup.string()
            .required("Please provide an answer")
            .min(6, "Answer must be at least 6 characters"),

          question2: Yup.string()
            .required("Please select a security question")
            .oneOf(
              securityQuestions.map((q) => q.value),
              "Invalid question"
            )
            .test("notSame", "Questions must be different", function (value) {
              if (!this.parent.question1) return true;
              return this.parent.question1 !== value;
            }),

          answer2: Yup.string()
            .required("Please provide an answer")
            .min(6, "Answer must be at least 6 characters"),
        })}
      >
        {({ isValid, setFieldValue }) => {
          return (
            <Form className="w-full relative  px-6 space-y-6">
              <div className="grid grid-cols-1 gap-5 md:gap-7 w-full  max-w-[500px] ">
                <BarLoader active={isLoading} />

                <div className="relative">
                  <p className="account-form-text">Security Question 1</p>
                  <GenericSelectField
                    type="text"
                    name="question1"
                    items={securityQuestions}
                    handleChange={({ selectedItem }) => {
                      setFieldValue("question1", selectedItem.value, true);
                    }}
                  />

                  <ErrorMessage
                    name="question1"
                    component="div"
                    className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>

                <div>
                  <p className="account-form-text">Answer</p>
                  <div className="account-form-icon-container relative">
                    <Field type="text" placeholder="" name="answer1" />

                    <ErrorMessage
                      name="answer1"
                      component="div"
                      className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>
                </div>

                <div className="relative">
                  <p className="account-form-text">Security Question 2</p>

                  <GenericSelectField
                    type="text"
                    name="question2"
                    items={securityQuestions}
                    handleChange={({ selectedItem }) => {
                      setFieldValue("question2", selectedItem.value, true);
                    }}
                  />

                  <ErrorMessage
                    name="question2"
                    component="div"
                    className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>

                <div>
                  <p className="account-form-text">Answer</p>
                  <div className="account-form-icon-container relative">
                    <Field type="text" placeholder="" name="answer2" />

                    <ErrorMessage
                      name="answer2"
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
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SecurityQuestionsForm;
