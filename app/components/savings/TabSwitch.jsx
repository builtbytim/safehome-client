import cn from "classnames";

function TabSwitch({ tabItems, tabState, setTabState, extraClasses = "" }) {
  function isActive(tabId) {
    return tabId === tabState;
  }
  return (
    <div className="inline-flex max-w-full flex-row border-b  border-[--placeholder] items-center justify-start  overflow-x-auto no-scrollbar whitespace-nowrap ">
      {tabItems.map((v, i) => {
        return (
          <div
            onClick={() => setTabState(i)}
            key={i}
            className={
              "py-2 border-b md:border-b-2  hover:cursor-pointer transitioning group px-4 md:px-8 capitalize text-sm md:text-base md:font-medium text-center inline-flex flex-row justify-start space-x-2 after:" +
              cn({
                " text-[--placeholder] border-transparent   hover:border-[#e8e7e7] ":
                  !isActive(i),
                [" text-[--color-brand-2]  border-[--color-brand-2] " +
                extraClasses]: isActive(i),
              })
            }
          >
            {v.img && (
              <div className="self-center">
                <v.img
                  fill={isActive(i) ? v.iconColor || "#ff9100" : "#9f9f9f"}
                />
              </div>
            )}
            <span className="group:hover:scale-[1.05] "> {v.name} </span>
          </div>
        );
      })}
    </div>
  );
}

export default TabSwitch;
