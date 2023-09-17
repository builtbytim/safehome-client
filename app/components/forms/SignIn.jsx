"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignIn() {
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isValid }) => (
        <Form className="flex flex-col justify-center items-center space-y-4">
          <div>
            <legend className="font-bold text-center text-lg lg:text-xl text-[--text-brand]">
              Log in to your account
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

              <Field
                name="password"
                type="password"
                className="field-1"
                placeholder="Password"
              />

              <ErrorMessage
                name="password"
                component="div"
                className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full pt-8 space-y-4 ">
            <button disabled={!isValid} type="submit" className="btn-1">
              Log in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignIn;
