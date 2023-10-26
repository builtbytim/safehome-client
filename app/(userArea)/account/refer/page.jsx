"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { PiMoneyDuotone } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import picIcon from "../../../../assets/images/icons/picIcon.svg";
import CopyButton from "../../../components/CopyButton.jsx";
import ReferralHistory from "../../../components/refer/ReferralHistory";
import ScrollLink from "../../../components/ScrollLink";

import {
  Withdraw,
  Receipt,
  ReceiptTopBar,
} from "../../../components/home/popups";
import { PopUpTopBar } from "../../../components/security";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";

const referralsData = [
  {
    date: "6th September, 2023",
    name: "Stephen Jobs",
  },
  {
    date: "6th September, 2023",
    name: "John Doe",
  },
  {
    date: "6th September, 2023",
    name: "Francis Drake",
  },
];

export default function Refer() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const [receiptState, setReceiptState] = useState("");

  // Hide Popups when not clicked on
  const withdrawRef = useRef(null);
  const receiptRef = useRef(null);

  useOutsideClickDetector(withdrawRef, () => setShowWithdraw(false));
  useOutsideClickDetector(receiptRef, () => setShowReceipt(false));

  return (
    <main className=" space-y-2 lg:space-y-3 text-[--text-secondary] border border-[--lines] p-5 h-full min-h-[80vh] rounded-2xl">
      <div className="pb-3 space-y-2">
        <h3 className="text-3xl text-[--color-brand] font-semibold">
          Referrals
        </h3>
        <p>Refer and earn 40% per referral.</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-end">
          <button
            className="bg-[--color-brand] flex text-white py-3 px-6 rounded-lg items-center gap-2"
            onClick={() => setShowWithdraw(true)}
          >
            <FaMoneyBill className="text-white text-2xl" /> Withdraw
          </button>
        </div>
        {/* Cards */}

        <div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
          <ScrollLink
            containerId="refer-scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="total-balance"
          ></ScrollLink>
          <ScrollLink
            containerId="refer-scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="referrals"
          ></ScrollLink>
        </div>
        <div
          id="refer-scroll-indicators"
          className="flex   flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
        >
          <div
            id="total-balance"
            className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch flex flex-col justify-between p-6 bg-[--card-bg-1] rounded-xl space-y-6"
          >
            <span>
              <PiMoneyDuotone className="text-[--text-secondary] text-lg" />
            </span>
            <p className="text-sm">Total Earned</p>
            <p className="text-xl font-semibold">₦5,000</p>
          </div>

          <div
            id="referrals"
            className="w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] self-stretch flex flex-col justify-between p-6 bg-[--card-bg-1] rounded-xl space-y-6"
          >
            <span>
              <HiOutlineUsers className="text-[--text-secondary] text-lg" />
            </span>
            <p className="text-sm">Referrals</p>
            <p className="text-xl font-semibold">{referralsData.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 text-[--text-secondary] pt-4">
          {/* Copy buttons */}
          <CopyButton
            link="https://www.google.com/"
            type="link"
            additionalClasses=""
          />
          <CopyButton
            link="ITEHHOH"
            type="code"
            additionalClasses="flex md:justify-end"
          />
        </div>
      </div>
      <ReferralHistory data={referralsData} />

      {showWithdraw && (
        <div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
          <div
            className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
            ref={withdrawRef}
          >
            <div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
              <PopUpTopBar
                close={() => setShowWithdraw(false)}
                title="Withdraw Funds"
                desc="Withdraw funds to your desired destination."
              />
            </div>
            <div className="pt-[230px] h-full">
              <Withdraw
                btnFunc={() => {
                  setReceiptState("withdrawal");
                  setShowReceipt(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showReceipt && (
        <div className="fixed top-[-20vh] left-0 w-full h-[150vh] bg-black/50 z-[100]">
          <div
            className="fixed top-[0] right-0 w-full md:w-[450px] h-[105vh] pb-[5vh] bg-white overflow-y-auto shadow"
            ref={receiptRef}
          >
            <div className="fixed top-0 right-0 z-[10] w-full md:w-[450px] bg-transparent pr-1">
              <ReceiptTopBar
                close={() => setShowReceipt(false)}
                title="Transaction Type"
                desc={receiptState}
              />
            </div>
            <div className="pt-[230px] h-full">
              <Receipt
                btnFunc={() => console.log("withdraw")}
                type={receiptState}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
