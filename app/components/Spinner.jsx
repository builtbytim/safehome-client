import cn from "classnames";

const Spinner = ({ size = "small", invert = false }) => {
  const tiny = size === "tiny";
  const mini = size === "mini";
  const small = size === "small";
  const large = size === "large";
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className={
          "  block animate-spin-fast  rounded-full    " +
          cn({
            "  h-12 w-12 border-4 ": large,
            " h-8 w-8 border-4 ": small,
            " h-6 w-6 border-2 ": mini,
            " h-4 w-4 border-2 ": tiny,
            " border-t-[--color-brand] border-r-[--color-brand] border-b-white border-l-white text-[--color-brand] ":
              invert,
            " text-white border-t-white  border-b-[--color-brand] border-l-[--color-brand] border-r-white":
              !invert,
          })
        }
      ></div>
    </div>
  );
};

export default Spinner;
