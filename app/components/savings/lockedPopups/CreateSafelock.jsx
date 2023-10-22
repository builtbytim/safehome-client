import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import cn from "classnames";
import { useRef } from "react";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";

const lockDurationsInMonths = [1, 2, 3, 4, 5, 6];

function CreateSafelock({ toggleShow, handleSubmit, formData, show }) {
  const ref = useRef(null);

  useOutsideClickDetector(ref, () => {
    if (show) {
      toggleShow();
    }
  });

  function handleClick(v) {
    return () => {
      handleSubmit({
        lockDurationInMonths: v,
      });
    };
  }

  return (
    <Overlay2 z={3}>
      <section
        ref={ref}
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40  "
        }
      >
        <div className="flex p-6 flex-row justify-end items-center">
          <div className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning">
            <BiX onClick={toggleShow} className="text-[--primary] text-2xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8">
          <div className="px-6">
            <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
              How long do you want to lock funds?
            </h1>
            <p className="text-[--primary] font-medium text-sm pt-2">
              Select a duration that you want to lock your funds before it is
              invested in an investment of your choice
            </p>
          </div>

          <div className="px-6 space-y-2 md:space-y-4 lg:space-y-6 pt-6">
            {lockDurationsInMonths.map((v, i) => (
              <div
                key={i}
                onClick={handleClick(v)}
                className={
                  "flex flex-row justify-between items-center rounded-brand border border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning text-sm md:text-base p-6 " +
                  cn({
                    " bg-[--platinum] hover:bg-[--platinum] cursor-default  ":
                      v === formData.lockDurationInMonths,
                  })
                }
              >
                <span className="text-[--primary]">
                  {v} {v > 1 ? "months" : "month"}{" "}
                </span>

                {/* <span className="text-[--color-brand]">@7% per annum</span> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Overlay2>
  );
}

export default CreateSafelock;
