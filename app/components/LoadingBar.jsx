import cn from "classnames";

function LoadingBar({ v = 1 }) {
  return (
    <div
      className={
        "w-full   bg-[#ff6100]/30   overflow-hidden absolute top-0 inset-x-0" +
        cn({
          "  border border-transparent rounded-t-[16px] h-3 ": v === 1,
          " h-2   ": v === 0,
        })
      }
    >
      <div
        className={
          "h-full  bg-[--text-brand] absolute  " +
          cn({
            "  border border-transparent rounded-t-[16px] ": v === 1,
          })
        }
        style={{
          animation: "slideLeft 0.8s linear infinite",
          width: "100%",
        }}
      ></div>
    </div>
  );
}

export default LoadingBar;
