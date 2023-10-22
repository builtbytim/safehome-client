import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { FaNairaSign } from "react-icons/fa6";
import FormattingField from "../../forms/branded/FormattingField";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import {
  savingsPrefs,
  timeIntervals as intervals,
} from "../../../utils/constants";

function CreateSafelock2({
  toggleShow,
  handleSubmit,
  goBack,
  formData,
  show,
  openAssetsOverview,
}) {
  const ref = useRef(null);

  useOutsideClickDetector(ref, () => {
    if (show) {
      toggleShow();
    }
  });

  return (
    <Overlay2 z={3}>
      <section
        ref={ref}
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40 "
        }
      >
        <div className="flex p-6 flex-row justify-end items-center">
          <div
            onClick={toggleShow}
            className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
          >
            <BiX className="text-[--primary] text-2xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8">
          <div className="px-6">
            <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
              Lock for {formData.lockDurationInMonths}{" "}
              {formData.lockDurationInMonths > 1 ? "months" : "month"}
            </h1>
            <p className="text-[--primary] font-medium text-sm pt-2">
              Create a Locked Savings for {formData.lockDurationInMonths}{" "}
              {formData.lockDurationInMonths > 1 ? "months" : "month"}
            </p>
          </div>

          <Formik
            initialValues={{
              lockTitle: formData.lockTitle || "",
              investibleAsset: formData.investibleAsset
                ? formData.investibleAsset.assetName
                : "",
              amountToLock: formData.investibleAsset
                ? formData.investibleAsset.pricePerUnit
                : "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isValid, values, setFieldValue }) => {
              return (
                <Form className="space-y-6 px-6 pt-6  ">
                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="lockTitle"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Title of Lock
                    </label>

                    <Field
                      name="lockTitle"
                      type="text"
                      className="field-1"
                      placeholder="Title of lock"
                    />

                    <ErrorMessage
                      name="lockTitle"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="investibleAsset"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Choose the property you want to lock for
                    </label>

                    <input
                      onClick={openAssetsOverview}
                      name="investibleAsset"
                      value={values.investibleAsset}
                      className="field-1 cursor-pointer capitalize"
                      type="text"
                      placeholder="Choose property"
                      readOnly
                    />

                    <ErrorMessage
                      name="investibleAsset"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="amountToLock"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Amount to Lock (Price of 1 unit of chosen property)
                    </label>

                    <FormattingField
                      icon={FaNairaSign}
                      name="amountToLock"
                      type="text"
                      inputMode="numeric"
                      className="field-1"
                      placeholder="Amount to lock"
                      extraClasses="field-1"
                      readOnly
                    />

                    <ErrorMessage
                      name="amountToLock"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="paymentMode"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Payment Mode
                    </label>

                    <GenericSelectFieldVariant1
                      defaultSelectedItem="manual"
                      handleChange={({ selectedItem }) => {
                        setFieldValue("paymentMode", selectedItem.value, true);
                      }}
                      items={[
                        {
                          name: "Manual",
                          value: "manual",
                        },
                        {
                          name: "Auto",
                          value: "auto",
                        },
                      ]}
                    />

                    <ErrorMessage
                      name="savingPreference"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="savingPreference"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      How would you prefer to save?
                    </label>

                    <GenericSelectFieldVariant1
                      defaultSelectedItem={savingsPrefs[0]}
                      handleChange={({ selectedItem }) => {
                        setFieldValue(
                          "savingsPreference",
                          selectedItem.value,
                          true
                        );
                      }}
                      items={savingsPrefs}
                    />

                    <ErrorMessage
                      name="savingPreference"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

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
                      name="amountToSaveOnIntervalBasis"
                      placeholder="Amount to save on interval basis"
                      extraClasses="field-1"
                    />

                    <ErrorMessage
                      name="amountToSaveOnIntervalBasis"
                      component="div"
                      className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="pt-4  space-y-4   flex flex-col justify-center items-center  mx-auto">
                    <button type="submit" className="btn-1 w-full  ">
                      Continue
                    </button>

                    <button
                      onClick={goBack}
                      type="button"
                      className="btn-2 w-full  "
                    >
                      Go Back
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </Overlay2>
  );
}

export default CreateSafelock2;
