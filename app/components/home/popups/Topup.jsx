"use client";

import { useState } from "react";
import GenericSelectField from "../../forms/branded/GenericSelectField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const dropdownData = [
  { name: "Debit card 531212 XXXX XXXX 1234", value: "debit" },
  { name: "Bank Transfer", value: "bank" },
];

const Topup = ({ btnFunc }) => {
  return (
    <div className="px-7 flex flex-col justify-between w-full h-full">
      <Formik
        validationSchema={Yup.object().shape({
          amount: Yup.number()
            .required("Please enter an amount")
            .positive("Please enter an amount greater than 0")
            .typeError("Please enter a valid amount"),

          fundingSource: Yup.string()
            .required("Please select a funding source")
            .oneOf(
              dropdownData.map((item) => item.value),
              "Please select a valid funding source"
            ),
        })}
        onSubmit={() => {}}
        initialValues={{
          fundingSource: "",
          amount: "",
        }}
        initialTouched={{
          fundingSource: true,
        }}
      >
        {({ isValid, setFieldValue }) => {
          return (
            <Form className="space-y-10">
              <div className="relative">
                <p className="account-form-text">Amount to Add</p>
                <Field
                  type="text"
                  inputMode="numeric"
                  placeholder="XXXXXXXXXXXX"
                  name="amount"
                  className="account-form-input"
                />

                <ErrorMessage
                  name="amount"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>
              <div className="relative">
                <p className="account-form-text">Funding Source</p>
                <div className="">
                  <GenericSelectField
                    items={dropdownData}
                    handleChange={({ selectedItem }) => {
                      setFieldValue("fundingSource", selectedItem.value, true);
                    }}
                  />
                  <ErrorMessage
                    name="fundingSource"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
              </div>

              <div className="py-8">
                <button
                  disabled={!isValid}
                  className="w-full text-white bg-[--color-brand] py-3 px-5 shadow rounded"
                  onClick={() => btnFunc()}
                >
                  Top-up
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Topup;
