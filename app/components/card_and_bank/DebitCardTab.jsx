import React from "react";
import Image from "next/image";

import visa from "../../../assets/images/visa.svg";
import mastercard from "../../../assets/images/mastercard.svg";

const CardDisplay = ({ type, number, expiryDate, name }) => (
  <div
    className={`rounded-lg w-full h-[195px] p-5 flex flex-col justify-between text-white ${
      type === "visa" && "visa-bg"
    } ${type === "mastercard" && "mastercard-bg"}`}
  >
    <div className="h-[30px] w-auto">
      <Image
        src={type === "visa" ? visa : type === "mastercard" ? mastercard : visa}
        alt="card"
        width="auto"
        height="auto"
        className="w-auto h-full object-contain"
      />
    </div>
    <div className="w-full pt-5">
      <p className="font-medium text-2xl flex gap-3 w-full">
        <span>{number.slice(0, 4)}</span>
        <span className="font-bold text-2xl ">....</span>
        <span className="font-bold text-2xl ">....</span>
        <span>{number.slice(-4)}</span>
      </p>
    </div>

    <div className="flex justify-between gap-2 items-end font-medium">
      <p className="">{name}</p>
      <div>
        <p className="font-light uppercase text-sm">VALID THRU</p>
        <p>{expiryDate}</p>
      </div>
    </div>
  </div>
);

const DebitCardTab = () => {
  return (
    <div className="w-full">
      {/* <div className="flex py-16 justify-center items-center  w-full">
        <p className="text-sm lg:text-base  text-[#C4C4C4] xl:text-lg  ">
          {" "}
          Coming Soon
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[650px]">
        <CardDisplay
          type="visa"
          number="41738787870000"
          expiryDate="02/24"
          name="Samson Sayed"
        />
        <CardDisplay
          type="mastercard"
          number="41738787870000"
          expiryDate="02/24"
          name="Samson Sayed"
        />
      </div>
    </div>
  );
};

export default DebitCardTab;
