import LocalOverlay from "./LocalOverlay";
import LoadingBar from "./LoadingBar";
import cn from "classnames";

export default function BarLoader({ active = false, v = 1 }) {
  if (!active) {
    return null;
  }

  return (
    <>
      <LocalOverlay
        className={
          "   z-10 " +
          cn({
            " border-0  sm:rounded-brand ": v === 1,

            " hidden  ": !active,
            " block ": active,
          })
        }
      >
        <LoadingBar v={v} />
      </LocalOverlay>
    </>
  );
}
