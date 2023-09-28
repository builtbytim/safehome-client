import cn from "classnames";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

function TabSwitch({
  tabItems,
  persistActiveTab = null,
  defaultTab = 1,
  extraClasses = "",
  tabParamName = "tab" + Math.round(Math.random() * 1000000),
}) {
  const [cTab, setCTab] = useState(tabItems[defaultTab].tabId);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get(tabParamName) || tabItems[defaultTab].tabId;

  const isActive = (tabId) => tabId === tab;

  const selectTab = (t) => {
    return () => {
      // const c = Math.min(Math.max(0, i), 2);
      // setActiveTab(c);

      if (typeof persistActiveTab === "function") {
        persistActiveTab(t);
      }
    };
  };

  useEffect(() => {
    const tab = searchParams.get(tabParamName) || tabItems[defaultTab].tabId;

    setCTab(tab);

    if (typeof persistActiveTab === "function" && tab !== cTab) {
      selectTab(tab)();
    }
  }, [pathname, searchParams, tabItems, cTab]);

  return (
    <div className="inline-flex max-w-full flex-row border-b  border-[--placeholder] items-center justify-start  overflow-x-auto no-scrollbar whitespace-nowrap ">
      {tabItems.map((v, i) => {
        // console.log(v.url);

        return (
          <Link
            key={i}
            href={v.url || `${pathname}?${tabParamName}=${v.tabId}`}
          >
            <div
              className={
                "py-2 border-b md:border-b-2  hover:cursor-pointer transitioning group px-4 md:px-8 capitalize text-sm md:text-base md:font-medium text-center inline-flex flex-row justify-start space-x-2" +
                cn({
                  " text-[--placeholder] border-transparent   hover:border-[#e8e7e7] ":
                    !isActive(v.tabId),
                  [" text-[--color-brand-2]  border-[--color-brand-2] " +
                  extraClasses]: isActive(v.tabId),
                })
              }
            >
              {v.img && (
                <div className="self-center">
                  <v.img
                    fill={
                      isActive(v.tabId) ? v.iconColor || "#ff9100" : "#9f9f9f"
                    }
                  />
                </div>
              )}
              <span className="group:hover:scale-[1.05] "> {v.name} </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default TabSwitch;
