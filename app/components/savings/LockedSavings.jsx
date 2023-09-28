import React from "react";

function LockedSavings() {
  return (
    <section>
      {/* For large screens  */}

      <div className="hidden md:flex flex-row justify-between py-2 items-center border-b border-[--b1]">
        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-sm capitalize text-[--placeholder]">
            {" "}
            Title{" "}
          </span>

          <span className="text-[--primary] ">Smart Lekki Office</span>
        </div>

        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-sm capitalize text-[--placeholder]">
            {" "}
            Amount
          </span>

          <span className="text-[--color-brand] uppercase">#500,000</span>
        </div>

        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-sm capitalize text-[--placeholder]">
            Lock Duration
          </span>

          <span className="text-[--color-brand] ">365 days</span>
        </div>
      </div>

      {/* For small screens  */}

      <div className="md:hidden flex flex-row justify-between py-2 items-center border-b border-[--b1]">
        <div className="text-left flex flex-col justify-center items-start  font-medium">
          <span className="text-[--primary] uppercase">Smart Lekki Office</span>
        </div>

        <div className="text-left flex flex-col justify-center items-start space-y-1 font-medium">
          <span className="text-base capitalize text-[--color-brand]">
            #500,000
          </span>
          <span className="text-sm font-light capitalize text-[--placeholder]">
            Lock Duration:{" "}
            <span className="text-[--color-brand]"> 365 days </span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default LockedSavings;
