import cn from "classnames";

export default function LocalOverlay({ children, depth = 1, className = "" }) {
  return (
    <div
      className={
        "absolute w-full h-full inset-0  " +
        className +
        cn({
          "   backdrop-blur-sm ": depth === 1,
          "    backdrop-blur-sm ": depth === 2,
          "   backdrop-blur ": depth === 3,
          "   backdrop-blur ": depth === 4,
        })
      }
    >
      {children}
    </div>
  );
}
