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
			name: "All",
			value: "all",
		},
		{
			name: "Withdrawal",
			value: "withdrawal",
		},

		{
			name: "Investment",
			value: "investment",
		},

		{
			name: "Funding",
			value: "topup",
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
		<div className="relative self-stretch">
			<span className="hidden rounded-[8px]  px-2  mb-2 text-xs py-1 bg-[--lines]">
				{" "}
				Transaction Type{" "}
			</span>
			<div
				ref={ref2}
				onClick={toggleShow}
				className="flex cursor-pointer justify-start text-[--text-secondary] items-center gap-2 text-sm md:text-base text-center"
			>
				<span className="self-center ">
					{" "}
					{selected ? selected.name : "Type"}{" "}
				</span>

				{/* <FiType className="self-center lg:hidden" /> */}

				{show ? (
					<BsChevronUp className=" self-center" />
				) : (
					<BsChevronDown className=" self-center" />
				)}
			</div>

			<div
				ref={ref}
				className={
					"absolute rounded-brand min-w-max bg-white mt-1 shadow-md max-h-80 overflow-y-auto p-0 z-10 text-sm md:text-base " +
					(show ? "" : " hidden")
				}
			>
				<div
					ref={ref3}
					className="flex flex-col w-full justify-center items-start"
				>
					{items.map((v, i) => {
						return (
							<div
								key={i}
								onClick={handleSelectItem(v)}
								className="px-4 py-2 whitespace-nowrap text-[--text-secondary] hover:bg-gray-50 cursor-pointer text-sm md:text-base"
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
