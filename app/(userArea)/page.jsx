"use client";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import OverviewCard from "../components/home/OverviewCard";
import LastNTime from "../components/home/LastNTime";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import SecureRoute from "../components/SecureRoute";
import Header from "../components/layout/headers/Header";

function Page({ authenticatedUser }) {
  return (
    <div className="space-y-6  lg:space-y-8 w-full min-h-screen">
      <Header user={authenticatedUser} />

      <main className=" space-y-8 lg:space-y-10">
        <OverviewCard />

        <section className="bg-white rounded-brand p-8 lg:p-8 space-y-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex justify-start items-center space-x-16">
              <h1 className="text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
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

          {/* Transaction history table goes here */}

          <div className="overflow-auto max-h-[482px]">
            <table className="w-full table text-[--text-secondary] font-normal ">
              <thead className="w-full">
                <tr className="table-row w-full ">
                  <th className=" text-left  whitespace-nowrap">
                    {" "}
                    Date & Time{" "}
                  </th>
                  <th className=" text-left  px-6 whitespace-nowrap">
                    Transaction Type
                  </th>
                  <th className=" text-left  px-6 whitespace-nowrap">Amount</th>
                  <th className=" text-left  px-6 whitespace-nowrap">
                    Reference{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array(10)
                  .fill()
                  .map((_, i) => (
                    <tr key={i} className="table-row text-left text-sm">
                      <td className="py-4  text-left">
                        10 January 2023, 09:20:58
                      </td>
                      <td className="text-left px-6"> Withdraw </td>
                      <td className="text-left px-6">₦1,000,000</td>
                      <td className="text-left px-6">
                        {" "}
                        UYUUGEVUVYVTYFYU#UGEYF&*YG#YUVEYVYU{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ProtectedPage(props) {
  return <SecureRoute offspring={Page} {...props} />;
}
