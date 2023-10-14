import React from "react";

function TabSwitch({ tabState, setTabState }) {
  return (
    <div className="border-b border-[--lines] px-0 md:px-0 flex font-semibold">
      <button
        className={tabState === 0 ? "tab-button-active" : "tab-button"}
        onClick={() => setTabState(0)}
      >
        My Investments
      </button>
      <button
        className={tabState === 1 ? "tab-button-active" : "tab-button"}
        onClick={() => setTabState(1)}
      >
        New Oppurtunities
      </button>
      <button
        className={tabState === 2 ? "tab-button-active" : "tab-button"}
        onClick={() => setTabState(2)}
      >
        Completed
      </button>
    </div>
  );
}

export default TabSwitch;
