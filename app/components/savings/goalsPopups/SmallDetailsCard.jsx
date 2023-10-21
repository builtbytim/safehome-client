import React from "react";

function SmallDetailsCard({ title, value }) {
  return (
    <div className="border w-full rounded-[8px] border-[--lines] px-4 py-2 space-y-1 flex flex-col justify-center items-start font-medium self-stretch text-sm">
      <span className="text-[--placeholder] text-[12px] capitalize ">
        {title}{" "}
      </span>
      <span className="text-[--primary] text-[14px] capitalize">{value}</span>
    </div>
  );
}

export default SmallDetailsCard;
