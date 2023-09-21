import cn from "classnames";
import Image from "next/image";
import { useState } from "react";

function TabSwitch({ tabItems, persistActiveTab = null, extraClasses = "" }) {
  const [activeTab, setActiveTab] = useState(0);

  const isActive = (i) => i === activeTab;

  const selectTab = (i) => {
    return () => {
      const c = Math.min(Math.max(0, i), 2);
      setActiveTab(c);

      if (typeof persistActiveTab === "function") {
        persistActiveTab(c);
      }
    };
  };

  return (
    <div className="inline-flex max-w-full flex-row border-b  border-[--placeholder] items-center justify-start  overflow-x-auto no-scrollbar whitespace-nowrap ">
      {tabItems.map((v, i) => {
        return (
          <div
            key={i}
            onClick={selectTab(i)}
            className={
              "py-2 border-b md:border-b-2 hover:cursor-pointer transitioning group px-4 md:px-8 capitalize text-sm md:text-base md:font-medium text-center inline-flex flex-row justify-start space-x-2" +
              cn({
                " text-[--placeholder] border-transparent ": !isActive(i),
                [" text-[--color-brand-2]  border-[--color-brand-2] " +
                extraClasses]: isActive(i),
              })
            }
          >
            {v.img && (
              <div>
                {" "}
                <Image src={v.img} width={20} height={20} alt={v.name} />{" "}
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
