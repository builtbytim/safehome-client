"use client";

import React from "react";
import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import { Form, Formik, Field, ErrorMessage } from "formik";
import SwitchField from "../../forms/branded/SwitchField";
import FormattingField from "../../forms/branded/FormattingField";
import { FaNairaSign } from "react-icons/fa6";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { useRef } from "react";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";

const intervals = [
  {
    name: "Daily",
    value: "daily",
  },
  {
    name: "Weekly",
    value: "weekly",
  },
  {
    name: "Monthly",
    value: "monthly",
  },
  {
    name: "Quarterly",
    value: "quarterly",
  },
  {
    name: "Yearly",
    value: "yearly",
  },
];

function GoalCreation2({
  show = false,
  toggleShow,
  goBack,
  formData,
  handleSubmit,
}) {
  const validationSchema = Yup.object().shape({
    preferredInterval: Yup.string()
      .required("Required")
      .oneOf(
        intervals.map((interval) => interval.value),
        "Invalid interval"
      ),

    amountToSaveOnDailyBasis: Yup.number()
      .required("Required")
      .min(1, "Amount must be greater than 0")
      .typeError("Invalid amount")
      .test(
        "must-be-less-than-goal-amount",
        "Amount must be less than goal amount",
        (value) => {
          const goalAmount = formData.goalAmount;
          return value < goalAmount;
        }
      ),

    startDate: Yup.date().required("Required"),

    withdrawalDate: Yup.date()
      .required("Required")
      .test(
        "is-greater-than-start-date",
        "Must be later than the start date",
        (value, context) => {
          const startDate = context.parent.startDate;
          const withdrawalDate = value;

          if (!startDate || !withdrawalDate) return true;

          const startDateObj = new Date(startDate);
          const withdrawalDateObj = new Date(withdrawalDate);

          return withdrawalDateObj > startDateObj;
        }
      ),

    acceptTerms: Yup.boolean().isTrue(
      "You must accept the terms and conditions to continue"
    ),
  });
  const ref = useRef(null);

  useOutsideClickDetector(ref, () => {
    if (show) toggleShow();
  });

  function handleFormSubmit(values) {
    console.log(values);
  }

  return (
    <Overlay2 pos="center">
      <section
        ref={ref}
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 px-6 py-6"
        }
      >
        <div className="flex flex-row justify-end items-center">
          <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning">
            <BiX onClick={toggleShow} className="text-[--primary] text-2xl" />
          </div>
        </div>

        <div className="space-y-4 mt-6 max-h-[90vh] md:max-h-[85vh] overflow-y-auto no-scrollbar pb-8">
          <h1 className="text-[--text-brand-2] text-lg md:text-xl lg:text-2xl font-semibold">
            Final Setup Stage
          </h1>
          <p className="font-medium text-[--primary] text-sm md:text-base">
            Finalize your goal settings
          </p>

          {/* Form now  */}

          <div>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                preferredInterval:
                  formData.preferredInterval || intervals[0].value,

                amountToSaveOnDailyBasis:
                  formData.amountToSaveOnDailyBasis || "",

                startDate: formData.startDate || "",
                withdrawalDate: formData.withdrawalDate || "",
                acceptTerms: formData.acceptTerms || false,
              }}
              initialTouched={{
                acceptTerms: true,
                preferredInterval: true,
              }}
              onSubmit={handleFormSubmit}
            >
              {({ isValid, setFieldValue }) => {
                return (
                  <Form className="space-y-6">
                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="preferredInterval"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Preferred Interval
                      </label>

                      <GenericSelectFieldVariant1
                        defaultSelectedItem={intervals[0]}
                        handleChange={({ selectedItem }) => {
                          setFieldValue(
                            "preferredInterval",
                            selectedItem.value,
                            true
                          );
                        }}
                        items={intervals}
                      />

                      <ErrorMessage
                        name="preferredInterval"
                        component="div"
                        className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="amountToSaveOnDailyBasis"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Preferred amount to save on interval basis
                      </label>

                      <FormattingField
                        icon={FaNairaSign}
                        type="text"
                        inputMode="numeric"
                        className="field-1"
                        name="amountToSaveOnDailyBasis"
                        placeholder="Amount to save on interval basis"
                        extraClasses="field-1"
                      />

                      <ErrorMessage
                        name="amountToSaveOnDailyBasis"
                        component="div"
                        className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="startDate"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Set Start Date
                      </label>

                      <Field
                        name="startDate"
                        type="date"
                        className="field-1"
                        placeholder=""
                      />

                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="withdrawalDate"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Set Withdrawal Date
                      </label>

                      <Field
                        name="withdrawalDate"
                        type="date"
                        className="field-1"
                        placeholder=""
                      />

                      <ErrorMessage
                        name="withdrawalDate"
                        component="div"
                        className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    {/* <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                      <label
                        htmlFor="primarySource"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        Set a Primary Source
                      </label>

                      <Field
                        as="select"
                        name="primarySource"
                        type="text"
                        className="field-1"
                        placeholder=""
                      >
                        <option value=""> Wallet </option>
                        <option value=""> Reserve </option>
                      </Field>

                      <ErrorMessage
                        name="primarySource"
                        component="div"
                        className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div> */}

                    <div className="w-full pt-2 relative flex flex-col justify-center items-start space-y-2 ">
                      <SwitchField
                        handleChange={(value) => {
                          setFieldValue("acceptTerms", value, true);
                        }}
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="text-[--text-secondary] font-medium text-sm text-left"
                      >
                        I acknowledge and agree that in the event I do not
                        achieve the Goal amount of{" "}
                        <NumericFormat
                          value={formData.goalAmount}
                          prefix="₦ "
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        by the set withdrawal date, I will forfeit the interest
                        accrued on this Goal savings. Additionally, I understand
                        that breaking the Goal before the withdrawal date will
                        result in the loss of all accrued interest and I will be
                        responsible for bearing the 1% payment gateway charge
                        for processing my deposits into this Goal
                      </label>

                      <ErrorMessage
                        name="acceptTerms"
                        component="div"
                        className="absolute -bottom-[10%] left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="pt-4 flex flex-col justify-center items-center space-y-4">
                      <button
                        disabled={!isValid}
                        type="submit"
                        className="btn-1 bg-[--text-brand-2] hover:bg-[--text-brand-2-hover] "
                      >
                        Create Goal
                      </button>
                      <button
                        onClick={goBack}
                        className="btn-2 text-[--text-brand-2] border-[--text-brand-2] hover:bg-[#ff9100]/10"
                      >
                        Back
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </Overlay2>
  );
}

export default GoalCreation2;
