import React from "react";

function ClubOwnersFilter() {
  return (
    <div className="flex  flex-no-wrap space-x-4 items-center scrollbar-fix text-center filter-container  overflow-x-auto pb-2 no-scrollbar">
      <button className="filter-btn-active">All</button>
      <button className="filter-btn">Land Owners Club</button>
      <button className="filter-btn">Home Owners Club</button>
      <button className="filter-btn">Office Owners Club</button>
    </div>
  );
}

export default ClubOwnersFilter;
