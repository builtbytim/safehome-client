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
import GoalImage from "../../../../assets/images/investment/inv1.png";

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
            <BiX className="text-[--primary] text-3xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8">
          <div className="px-6 space-y-2">
            <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
              Savings Investment Preview
            </h1>
            <p className="text-[--primary] font-medium text-sm ">
              Preview details of investment
            </p>

            {/* image area --------------------- */}
            <div className="">
              <div className={"relative h-[210px] truncate  w-full "}>
                <Image
                  src={formData.investibleAsset.coverImageUrl || GoalImage}
                  alt="goal image"
                  fill
                  className="object-cover  h-[210px] w-full"
                />
                <div className="absolute bg-black/60  inset-0  flex flex-col justify-center items-center truncate">
                  <h1 className="text-white capitalize  font-bold truncate text-xl md:text-2xl xl:text-3xl text-center">
                    {formData.investibleAsset.assetName}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 gap-8 pt-6 grid grid-cols-2">
            <SmallDetailsCard
              title="Amount to Invest"
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
              title="Saving Preference"
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
              title="Investment Duration"
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
              {isLoading ? <Spinner /> : "Invest funds"}
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
