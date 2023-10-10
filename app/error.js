"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";
import cn from "classnames";

export default function Error({ error, reset }) {
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" min-h-screen p-3  xl:p-6">
      <div className="flex flex-col space-y-12 justify-center items-center">
        <div className="flex flex-col justify-center items-center  space-y-2 lg:space-y-8 border w-[90%] max-w-2xl   border-[#8d4000]/30  rounded-brand px-6 py-6 ">
          <div className="w-full">
            <p className=" text-sm lg:text-xl  font-normal text-center  py-2  text-[--text-secondary]">
              Something went wrong, click to see more info.
            </p>

            <p
              className={
                "  text-[--text-danger] text-center text-xs font-medium" +
                cn({
                  " visible ": showErr,
                  " invisible ": !showErr,
                })
              }
            >
              {error.message}
            </p>
          </div>
          <button
            onClick={() => setShowErr(!showErr)}
            className="btn-1 text-sm lg:text-base  "
          >
            {showErr ? "See less" : "See more"}
          </button>

          <div
            className={"flex flex-row justify-center pt-3 items-center w-full "}
          >
            <p
              onClick={reset}
              className=" cursor-pointer hover:underline text-[--text-secondary]  text-sm lg:text-base"
            >
              Reset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
