"use client";

import { useCombobox } from "downshift";
import { forwardRef } from "react";
import cn from "classnames";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function GenericComboField({
	items: itemsProp,
	handleChange,
	defaultSelectedItem = null,
	disabled = false,
	placeholder = "Search",
}) {
	const [items, setItems] = useState(itemsProp);
	const {
		isOpen,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
	} = useCombobox({
		onInputValueChange({ inputValue }) {
			setItems(
				itemsProp.filter((item) =>
					item.name.toLowerCase().startsWith(inputValue.toLowerCase())
				)
			);
		},
		items,
		itemToString(item) {
			return item ? item.name : "";
		},
		onSelectedItemChange: handleChange,
		defaultSelectedItem: defaultSelectedItem || itemsProp[0],
		itemToString(item) {
			return item ? item.name : "";
		},
	});

	return (
		<div>
			<div className="w-full">
				<div className="relative ">
					<input
						placeholder={placeholder}
						className="field-1"
						{...getInputProps()}
					/>
					<div className="self-center absolute right-4 top-[50%] translate-y-[-50%] ">
						{isOpen ? (
							<BsChevronUp className=" " />
						) : (
							<BsChevronDown className=" " />
						)}
					</div>{" "}
				</div>
			</div>

			<div {...getMenuProps()} className={` ${!isOpen && "hidden"}`}>
				<div className="absolute bg-white z-20 left-0 top-[100%] w-full pt-3 pb-8 h-auto">
					<div className="bg-white w-full border border-[--lines] max-h-[300px] overflow-y-auto scrollbar-fix rounded">
						{items.map((item, index) => {
							return (
								<div
									key={`${item.value}${index}`}
									className={`px-4 py-2 whitespace-nowrap text-[--text] hover:bg-gray-50 cursor-pointer ${
										highlightedIndex === index && "bg-gray-50"
									}`}
									{...getItemProps({ item, index })}
								>
									{item.name}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
