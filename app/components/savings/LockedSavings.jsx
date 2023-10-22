import { NumericFormat } from "react-number-format";

function LockedSavings({ lockName, lockDurationInMonths, amountSaved }) {
  return (
    <section>
      {/* For large screens  */}

      <div className="hidden md:flex flex-row justify-between py-2 items-center border-b border-[--b1]">
        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-sm capitalize text-[--placeholder]">
            {" "}
            Title{" "}
          </span>

          <span className="text-[--primary] ">{lockName}</span>
        </div>

        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-sm capitalize text-[--placeholder]">
            {" "}
            Amount
          </span>

          <span className="text-[--color-brand] uppercase">
            <NumericFormat
              value={amountSaved}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦ "}
            />
          </span>
        </div>

        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-sm capitalize text-[--placeholder]">
            Lock Duration
          </span>

          <span className="text-[--color-brand] ">
            {lockDurationInMonths}

            {lockDurationInMonths > 1 ? " months" : " month"}
          </span>
        </div>
      </div>

      {/* For small screens  */}

      <div className="md:hidden flex flex-row justify-between py-2 items-center border-b border-[--b1]">
        <div className="text-left flex flex-col justify-center items-start  font-medium">
          <span className="text-[--primary] uppercase">{lockName}</span>
        </div>

        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-base capitalize text-[--color-brand]">
            <NumericFormat
              value={amountSaved}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦ "}
            />
          </span>
          <span className="text-sm font-light capitalize text-[--placeholder]">
            Lock Duration:{" "}
            <span className="text-[--color-brand]">
              {lockDurationInMonths}

              {lockDurationInMonths > 1 ? " months" : " month"}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default LockedSavings;
