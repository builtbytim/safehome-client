"use client";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import SelectField from "../../components/forms/branded/SelectField";
import { forwardRef } from "react";

const timeMarks = [
	// { value: "all_time", name: "All" },
	// { value: "15_minutes", name: "Last 15 minutes" },
	// { value: "1_hour", name: "Last 1 hour" },
	// { value: "12_hours", name: "Last 12 hours" },
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
						className="flex cursor-pointer justify-start text-[--text-secondary] items-center gap-2 text-sm md:text-base text-center"
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
						className={`absolute rounded-brand min-w-max bg-white mt-1 shadow-md max-h-80 overflow-y-auto p-0 z-10 text-sm md:text-base ${
							!_isOpen && "hidden"
						}`}
					>
						{timeMarks.map((item, index) => {
							return (
								<div
									key={`${item.value}${index}`}
									className={`px-4 py-2 whitespace-nowrap text-[--text-secondary] hover:bg-gray-50 cursor-pointer text-sm md:text-base ${
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
