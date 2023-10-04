"use client";

import React from "react";
import Overlay2 from "../../Overlay2";
import { Slide } from "react-reveal";
import { BiX } from "react-icons/bi";
import { Form, Formik, Field, ErrorMessage } from "formik";
import SwitchField from "../../forms/branded/SwitchField";

function GoalCreation2({ show = false, toggleShow }) {
  if (!show) return null;
  return (
    <Overlay2 pos="center">
      <Slide right duration={300} delay={200}>
        <section
          className={
            "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 px-6 py-6"
          }
        >
          <div className="flex flex-row justify-end items-center">
            <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning">
              <BiX onClick={toggleShow} className="text-[--primary] text-xl" />
            </div>
          </div>

          <div className="space-y-4 mt-6 max-h-[90vh] md:max-h-[75vh] overflow-y-auto no-scrollbar pb-8">
            <h1 className="text-[--text-brand-2] text-lg md:text-xl lg:text-2xl font-semibold">
              Final Setup Stage
            </h1>
            <p className="font-medium text-[--primary] text-sm md:text-base">
              Finalize your goal settings
            </p>

            {/* Form now  */}

            <div>
              <Formik initialValues={{}} onSubmit={() => {}}>
                {({ isValid }) => {
                  return (
                    <Form className="space-y-6">
                      <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                        <label
                          htmlFor="amountToSaveOnDailyBasis"
                          className="text-[--text-secondary] font-medium text-sm text-left"
                        >
                          Preferred amount to save on a daily basis
                        </label>

                        <Field
                          name="amountToSaveOnDailyBasis"
                          type="text"
                          className="field-1"
                          placeholder="Amount to save on daily basis"
                        />

                        <ErrorMessage
                          name="amountToSaveOnDailyBasis"
                          component="div"
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                        />
                      </div>

                      <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                        <label
                          htmlFor="preferredTime"
                          className="text-[--text-secondary] font-medium text-sm text-left"
                        >
                          Preferred Time
                        </label>

                        <Field
                          name="preferredTime"
                          type="datetime-local"
                          className="field-1"
                          placeholder=""
                        />

                        <ErrorMessage
                          name="preferredTime"
                          component="div"
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
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
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
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
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                        />
                      </div>

                      <div className="w-full relative flex flex-col justify-center items-start space-y-2">
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
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                        />
                      </div>

                      <div className="w-full relative flex flex-col justify-center items-start space-y-2 ">
                        <SwitchField />
                        <label
                          htmlFor="acknowledgement"
                          className="text-[--text-secondary] font-medium text-sm text-left"
                        >
                          I acknowledge and agree that in the event I do not
                          achieve the Goal amount of (₦340,000.00) by the set
                          withdrawal date, I will forfeit the interest accrued
                          on this Goal savings. Additionally, I understand that
                          breaking the Goal before the withdrawal date will
                          result in the loss of all accrued interest and I will
                          be responsible for bearing the 1% payment gateway
                          charge for processing my deposits into this Goal
                        </label>

                        <ErrorMessage
                          name="acknowledgement"
                          component="div"
                          className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                        />
                      </div>

                      <div className="pt-4 flex flex-col justify-center items-center space-y-4">
                        <button className="btn-1 bg-[--text-brand-2] hover:bg-[--text-brand-2-hover] ">
                          Create Goal
                        </button>
                        <button
                          onClick={toggleShow}
                          className="btn-2 text-[--text-brand-2] border-[--text-brand-2] hover:bg-[#ff9100]/10"
                        >
                          {" "}
                          Cancel{" "}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </section>
      </Slide>
    </Overlay2>
  );
}

export default GoalCreation2;
