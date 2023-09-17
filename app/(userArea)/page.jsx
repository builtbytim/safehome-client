"use client";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Image from "next/image";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import OverviewCard from "../components/home/OverviewCard";
import SelectField from "../components/forms/branded/SelectField";
import { forwardRef } from "react";
import LastNTime from "../components/home/LastNTime";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

export default function Home() {
  return (
    <main className="space-y-10">
      <OverviewCard />

      <section className="bg-white rounded-brand p-4 lg:p-8 space-y-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex justify-start items-center space-x-16">
            <h1 className="text-[--text-secondary] capitalize text-2xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
              Transactions
            </h1>
            <LastNTime />
          </div>

          <div className=" lg:hidden self-center">
            <PiDotsThreeOutlineVertical className="text-xl text-[--placeholder]" />
          </div>

          <div className="hidden lg:flex justify-center items-center space-x-4 text-[--placeholder] font-semibold">
            <button className="px-4 py-1 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center rounded border">
              <span className="self-center"> Transaction Type </span>
              <BsChevronDown className=" self-center" />
            </button>

            <div className="flex px-1 py-1  justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center rounded border">
              <button className="px-4 py-1 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center rounded border">
                <FaRegCalendar className=" self-center" />
                <span className="self-center"> From DD/MM/YYYY </span>
              </button>

              <button className="px-4 py-1 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center rounded border">
                <FaRegCalendar className=" self-center" />
                <span className="self-center"> To DD/MM/YYYY </span>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction history table goes here */}

        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Transaction Date</th>
            </tr>
          </thead>

          <tbody>
            {Array(10)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  <td>1</td>
                  <td>Deposit</td>
                  <td>₦1,000,000</td>
                  <td>12/12/2021</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
