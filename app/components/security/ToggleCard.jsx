import React from "react";
import { PiQuestionFill } from "react-icons/pi";
import SwitchField from "../forms/branded/SwitchField";

const ToggleCard = ({
  heading,
  text,
  recommended,
  active,
  toggleFunc,
  handleClick = null,
  readOnly = false,
}) => {
  return (
    <div
      onClick={handleClick}
      className="flex w-full pb-5 border-b border-[--lines] tex-[--text-secondary] items-center hover:bg-[--b1] hover:cursor-pointer transitioning px-2 py-4 rounded-[8px]"
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

      {toggleFunc && (
        <div className="">
          <SwitchField disabled defaultChecked color="#34C759" />
          {/* <button
            disabled={readOnly}
            className={`h-[31px] w-[53px] rounded-3xl block p-[3px] ${
              active ? "bg-[--green] text-right" : "bg-[--lines] text-left"
            }`}
            onClick={() => toggleFunc()}
          >
            <span className="bg-white rounded-full h-[25px] w-[25px] inline-block shadow"></span>
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ToggleCard;
