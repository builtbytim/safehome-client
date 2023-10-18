import { useLayoutEffect } from "react";

const useBodyScrollLock = (active = true) => {
  useLayoutEffect(() => {
    if (!active) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  }, []);
};

export default useBodyScrollLock;
