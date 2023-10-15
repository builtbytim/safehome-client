"use client";

import DateFilter from "./DateFilter";
import TransactionTypeFilter from "./TransactionTypeFilter";

function FilterGroup({ setDateFilter, setTxTypeFilter }) {
  return (
    <div className=" flex flex-row justify-start items-center space-x-4 md:space-x-16  text-[--sorta-dark]  no-scrollbar  max-w-full  ">
      <TransactionTypeFilter setTxTypeFilter={setTxTypeFilter} />
      <DateFilter setDateFilter={setDateFilter} />
    </div>
  );
}

export default FilterGroup;
