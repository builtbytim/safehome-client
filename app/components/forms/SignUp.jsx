"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import cn from "classnames";
import { BsArrowRight, BsArrowLeftShort } from "react-icons/bs";
import { parsePhoneNumber } from "awesome-phonenumber";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import useSignUp from "../../utils/hooks/useSignUp";
import { useNotifyStore } from "../../utils/store";
import { useRouter } from "next/navigation";
import BarLoader from "../BarLoader";

const yupSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  surname: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  phone: Yup.string()
    .required("Required")
    .min(10, "Must be 10 characters or more")
    .test("phone-is-valid", "Invalid phone number", function (value) {
      const result = parsePhoneNumber(value, { regionCode: "NG" });
      return result.valid;
    }),

  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .max(25, "Too long")
    .required("Required"),

  cpassword: Yup.string()
    .min(8, "Must be 8 characters or more")
    .max(25, "Too long")
    .required("Required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

function SignUp() {
  const router = useRouter();
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const setNotify = useNotifyStore((state) => state.setNotify);

  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const { mutate, isLoading, reset } = useSignUp(onError, onSuccess);
  function onError(err) {
    setNotify({
      show: true,
      title: "Unable to Sign Up",
      content: err?.message,
    });
    reset();
  }

  function onSuccess(data) {
    router.push(`/verify-email/${data.email}`);
  }

  async function handleSubmit(values) {
    if (isLoading) return;

    const body = {
      firstName: values.firstName,
      lastName: values.surname,
      phone: parsePhoneNumber(values.phone, { regionCode: "NG" }).number.e164,
      email: values.email,
      password: values.cpassword,
    };

    mutate(body);
  }

  function toNext() {
    setIsFirstSlide(false);
  }

  function toPrev() {
    setIsFirstSlide(true);
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
      }}
      validationSchema={yupSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => {
        return (
          <Form className="flex flex-col justify-center items-center space-y-4">
            <BarLoader active={isLoading} />

            <div>
              <legend className="font-bold text-center text-lg lg:text-xl text-[--text-brand]">
                Create a new account
              </legend>
              <p className="text-center text-xs text-[--text-secondary] ">
                {" "}
                Securely sign up for SafeHome{" "}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center  w-full">
              {/* Slide 1  */}

              <div
                className={
                  "space-y-6 w-full " +
                  cn({
                    " block ": isFirstSlide,
                    " hidden ": !isFirstSlide,
                  })
                }
              >
                <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-[--text-secondary] text-sm text-left"
                  >
                    First Name
                  </label>

                  <Field
                    name="firstName"
                    type="text"
                    className="field-1"
                    placeholder="First Name"
                  />

                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>

                <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                  <label
                    htmlFor="surname"
                    className="text-[--text-secondary] text-sm text-left"
                  >
                    Surname
                  </label>

                  <Field
                    name="surname"
                    type="text"
                    className="field-1"
                    placeholder="Surname"
                  />

                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>

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
              </div>

              {/* Slide 1 ends  */}

              {/* Slide 2  */}

              <div
                className={
                  "space-y-6 w-full " +
                  cn({
                    " block ": !isFirstSlide,
                    " hidden ": isFirstSlide,
                  })
                }
              >
                {" "}
                <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-[--text-secondary] text-sm text-left"
                  >
                    Phone Number
                  </label>

                  <Field
                    name="phone"
                    type="tel"
                    className="field-1"
                    placeholder="Phone number"
                  />

                  <ErrorMessage
                    name="phone"
                    inputMode="numeric"
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
                      className="absolute top-[50%] -translate-y-[50%] right-[5%] text-[--text-secondary] text-xs text-right cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
                <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                  <label
                    htmlFor="cpassword"
                    className="text-[--text-secondary] text-sm text-left"
                  >
                    Confirm Password
                  </label>

                  <div className="relative w-full">
                    <Field
                      name="cpassword"
                      type={showPassword ? "text" : "password"}
                      className="field-1"
                      placeholder="Confirm Password"
                    />

                    <div
                      className="absolute top-[50%] -translate-y-[50%] right-[5%] text-[--text-secondary] text-xs text-right cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="cpassword"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
              </div>

              {/* Slide 2 ends  */}
            </div>

            {isFirstSlide ? (
              <div className="flex flex-col justify-center items-center w-full pt-8 space-y-4  ">
                <button
                  onClick={toNext}
                  role="button"
                  type="button"
                  className="btn-1 inline-flex justify-center space-x-2 items-center"
                >
                  <span>Next</span>

                  <BsArrowRight className="text-xl lg:text-2xl" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full   space-y-2 pt-2">
                <button
                  onClick={toPrev}
                  type="button"
                  role="button"
                  className="btn-1 self-stretch px-0 bg-white hover:bg-white  border-[--color-brand] rounded-r-none  inline-flex justify-start  items-center"
                >
                  <BsArrowLeftShort className="text-[--color-brand] hover:text-[--color-brand-hover] text-2xl transitioning border rounded-full" />
                </button>
                <button
                  disabled={!isValid}
                  role="form"
                  type="submit"
                  className="btn-1 "
                >
                  Create Account
                </button>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignUp;
