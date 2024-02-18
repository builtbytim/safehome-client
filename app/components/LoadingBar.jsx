import cn from "classnames";

function LoadingBar({ v = 1 }) {
  return (
    <div
      className={
        "w-full      overflow-hidden absolute top-0 inset-x-0" +
        cn({
          "  border border-transparent sm:rounded-t-[16px] h-[8px]  bg-[#ff6100]/30 ":
            v === 1,
          " h-[4px] md:h-[6px]   bg-[#ff6100]/20  ": v === 0,
        })
      }
    >
      <div
        className={
          "h-full  bg-[--text-brand] absolute  " +
          cn({
            "  border border-transparent sm:rounded-t-[16px] ": v === 1,
          })
        }
        style={{
          animation: "slideLeft 0.75s easein infinite",
          width: "100%",
        }}
      ></div>
    </div>
  );
}

export default LoadingBar;
