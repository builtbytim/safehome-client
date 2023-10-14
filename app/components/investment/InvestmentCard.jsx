"use client";

import Image from "next/image";

const InvestmentCard = ({
  img,
  title,
  returns,
  value,
  investors,
  quantity,
  openInfo,
}) => {
  return (
    <button
      className="relative rounded-brand md:rounded-lg lg:rounded-xl border overflow-hidden text-[--text-secondary] text-left grid grid-cols-5 md:grid-cols-5 h-[165px] md:h-[192px] w-full group text-sm transitioning"
      onClick={() => openInfo()}
    >
      <div className="w-full h-full col-span-2 md:col-span-2 overflow-x-hidden">
        <Image
          src={img}
          alt={title}
          className="object-cover w-full h-full"
          width={200}
          height={192}
        />
      </div>
      <div className="p-3 md:px-4 xl:px-7 col-span-3 md:col-span-3 space-y-1">
        <button className="uppercase font-medium text-lg md:text-xl text-left truncate group-hover:text-[--text-brand]">
          {title}
        </button>

        <div className="flex gap-4 md:gap-6 pt-2 ">
          <div>
            <h3 className="text-[--text-brand]   pb-1 font-medium">₦{value}</h3>
            <p className="mt-[-4px]">Asset Value</p>
          </div>
          <div>
            <h3 className="text-[--text-brand]   pb-1 font-medium">
              {investors}
            </h3>
            <p className="mt-[-4px]">Investors</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 rounded-tl-xl py-[0.4rem] md:py-2 px-3 text-white bg-[--green] text-[0.7rem] md:text-sm">
        {quantity} Available
      </div>
    </button>
  );
};

export default InvestmentCard;
