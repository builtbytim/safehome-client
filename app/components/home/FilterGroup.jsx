"use client";

import DateFilter from "./DateFilter";
import TransactionTypeFilter from "./TransactionTypeFilter";

function FilterGroup({ setDateFilter, setTxTypeFilter }) {
  return (
    <div className="hidden xl:flex justify-center items-center space-x-4 lg:space-x-6 xl:space-x-8  text-[--sorta-dark]  ">
      <DateFilter setDateFilter={setDateFilter} />

      <TransactionTypeFilter setTxTypeFilter={setTxTypeFilter} />
    </div>
  );
}

export default FilterGroup;
