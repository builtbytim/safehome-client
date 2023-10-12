import React from "react";
import { PiQuestionFill } from "react-icons/pi";
import cn from "classnames";
import Spinner from "../Spinner";

const ToggleCard = ({
  heading,
  text,
  recommended,
  active,
  toggleFunc,
  handleClick = null,
  readOnly = false,
  isLoading = false,
}) => {
  return (
    <div
      onClick={handleClick}
      className="flex w-full pb-4 border-b border-[--lines] [--text-secondary] items-center hover:bg-[--b1] hover:cursor-pointer transitioning px-6 py-4  space-x-8"
    >
      <div className="space-y-2 w-full">
        <h3 className="tems-center text-base md:text-xl font-medium w-full">
          {heading} <PiQuestionFill className="text-[--green] inline mb-1" />{" "}
          {recommended === "yes" && (
            <span className="text-[--placeholder] text-sm md:text-lg ">
              (Recommended)
            </span>
          )}
        </h3>
        <p className="text-sm md:text-lg">{text}</p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner size="mini" />
        </div>
      )}

      {toggleFunc && !isLoading && (
        <div className="">
          <button
            title={
              readOnly
                ? "You can't change this setting because it is required for your account."
                : ""
            }
            disabled={readOnly}
            className={
              `h-[31px] w-[53px] rounded-3xl block p-[3px] ${
                active ? "bg-[--green] text-right" : "bg-[--lines] text-left"
              }` +
              cn({
                " cursor-pointer": !readOnly,
                " cursor-not-allowed opacity-40": readOnly,
              })
            }
            onClick={() => toggleFunc()}
          >
            <span className="bg-white rounded-full h-[25px] w-[25px] inline-block shadow"></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ToggleCard;
