"use client";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useRef, useState } from "react";
import useOutsideClickDetector from "../../utils/hooks/useOutsideClickDetector";

function TransactionTypeFilter({ setTxTypeFilter }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const items = [
    {
      name: "Withdrawal",
      value: "withdrawal",
    },

    {
      name: "Top-Up",
      value: "topup",
    },

    {
      name: "All",
      value: "all",
    },
  ];

  const [selected, setSelected] = useState(null);

  function handleSelectItem(item) {
    return () => {
      setSelected(item);
      setTxTypeFilter(item.value);
      setShow(false);
    };
  }

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
    <div className="relative">
      <span className="rounded-[8px]  px-2 inline-block mb-2 text-xs py-1 bg-[--lines]">
        {" "}
        Transaction Type{" "}
      </span>
      <div
        ref={ref2}
        onClick={toggleShow}
        className=" hover:cursor-pointer min-w-[150px] px-4 py-1 flex justify-between whitespace-nowrap self-stretch text-sm  space-x-2 items-center rounded border border-[#1E1E1E]/50 transtioning hover:border-[#1E1E1E]"
      >
        <span className="self-center">
          {" "}
          {selected ? selected.name : "Type"}{" "}
        </span>

        {show ? (
          <BsChevronUp className=" self-center" />
        ) : (
          <BsChevronDown className=" self-center" />
        )}
      </div>

      <div
        ref={ref}
        className={
          "bg-white absolute top-[125%]   py-2 rounded -left-[5%] min-w-full  shadow z-20 " +
          (show ? "" : " hidden")
        }
      >
        <div
          ref={ref3}
          className="flex   flex-col w-full justify-center items-center"
        >
          {items.map((v, i) => {
            return (
              <div
                key={i}
                onClick={handleSelectItem(v)}
                className=" w-full px-2 py-2 hover:cursor-pointer text-sm text-[--sorta-dark]  hover:bg-[--surface-bg] border-b border-b-[--surface-bg] transitioning  flex flex-row justify-between items-center"
              >
                {v.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TransactionTypeFilter;
