"use client";

import GenericSelectField from "../forms/branded/GenericSelectField";
import { relationshipTypes } from "../../utils/constants";
import { parsePhoneNumber } from "awesome-phonenumber";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const yupSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  lastName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),

  phone: Yup.string()
    .required("Required")
    .min(10, "Must be 10 characters or more")
    .test("phone-is-valid", "Invalid phone number", function (value) {
      const result = parsePhoneNumber(value, { regionCode: "NG" });
      return result.valid;
    }),

  relationship: Yup.string()
    .required("Required")
    .min(2, "Invalid relationship type")
    .oneOf(
      relationshipTypes.map((item) => item.value),
      "Invalid relationship type"
    ),

  email: Yup.string().required("Required").email("Invalid email address"),
});

const NextOfKinTab = () => {
  return (
    <div className="py-7 space-y-7 font-medium">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          relationship: "",
          email: "",
        }}
        initialTouched={{
          relationship: true,
        }}
        validationSchema={yupSchema}
        onSubmit={() => {}}
      >
        {({ isValid, setFieldValue }) => {
          return (
            <Form className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 md:gap-y-7">
                <div className="relative">
                  <p className="account-form-text">First Name</p>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="account-form-input"
                  />

                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
                <div className="relative">
                  <p className="account-form-text">Last Name</p>
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="account-form-input"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
                <div className="relative">
                  <p className="account-form-text">Relationship</p>
                  <GenericSelectField
                    handleChange={({ selectedItem }) => {
                      setFieldValue("relationship", selectedItem.value, true);
                    }}
                    items={relationshipTypes}
                  />
                  <ErrorMessage
                    name="relationship"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
                <div className="relative">
                  <p className="account-form-text">Email</p>
                  <Field
                    name="email"
                    type="email"
                    placeholder="mail@email.com"
                    className="account-form-input"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
                <div className="relative">
                  <p className="account-form-text">Telephone</p>
                  <Field
                    name="phone"
                    type="text"
                    inputMode="tel"
                    placeholder="+2348000000000"
                    className="account-form-input"
                  />

                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
              </div>
              <div className="py-10 text-center">
                <button
                  disabled={!isValid}
                  className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--color-brand] rounded text-lg"
                >
                  Update Next of Kin
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NextOfKinTab;
