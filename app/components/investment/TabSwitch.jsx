import React from "react";

function TabSwitch({ tabState, setTabState }) {
  return (
    <div className="border-b overflow-x-scroll no-scrollbar border-[--lines] px-0 md:px-0 flex font-semibold">
      <button
        className={
          "whitespace-nowrap " +
          (tabState === 0 ? "tab-button-active" : "tab-button")
        }
        onClick={() => setTabState(0)}
      >
        My Investments
      </button>
      <button
        className={
          "whitespace-nowrap " +
          (tabState === 1 ? "tab-button-active" : "tab-button")
        }
        onClick={() => setTabState(1)}
      >
        New Oppurtunities
      </button>
      <button
        className={
          "whitespace-nowrap " +
          (tabState === 2 ? "tab-button-active" : "tab-button")
        }
        onClick={() => setTabState(2)}
      >
        Completed
      </button>
    </div>
  );
}

export default TabSwitch;
