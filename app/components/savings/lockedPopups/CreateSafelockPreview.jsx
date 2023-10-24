import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";
import SwitchField from "../../forms/branded/SwitchField";
import { NumericFormat } from "react-number-format";
import { useRef, useState } from "react";
import Spinner from "../../Spinner";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import Image from "next/image";
import dummyImage from "../../../../assets/images/investment/inv2.png";
import ProgressBar from "../ProgressBar";

function CreateSafelockPreview({
  closeSelf,
  show,
  handleSubmit,
  formData,
  isLoading,
}) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showErorMsg, setShowErorMsg] = useState(false);
  const ref = useRef(null);

  useOutsideClickDetector(ref, () => {
    if (show) {
      closeSelf();
    }
  });

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
        ref={ref}
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40  "
        }
      >
        <div className="flex p-6 flex-row justify-end items-center">
          <div
            onClick={closeSelf}
            className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
          >
            <BiX className="text-[--primary] text-2xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8">
          <div className="px-6 space-y-2">
            <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
              Safelock Preview
            </h1>
            <p className="text-[--primary] font-medium text-sm ">
              Preview details of safelock
            </p>

            {/* image area --------------------- */}

            <div className="px-6 rounded-[8px]  pt-6 w-full relative min-h-[200px] overflow-hidden">
              <Image
                fill
                className="absolute object-cover rounded-[8px] "
                src={formData.investibleAsset.coverImageUrl || dummyImage}
                alt={formData.investibleAsset.assetName}
              />

              {/* card on top  */}

              <div className="bg-white w-[90%] h-[90%] absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]  z-10  flex flex-col justify-between items-start  p-4">
                <div className="flex flex-row justify-start space-x-8 items-center w-full">
                  <div className="space-y-2">
                    <p className="text-[--text-secondary] font-light text-sm text-left">
                      Group Balance
                    </p>
                    <p className="font-bold text-[--color-brand]">
                      <NumericFormat
                        value={formData.investibleAsset.pricePerUnit * 4}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦ "}
                      />
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[--text-secondary] font-light text-sm text-left">
                      Target
                    </p>
                    <p className="font-bold text-[--color-brand]">
                      <NumericFormat
                        value={formData.investibleAsset.pricePerUnit * 10}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦ "}
                      />
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[--text-secondary] font-light text-sm text-left">
                      Members
                    </p>
                    <p className="font-bold text-[--color-brand]">
                      <NumericFormat
                        value={10}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      /
                      <NumericFormat
                        value={24}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </p>
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <p className="text-[--text-secondary] font-light text-sm text-left">
                    Group Balance
                  </p>
                  <ProgressBar variant={1} percentage={67} />
                </div>

                <div className="space-y-2">
                  <p className="text-[--text-secondary] font-light text-sm text-left">
                    Available Units:{" "}
                    <NumericFormat
                      value={formData.investibleAsset.availableUnits}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 gap-8 pt-6 grid grid-cols-2">
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
          </div>

          <div className="w-full relative flex flex-col justify-center items-start space-y-2 p-6">
            <SwitchField
              handleChange={(v) => {
                setAcceptTerms(v);
              }}
              color="#8d4000"
            />
            <p className="text-[--text-secondary] font-medium text-sm text-left">
              I authorize SafeHome to Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Consectetur neque officiis numquam quis nobis
              corporis, impedit minima voluptatibus, illum aperiam magni odit
              placeat, qui dicta. Porro temporibus optio minima hic.
            </p>

            {showErorMsg && (
              <p className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left">
                You must accept the terms and conditions to continue
              </p>
            )}
          </div>

          <div className="pt-4  px-6  flex flex-col justify-center items-center space-y-4  mx-auto">
            <button
              disabled={!acceptTerms || isLoading}
              onClick={onCreateLockClick}
              type="submit"
              className="btn-1 w-full  "
            >
              {isLoading ? <Spinner /> : "Lock funds"}
            </button>

            <button
              onClick={closeSelf}
              type="button"
              className="btn-2 w-full  "
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </Overlay2>
  );
}

export default CreateSafelockPreview;
