import cn from "classnames";

function ProgressBar({ percentage = 0, variant = 0 }) {
  return (
    <div className="relative self-center w-full h-[7px] rounded-brand  bg-[#DDDDDD] ">
      <div
        style={{
          width: `${percentage}%`,
        }}
        className={
          "absolute  h-full rounded-brand border-transparent  " +
          cn({
            "bg-[--text-brand-2]": variant === 0,
            "bg-[--color-brand]": variant === 1,

            "bg-[#FFD600]": variant === 2,
            "bg-[#FF0000]": variant === 3,
          })
        }
      ></div>
    </div>
  );
}

export default ProgressBar;
