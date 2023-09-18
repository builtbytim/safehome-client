import cn from "classnames";

export default function Overlay({
  children,
  z = 1,
  pos = "start",
  ClickBack = null,
}) {
  return (
    <>
      <div
        className={
          "fixed w-full inset-0  " +
          cn({
            " z-20 bg-black/60 backdrop-blur-sm ": z === 1,
            " z-30 bg-black/70  backdrop-blur-sm ": z === 2,
            " z-40 bg-black/70 backdrop-blur ": z === 3,
            " z-50 bg-black/70 backdrop-blur ": z === 4,
          })
        }
      ></div>
      <div
        className={
          "fixed  inset-y-0 mx-auto flex flex-col justify-center items-center w-[95%] lg:w-[80%] max-w-lg inset-x-0 " +
          cn({
            " z-20 ": z === 1,
            " z-30 ": z === 2,
            " z-40 ": z === 3,
            " z-50 ": z === 4,
          })
        }
      >
        {ClickBack && (
          <div className="absolute z-30 top-4 right-2">
            <ClickBack />
          </div>
        )}

        <div
          className={
            "fixed  inset-y-0 mx-auto flex flex-col lg:justify-center items-center w-[95%] lg:w-[80%] max-w-lg inset-x-0 " +
            cn({
              " z-20 ": z === 1,
              " z-30 ": z === 2,
              " z-40 ": z === 3,
              " z-50 ": z === 4,
              " justify-start  ": pos === "start",
              " justify-center  ": pos === "center",
              " justify-end  ": pos === "end",
            })
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
