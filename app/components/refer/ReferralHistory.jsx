"use client";

import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useQuery } from "react-query";
import config from "../../utils/config";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";
import Pagination from "../Pagination";
import cn from "classnames";

import Image from "next/image";

import { BsFilterRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import notFoundImg from "../../../assets/images/notFoundImg.png";
import { useState } from "react";

function ReferralHistory({ token }) {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const [search, setSearch] = useState("");

  const searchParams = new URLSearchParams(params);
  searchParams.append("page", params.page);
  searchParams.append("limit", params.limit);
  searchParams.append("search", params.search);

  const { isLoading, isError, refetch, data, isFetching, isSuccess } = useQuery(
    {
      queryKey: [queryKeys.getMyReferrals, token, params],
      queryFn: createFetcher({
        url: config.apiPaths.getMyReferrals,
        method: "GET",
        auth: token,
        surfix: `?${searchParams.toString()}`,
      }),

      keepPreviousData: true,
    }
  );

  function setPage(page) {
    setParams({ ...params, page });
  }

  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const handleSearch = debounce((e) => {
    const v = e.target.value;

    setParams({ ...params, search: v, page: 1 });
  }, 700);

  function onSearchChange(e) {
    setSearch(e.target.value);
    handleSearch(e);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-5 items-center pt-8">
        <p className="text-[--color-brand] font-medium text-lg px-5">
          Referral History
        </p>
        <div className="flex gap-3">
          <div className="w-full max-w-[300px] bg-[--b1] rounded-[1.1rem] flex gap-3 px-6 items-center">
            <FiSearch className="font-bold text-xl" />
            <div className="flex justify-center items-center">
              <input
                value={search}
                onChange={onSearchChange}
                type="text"
                placeholder="Search by name, email"
                className="block py-2 w-full text-sm rounded outline-none placeholder:text-[--placeholder] font-normal bg-transparent"
              />

              <span
                className={
                  "self-center  p-[2px] inline-block animate-ping rounded-full " +
                  cn({
                    " bg-[--green] ": isFetching,
                  })
                }
              ></span>
            </div>
          </div>

          <button className="bg-[--b1] text-sm rounded-[1.1rem] flex gap-3 px-6 items-center">
            <BsFilterRight className="font-bold text-xl" />
            <span className="hidden lg:block">Filter</span>
          </button>
        </div>
      </div>

      {isLoading && !data && (
        <div className="flex py-16 justify-center items-center  w-full">
          <LoadingView />
        </div>
      )}

      {isError && (
        <div className="flex py-16 justify-center items-center  w-full">
          <ErrorMessageView
            message="Something went wrong while fetching your referral history. Please try again."
            refetch={refetch}
          />
        </div>
      )}

      {data && data.unfilteredEntries === 0 ? (
        <div className="w-full flex flex-col items-center gap-8 pt-8 pb-4">
          <p className="max-w-[300px] text-center text-[--color-brand pt-4">
            You have not made any referral yet. Share your code to earn rewards
          </p>
          <div className="max-w-[250px]">
            <Image
              src={notFoundImg}
              width="auto"
              height="auto"
              alt="not found"
              className="w-full h-auto"
            />
          </div>
        </div>
      ) : data && data.entries === 0 ? (
        <div className="w-full flex flex-col items-center gap-8 pt-8 pb-4">
          <p className="max-w-[300px] text-center text-[--color-brand pt-4">
            No referral matches your search
          </p>
          <div className="max-w-[250px]">
            <Image
              src={notFoundImg}
              width="auto"
              height="auto"
              alt="not found"
              className="w-full h-auto"
            />
          </div>
        </div>
      ) : (
        data &&
        data.numItems > 0 && (
          <div>
            <div className="py-8 overflow-auto max-h-[482px]">
              <table className="w-full table text-[--text-secondary] font-normal ">
                <thead className="w-full">
                  <tr className="table-row w-full uppercase bg-[--b1]">
                    <th className=" text-center whitespace-nowrap  py-5 ">
                      {" "}
                      S/N{" "}
                    </th>
                    <th className=" text-left px-6 whitespace-nowrap  py-5 ">
                      Date
                    </th>
                    <th className=" text-left px-6 whitespace-nowrap  py-5 ">
                      Referral Name
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.items.map((item, i) => (
                    <tr
                      key={i}
                      className={`table-row text-left text-sm ${
                        i % 2 !== 0 && "py-5  bg-[--b1]"
                      }`}
                    >
                      <td className="py-4 text-center">{i + 1}</td>
                      <td className="text-left px-6">
                        {" "}
                        {new Date(item.createdAt * 1000).toDateString()}{" "}
                      </td>
                      <td className="text-left px-6">
                        {item.referredUserName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              data={data}
              isFetching={isFetching}
              isSuccess={isSuccess}
              isLoading={isLoading}
              setPage={setPage}
            />
          </div>
        )
      )}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 border-b border-[--text-brand] py-3 font-semibold text-[--color-brand]">
          <p>Amount earned per referral</p>
          <h3>₦2,000</h3>
        </div>
        <p className="text-sm pt-3">
          This is the amount you earn when your Referrals become members
        </p>
      </div>
    </div>
  );
}

export default ReferralHistory;
