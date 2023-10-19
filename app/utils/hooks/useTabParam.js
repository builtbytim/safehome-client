import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isDigit } from "../fetchUtils";

export default function useTabParam(
  paramName = "tab",
  defaultValue = 0,
  range = [0, 1]
) {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState(defaultValue);

  function setTabWithHistory(newTab) {
    if (newTab < range[0] || newTab > range[1]) return;

    setTab(newTab);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${paramName}=${newTab}`
    );
  }

  useEffect(() => {
    const tab = searchParams.get(paramName);

    if (isDigit(tab)) {
      setTabWithHistory(parseInt(tab));
      return;
    }
  }, [searchParams, paramName]);

  return {
    tab,
    setTab: setTabWithHistory,
  };
}
