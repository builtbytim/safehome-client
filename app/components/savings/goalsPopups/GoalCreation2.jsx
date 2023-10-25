"use client";

import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import { Form, Formik, Field, ErrorMessage } from "formik";
import SwitchField from "../../forms/branded/SwitchField";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { useRef } from "react";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";
import Spinner from "../../Spinner";
import {
  timeIntervals as intervals,
  timeIntervalsToSeconds,
} from "../../../utils/constants";
import { AmountPerIntervalField } from "../AmountPerIntervalField";

function GoalCreation2({
  show = false,
  toggleShow,
  goBack,
  formData,
  handleSubmit,
  isLoading,
}) {
  const validationSchema = Yup.object().shape({
    preferredInterval: Yup.string()
      .required("Required")
      .oneOf(
        intervals.map((interval) => interval.value),
        "Invalid interval"
      ),

    amountToSaveOnIntervalBasis: Yup.number()
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

    startDate: Yup.date()
      .required("Required")
      .test("is-today-or-later", "Must be today or later", (value) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const startDate = new Date(value);

        return startDate.getTime() >= now.getTime();
      }),

    withdrawalDate: Yup.date()
      .required("Required")
      .test("is-in-future", "Must be in the future", (value) => {
        const now = new Date();

        const withdrawalDate = new Date(value);

        return withdrawalDate.getTime() > now.getTime();
      })
      .test(
        "is-greater-than-start-date-by-at-least-seven-days",
        "Must be later than the start date by at least 7 days",
        (value, context) => {
          const startDate = context.parent.startDate;
          const withdrawalDate = value;

          if (!startDate || !withdrawalDate) return true;

          const startDateObj = new Date(startDate);
          const withdrawalDateObj = new Date(withdrawalDate);

          withdrawalDateObj.setHours(0, 0, 0, 0);
          startDateObj.setHours(0, 0, 0, 0);

          const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

          return (
            withdrawalDateObj.getTime() - startDateObj.getTime() >= SEVEN_DAYS
          );
        }
      )
      .test(
        "time-diff-is-at-least-two-cycles-of-preferred-interval",
        "Duration between start and withdrawal dates be at least 2 cycles of preferred interval ( e.g. 2 weeks for a preferred interval of weekly ) ",
        (value, context) => {
          const startDate = context.parent.startDate;
          const withdrawalDate = value;

          if (
            !startDate ||
            !withdrawalDate ||
            !context.parent.preferredInterval
          )
            return true;

          const startDateObj = new Date(startDate);
          const withdrawalDateObj = new Date(withdrawalDate);

          const timeDiff = withdrawalDateObj.getTime() - startDateObj.getTime();

          const preferredInterval = context.parent.preferredInterval;

          const preferredIntervalInSeconds =
            timeIntervalsToSeconds[preferredInterval];

          return timeDiff >= 2 * preferredIntervalInSeconds * 1000;
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
    handleSubmit(values);
  }

  return (
    <Overlay2 z={3}>
      <section
        ref={ref}
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 px-6 py-6"
        }
      >
        <div className="flex flex-row justify-end items-center">
          <div
            onClick={toggleShow}
            className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
          >
            <BiX className="text-[--primary] text-2xl" />
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

                amountToSaveOnIntervalBasis:
                  formData.amountToSaveOnIntervalBasis || "",

                startDate:
                  formData.startDate || new Date().toISOString().split("T")[0],
                withdrawalDate:
                  formData.withdrawalDate ||
                  new Date().toISOString().split("T")[0],
                acceptTerms: formData.acceptTerms || false,
              }}
              initialTouched={{
                acceptTerms: true,
                preferredInterval: true,
                startDate: true,
                withdrawalDate: true,
              }}
              onSubmit={handleFormSubmit}
            >
              {({ isValid, setFieldValue, values, errors }) => {
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
                        className="  left-0 text-[--text-danger] text-xs text-left "
                      />
                    </div>

                    <AmountPerIntervalField
                      preferredInterval={values.preferredInterval}
                      startDate={values.startDate}
                      withdrawalDate={values.withdrawalDate}
                      errors={errors}
                      goalAmount={formData.goalAmount}
                    />

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
                        accrued on this goal savings. Additionally, I understand
                        that breaking the goal before the withdrawal date will
                        result in the loss of all accrued interest and I will be
                        responsible for bearing the payment gateway charge for
                        processing my deposits into this goal.
                      </label>

                      <ErrorMessage
                        name="acceptTerms"
                        component="div"
                        className=" left-0 text-[--text-danger] text-xs text-left"
                      />
                    </div>

                    <div className="pt-4 flex flex-col justify-center items-center space-y-4">
                      <button
                        disabled={!isValid || isLoading}
                        type="submit"
                        className="btn-1 bg-[--text-brand-2] hover:bg-[--text-brand-2-hover] "
                      >
                        {isLoading ? <Spinner /> : "Create Goal"}
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
