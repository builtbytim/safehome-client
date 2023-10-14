"use client";

import DateFilter from "./DateFilter";
import TransactionTypeFilter from "./TransactionTypeFilter";

function FilterGroup({ setDateFilter, setTxTypeFilter }) {
  return (
    <div className="ml-4 flex flex-row justify-start items-center space-x-4 lg:space-x-6 xl:space-x-8  text-[--sorta-dark] overflow-x-auto overflow-y-hidden max-w-full  ">
      <DateFilter setDateFilter={setDateFilter} />

      <TransactionTypeFilter setTxTypeFilter={setTxTypeFilter} />
    </div>
  );
}

export default FilterGroup;
