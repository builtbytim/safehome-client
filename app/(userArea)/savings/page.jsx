"use client";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import LastNTime from "../../components/home/LastNTime";
import SecureRoute from "../../components/SecureRoute";
import HeaderSavings from "../../components/layout/headers/HeaderSavings";
import TransactionHistoryTable from "../../components/home/TransactionHistoryTable";
import OverviewCard from "../../components/savings/OverviewCard";

function Page({ authenticatedUser }) {
  return (
    <div className="space-y-2  lg:space-y-8 w-full min-h-screen pb-16">
      <HeaderSavings user={authenticatedUser} />

      <main className=" space-y-2 lg:space-y-10">
        <OverviewCard />
        <section className="bg-white rounded-brand  py-8 md:p-8 space-y-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex justify-start items-center space-x-16">
              <h1 className="  text-[--placeholder] md:text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
                Transactions
              </h1>
              <LastNTime />
            </div>

            <div className="hidden xl:flex justify-center items-center space-x-4 text-[--placeholder] font-semibold ">
              <button className="px-4 py-1 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center rounded border">
                <span className="self-center"> Transaction Type </span>
                <BsChevronDown className=" self-center" />
              </button>

              <div className="flex px-1 py-1  justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center rounded border">
                <button className="px-4 py-1 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center ">
                  <FaRegCalendar className=" self-center" />
                  <span className="self-center"> From DD/MM/YYYY </span>
                </button>

                <button className="px-4 py-1 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center ">
                  <FaRegCalendar className=" self-center" />
                  <span className="self-center"> To DD/MM/YYYY </span>
                </button>
              </div>
            </div>
          </div>

          <TransactionHistoryTable />
        </section>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
