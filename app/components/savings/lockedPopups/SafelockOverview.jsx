import Overlay2 from "../../Overlay2";
import { NumericFormat } from "react-number-format";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import { useRef } from "react";

function SafelockOverview({ closeSelf, plan, handleAddFund }) {
  const ref = useRef(null);

  useOutsideClickDetector(ref, closeSelf);

  const {
    assetInfo,
    lockName,
    amountSaved,
    lockDurationInMonths,
    paymentMode,
    interval,
    completed,
    createdAt,
  } = plan;

  return (
    <Overlay2 z={3}>
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
          <div className="px-6">
            <h1 className="font-bold capitalize text-[--primary] text-lg md:text-xl">
              {lockName}
            </h1>
          </div>

          <div className="p-6">
            <h2 className="font-bold text-[--color-brand] text-2xl md:text-2xl text-center">
              <NumericFormat
                value={assetInfo.pricePerUnit}
                displayType={"text"}
                thousandSeparator={true}
                prefix="₦ "
              />
            </h2>
          </div>

          <div className="px-6 gap-8 pt-6 grid grid-cols-2">
            <SmallDetailsCard
              title="Amount to Lock"
              value={
                <NumericFormat
                  value={assetInfo.pricePerUnit}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦ "}
                />
              }
            />

            <SmallDetailsCard
              title="Amount Saved"
              value={
                <NumericFormat
                  value={amountSaved}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦ "}
                />
              }
            />
            <SmallDetailsCard
              title="Payment Mode"
              value={<span className="capitalize"> {paymentMode} </span>}
            />
            <SmallDetailsCard
              title="Interval"
              value={<span className="capitalize"> {interval} </span>}
            />

            <SmallDetailsCard
              title="Created"
              value={new Date(createdAt * 1000).toDateString()}
            />
            <SmallDetailsCard
              title="Lock Duration"
              value={`${lockDurationInMonths} ${
                lockDurationInMonths > 1 ? "months" : "month"
              }`}
            />
          </div>

          <div className="pt-10">
            <p className="text-[--color-brand] text-lg md:text-xl font-bold text-center">
              {completed
                ? "Safelock is Completed"
                : "Safelock is Currently Ongoing"}
            </p>
          </div>
        </div>

        <div className=" space-y-4 px-6 pt-4  flex flex-col justify-center items-center  mx-auto">
          <button
            onClick={handleAddFund}
            type="button"
            className="btn-1 w-full  "
          >
            Add Funds
          </button>

          <button type="button" onClick={closeSelf} className="btn-2 w-full  ">
            Close
          </button>
        </div>
      </section>
    </Overlay2>
  );
}

export default SafelockOverview;
