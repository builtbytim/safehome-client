"use client";

import { useEffect } from "react";
import { useUiStore } from "../utils/store";

function SuperOverlay() {
  const show = useUiStore((state) => state.showSuperOverlay);
  const toggle = useUiStore((state) => state.toggleSuperOverlay);

  //   remove in 10 s

  useEffect(() => {
    setTimeout(() => {
      toggle(false);
    }, 10000);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed z-50 inset-0 bg-white/70 backdrop-blur-sm"></div>
  );
}

export default SuperOverlay;
