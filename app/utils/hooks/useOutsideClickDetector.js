import { useEffect } from "react";
import { useNotifyStore } from "../store";

function useOutsideClickDetector(ref, callback, ignoreRefs = []) {
  const notifyStore = useNotifyStore((state) => state.notifyState);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // Check if the click target is not inside the monitored element
        let isIgnored = false;

        for (const ignoreRef of ignoreRefs) {
          if (ignoreRef.current && ignoreRef.current.contains(event.target)) {
            isIgnored = true;
            break;
          }
        }

        if (!isIgnored) {
          if (typeof callback === "function") {
            if (!notifyStore.show) {
              callback();
            }
          }
        }
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ignoreRefs, callback]);
}

export default useOutsideClickDetector;
