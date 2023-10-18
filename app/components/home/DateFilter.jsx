import { BsFilterRight, BsFilterLeft } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useRef, useState } from "react";
import cn from "classnames";
import useOutsideClickDetector from "../../utils/hooks/useOutsideClickDetector";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Overlay from "../Overlay3";

function DateFilter({ setDateFilter }) {
  const [show, setShow] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
    setShowCalender(false);
    if (isStartDate) {
      setStartDate(nextValue);
    } else {
      setEndDate(nextValue);
    }
  }

  function handleApply() {
    if (!startDate || !endDate) return;
    setDateFilter(
      new Date(startDate).getTime() / 1000,
      new Date(endDate).getTime() / 1000
    );
    setShowCalender(false);
    setShow(false);
  }

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  function toggleShow() {
    setShow((show) => !show);
  }

  useOutsideClickDetector(
    ref,
    () => {
      setShow(false);
    },
    [ref2, ref3]
  );

  return (
    <div className="relative self-stretch">
      <span className="hidden  rounded-brand px-2  mb-2 text-xs py-1 bg-[--lines]">
        Date Range
      </span>
      <div ref={ref} className="">
        <button
          onClick={toggleShow}
          className="lg:hidden bg-[--b1] border border-[--lines] rounded-lg flex gap-1 px-2 items-center py-2"
        >
          <MdOutlineCalendarMonth className=" text-xl self-center" />
        </button>

        <button
          onClick={toggleShow}
          className="hidden lg:flex bg-[--b1] rounded-brand gap-3 px-4 items-center py-2 text-sm"
        >
          {show ? (
            <BsFilterLeft className=" text-xl self-center" />
          ) : (
            <BsFilterRight className=" text-xl self-center" />
          )}

          <span className="self-center"> Date Filter </span>
        </button>
      </div>

      <Overlay z={3} active={show}>
        <div
          ref={ref2}
          className={
            "bg-white w-[80%] max-w-xs  px-4 py-4 rounded   shadow z-20 " +
            cn({ " hidden": !show })
          }
        >
          {showCalender ? (
            <Calendar value={value} onChange={onChange} />
          ) : (
            <>
              <div className="w-full flex flex-row justify-between items-center ">
                <h2 className="text-sm"> Filter by date </h2>

                <span
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                    setDateFilter(null);
                  }}
                  className="text-[--text-secondary] self-center text-xs  py-1 px-2 transitioning border border-[--lines] rounded-brand hover:cursor-pointer hover:bg-[--lines] flex flex-row justify-center items-center"
                >
                  Clear
                </span>
              </div>

              <div className="flex space-y-4 pt-4 flex-col w-full justify-center items-center">
                <div
                  onClick={() => {
                    setIsStartDate(true);
                    setShowCalender(true);
                  }}
                  className="rounded-[8px] w-full px-2 py-2 hover:cursor-pointer text-sm text-[--sorta-dark] bg-[--surface-bg] border transitioning hover:border-[#1e1e1e]/40 flex flex-row justify-between items-center"
                >
                  <span>
                    {startDate
                      ? new Date(startDate).toISOString().split("T")[0]
                      : "From"}
                  </span>

                  <MdOutlineCalendarMonth className="text-xl text-[--primary]" />
                </div>

                <div
                  onClick={() => {
                    setIsStartDate(false);
                    setShowCalender(true);
                  }}
                  className="rounded-[8px] hover:cursor-pointer w-full px-2 py-2 text-sm text-[--sorta-dark] border transitioning  hover:border-[#1e1e1e]/40 bg-[--surface-bg] flex flex-row justify-between items-center"
                >
                  <span>
                    {" "}
                    {endDate
                      ? new Date(endDate).toISOString().split("T")[0]
                      : "To"}{" "}
                  </span>

                  <MdOutlineCalendarMonth className="text-xl text-[--primary]" />
                </div>
              </div>
              <div className="pt-2">
                <button
                  disabled={!startDate || !endDate}
                  onClick={handleApply}
                  className="btn-1 py-2 text-sm"
                >
                  {" "}
                  Apply{" "}
                </button>
              </div>
            </>
          )}
        </div>
      </Overlay>
    </div>
  );
}

export default DateFilter;
