"use client";

import { useState } from "react";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import { FaNairaSign } from "react-icons/fa6";
import FormattingField from "../../forms/branded/FormattingField";
import { NumericFormat } from "react-number-format";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MiniSwitch from "../../MiniSwitch";

const fundingSources = [
  {
    name: "Wallet",
    value: "wallet",
  },
  {
    name: "Bank Account",
    value: "bank_account",
  },
];

const InvestNow = ({ data }) => {
  return (
    <div className="px-7 pb-8 space-y-8 text-[--text-secondary]">
      <div className="flex justify-between gap-5">
        <p className="text-xl leading-[1.65rem] max-h-[3.3rem] font-medium text-[--text-secondary] capitalize">
          {data.assetName}
        </p>
        <div className="text-right">
          <p className="text-[--text-brand] font-medium text-2xl">
            <NumericFormat
              value={data.pricePerUnit}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦ "}
            />
          </p>
          <p className="text-[--placeholder] font-light mt-[-8px]">Per unit</p>
        </div>
      </div>

      <Formik
        initialValues={{
          amount: "",
          fundingSource: "",
          units: "",
          acceptTerms: false,
        }}
      >
        {({ isValid, setFieldValue }) => {
          return (
            <Form className="space-y-5">
              <div>
                <p className="form-text">How many units?</p>

                <FormattingField
                  type="text"
                  inputMode="numeric"
                  placeholder="Total number of units"
                  name="units"
                  extraClasses="field-1"
                />
              </div>
              <div>
                <p className="form-text">Amount to pay</p>

                <FormattingField
                  icon={FaNairaSign}
                  type="text"
                  inputMode="numeric"
                  placeholder="Amount auto-generates due to units."
                  name="amount"
                  extraClasses="field-1"
                  disabled
                />
              </div>
              <div className="relative">
                <p className="form-text">Fund Source</p>
                <GenericSelectFieldVariant1
                  defaultSelectedItem={fundingSources[0]}
                  handleChange={({ selectedItem }) => {
                    setFieldValue("fundingSource", selectedItem.value, true);
                  }}
                  items={fundingSources}
                />
              </div>

              <div className="flex gap-3">
                <MiniSwitch
                  onChange={(v) => {
                    setFieldValue("acceptTerms", v, true);
                  }}
                />
                <p>
                  I agree to the{" "}
                  <span className="text-[--text-brand] cursor-pointer">
                    terms and conditions
                  </span>
                </p>
              </div>

              <div className="py-5">
                <button
                  disabled={!isValid}
                  className="w-full text-white bg-[--text-brand] py-3 px-5 shadow rounded"
                >
                  Invest Now
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InvestNow;
