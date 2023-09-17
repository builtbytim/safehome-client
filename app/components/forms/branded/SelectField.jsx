"use client";

import { useSelect } from "downshift";

export default function SelectField({
  ToggleElement,
  Itemizer,
  items,
  itemToString,
}) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString,
  });

  return (
    <div className="w-full relative">
      <>
        {/* <label {...getLabelProps()}>Choose your favorite book:</label> */}

        {ToggleElement ? (
          <ToggleElement
            _selectedItem={selectedItem}
            _isOpen={isOpen}
            {...getToggleButtonProps()}
          />
        ) : null}
      </>

      {Itemizer ? (
        <Itemizer
          {...getMenuProps()}
          _isOpen={isOpen}
          _selectedItem={selectedItem}
          _highlightedIndex={highlightedIndex}
          _itemProps={getItemProps}
        />
      ) : null}
    </div>
  );
}
