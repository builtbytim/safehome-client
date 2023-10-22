import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";
import SwitchField from "../../forms/branded/SwitchField";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import Spinner from "../../Spinner";

function CreateSafelockPreview({
  toggleShow,
  handleSubmit,
  formData,
  isLoading,
}) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showErorMsg, setShowErorMsg] = useState(false);

  function onCreateLockClick() {
    if (!acceptTerms) {
      setShowErorMsg(true);
      return;
    }

    if (isLoading) return;

    handleSubmit();
  }

  return (
    <Overlay2 pos="center">
      <section
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40  "
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
              Safelock Preview
            </h1>
            <p className="text-[--primary] font-medium text-sm pt-2">
              Preview details of safelock
            </p>
          </div>

          <div className="px-6 gap-8 pt-6 grid grid-cols-2">
            <SmallDetailsCard title="Title" value={formData.lockTitle} />
            <SmallDetailsCard
              title="Amount to Lock"
              value={
                <NumericFormat
                  value={formData.investibleAsset.pricePerUnit}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦ "}
                />
              }
            />
            <SmallDetailsCard
              title="Payment Mode"
              value={
                <span className="capitalize"> {formData.paymentMode} </span>
              }
            />
            <SmallDetailsCard
              title="Interval"
              value={
                <span className="capitalize">
                  {" "}
                  {formData.preferredInterval}{" "}
                </span>
              }
            />
            <SmallDetailsCard
              title="Lock Duration"
              value={`${formData.lockDurationInMonths} ${
                formData.lockDurationInMonths > 1 ? "months" : "month"
              }`}
            />
            <SmallDetailsCard
              title="Mature into "
              value={formData.investibleAsset.assetName}
            />
          </div>

          <div className="w-full relative flex flex-col justify-center items-start space-y-2 p-6">
            <SwitchField
              handleChange={(v) => {
                setAcceptTerms(v);
              }}
              color="#8d4000"
            />
            <p className="text-[--text-secondary] font-medium text-sm text-left">
              I authorize safeHome to I dont know what the fuck should be here!
            </p>

            {showErorMsg && (
              <p className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left">
                You must accept the terms and conditions to continue
              </p>
            )}
          </div>
        </div>

        <div className="absolute w-[90%]  inset-x-0 bottom-4  flex flex-col justify-center items-center  mx-auto">
          <button
            disabled={!acceptTerms || isLoading}
            onClick={onCreateLockClick}
            type="submit"
            className="btn-1 w-full  "
          >
            {isLoading ? <Spinner /> : "Create Safelock"}
          </button>
        </div>
      </section>
    </Overlay2>
  );
}

export default CreateSafelockPreview;
