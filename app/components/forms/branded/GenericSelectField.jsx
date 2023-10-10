"use client";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import SelectField from "./SelectField";
import { forwardRef } from "react";

export default function GenericSelectField({
  items,
  itemToString = null,
  handleChange,
}) {
  return (
    <SelectField
      items={items}
      onSelectedItemChange={handleChange}
      itemToString={itemToString || ((item) => (item ? item.name : "No name"))}
      ToggleElement={forwardRef(function A(
        { _isOpen, _selectedItem, ...props },
        ref
      ) {
        return (
          <div ref={ref} {...props} className="account-form-icon-container">
            <div className="account-form-field">
              <span className="font-medium self-center">
                {_selectedItem?.name ?? items[0].name}
              </span>
            </div>
            <div className="self-center">
              {_isOpen ? (
                <BsChevronUp className=" " />
              ) : (
                <BsChevronDown className=" " />
              )}
            </div>
          </div>
        );
      })}
      Itemizer={forwardRef(function A(
        { _itemProps, _isOpen, _selectedItem, _highlightedIndex, ...props },
        ref
      ) {
        return (
          <div ref={ref} {...props} className={` ${!_isOpen && "hidden"}`}>
            <div className="absolute bg-white z-20 left-0 top-[100%] w-full pt-3 pb-8 h-auto">
              <div className="bg-white w-full border border-[--lines] max-h-[400px] overflow-y-auto scrollbar-fix rounded">
                {items.map((item, index) => {
                  return (
                    <div
                      key={`${item.value}${index}`}
                      className={`px-4 py-2 whitespace-nowrap text-[--text-secondary] hover:bg-gray-50 cursor-pointer ${
                        _highlightedIndex === index && "bg-gray-50"
                      }`}
                      {..._itemProps({ item, index })}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    />
  );
}
