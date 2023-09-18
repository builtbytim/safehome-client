import LocalOverlay from "./LocalOverlay";
import LoadingBar from "./LoadingBar";
import cn from "classnames";

export default function BarLoader({ active = false, v = 1 }) {
  if (!active) return null;
  return (
    <>
      <LocalOverlay
        className={
          "border   z-10 " +
          cn({
            " border rounded-brand ": v === 1,
          })
        }
      >
        <div className="absolute top-0 z-10 flex flex-col justify-center items-center  inset-x-0 overflow-hidden">
          <LoadingBar v={v} />
        </div>
      </LocalOverlay>
    </>
  );
}
