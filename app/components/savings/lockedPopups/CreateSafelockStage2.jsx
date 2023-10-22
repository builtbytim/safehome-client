import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useRef } from "react";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { FaNairaSign } from "react-icons/fa6";
import FormattingField from "../../forms/branded/FormattingField";

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
          <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning">
            <BiX onClick={toggleShow} className="text-[--primary] text-2xl" />
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
            {({ isValid, values }) => {
              return (
                <Form className="space-y-6 p-6  ">
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
                      Amount to Lock
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
                      htmlFor="paybackDate"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Payback Date
                    </label>

                    <Field
                      name="paybackDate"
                      type="date"
                      className="field-1"
                      placeholder="Payback date"
                    />

                    <ErrorMessage
                      name="paybackDate"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="w-full relative flex flex-col justify-center items-start space-y-2">
                    <label
                      htmlFor="primarySource"
                      className="text-[--text-secondary] font-medium text-sm text-left"
                    >
                      Select a Primary Source
                    </label>

                    <Field
                      as="select"
                      name="primarySource"
                      type="text"
                      className="field-1"
                      placeholder=""
                    >
                      <option value=""> Bank </option>
                      <option value=""> Card </option>
                    </Field>

                    <ErrorMessage
                      name="primarySource"
                      component="div"
                      className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                    />
                  </div>

                  <div className="absolute w-[90%] space-y-2 inset-x-0 bottom-4  flex flex-col justify-center items-center  mx-auto">
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
