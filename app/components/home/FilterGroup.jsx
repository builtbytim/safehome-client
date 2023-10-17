"use client";

import DateFilter from "./DateFilter";
import TransactionTypeFilter from "./TransactionTypeFilter";

function FilterGroup({ setDateFilter, setTxTypeFilter }) {
	return (
		<div className=" flex flex-wrap lg:justify-end items-center gap-3 lg:gap-5 w-full max-w-full text-sm lg:text-base">
			<div>
				<TransactionTypeFilter setTxTypeFilter={setTxTypeFilter} />
			</div>
			<div>
				<DateFilter setDateFilter={setDateFilter} />
			</div>
		</div>
	);
}

export default FilterGroup;
