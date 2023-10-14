"use client";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import SelectField from "../../components/forms/branded/SelectField";
import { forwardRef } from "react";

const timeMarks = [
  { value: "12_hours", name: "Last 12 hours" },
  { value: "1_day", name: "Last 1 day" },
  { value: "7_days", name: "Last 7 days" },
  { value: "14_days", name: "Last 14 days" },
];

export default function LastNTime({ setFromLastFilter }) {
  return (
    <SelectField
      items={timeMarks}
      onSelectedItemChange={({ selectedItem }) => {
        setFromLastFilter(selectedItem.value);
      }}
      itemToString={(item) => (item ? item.name : "")}
      ToggleElement={forwardRef(function A(
        { _isOpen, _selectedItem, ...props },
        ref
      ) {
        return (
          <div
            ref={ref}
            {...props}
            className="lg:flex hidden  cursor-pointer justify-start text-[--text-secondary] items-center space-x-4 text-sm"
          >
            <span className="font-medium self-center">
              {_selectedItem?.name ?? timeMarks[0].name}
            </span>
            {_isOpen ? (
              <BsChevronUp className=" self-center" />
            ) : (
              <BsChevronDown className=" self-center" />
            )}
          </div>
        );
      })}
      Itemizer={forwardRef(function A(
        { _itemProps, _isOpen, _selectedItem, _highlightedIndex, ...props },
        ref
      ) {
        return (
          <div
            ref={ref}
            {...props}
            className={`absolute rounded-[8px] min-w-full bg-white mt-2 shadow-md max-h-80 overflow-y-auto p-0 z-10 ${
              !_isOpen && "hidden"
            }`}
          >
            {timeMarks.map((item, index) => {
              return (
                <div
                  key={`${item.value}${index}`}
                  className={`px-4 text-sm py-2 whitespace-nowrap text-[--text-secondary] hover:bg-gray-50 cursor-pointer ${
                    _highlightedIndex === index && "bg-gray-50"
                  }`}
                  {..._itemProps({ item, index })}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        );
      })}
    />
  );
}
