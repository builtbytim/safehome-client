"use client";

import { BsFilterRight } from "react-icons/bs";
import DateFilter from "./TransactionTypeFilter";
import TransactionTypeFilter from "./DateFilter";

function FilterGroup() {
  return (
    <div className="hidden xl:flex justify-center items-center space-x-4 lg:space-x-6 xl:space-x-8  text-[--sorta-dark]  ">
      <DateFilter />

      <TransactionTypeFilter />
    </div>
  );
}

export default FilterGroup;
