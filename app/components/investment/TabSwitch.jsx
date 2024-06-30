import React from "react";

function TabSwitch({ tabState, setTabState }) {
  return (
    <div className="border-b flex  flex-no-wrap items-center scrollbar-fix text-center filter-container no-scrollbar max-w-[99%] font-semibold overflow-x-scroll overflow-y-hidden">
      <button
        className={`whitespace-nowrap tab-button
					${tabState === 0 ? "tab-button-active" : "tab-button-not-active"}`}
        onClick={() => setTabState(0)}
      >
        My Investments
      </button>
      <button
        className={`whitespace-nowrap tab-button
					${tabState === 1 ? "tab-button-active" : "tab-button-not-active"}`}
        onClick={() => setTabState(1)}
      >
        New Opportunities
      </button>
      <button
        className={`whitespace-nowrap tab-button
					${tabState === 2 ? "tab-button-active" : "tab-button-not-active"}`}
        onClick={() => setTabState(2)}
      >
        Completed
      </button>
    </div>
  );
}

export default TabSwitch;
