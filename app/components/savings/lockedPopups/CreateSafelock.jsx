import Overlay2 from "../../Overlay2";
import { Slide } from "react-awesome-reveal";
import { BiX } from "react-icons/bi";

function CreateSafelock({ toggleShow, handleSubmit }) {
  return (
    <Overlay2 pos="center">
      <section
        className={
          "w-full md:max-w-[493px] bg-white md:h-[100vh] h-[100vh] z-40  "
        }
      >
        <div className="flex p-6 flex-row justify-end items-center">
          <div
            onClick={toggleShow}
            className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning"
          >
            <BiX className="text-[--primary] text-xl" />
          </div>
        </div>

        <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8">
          <div className="px-6">
            <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
              How long do you want to lock funds?
            </h1>
            <p className="text-[--primary] font-medium text-sm pt-2">
              Select a duration that you want to lock your funds & earn upfront
              interests of up to 20.6%
            </p>
          </div>

          <div className="px-6 space-y-2 md:space-y-4 lg:space-y-6 pt-6">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  onClick={handleSubmit}
                  className="flex flex-row justify-between items-center rounded-brand border border-[--lines] hover:cursor-pointer hover:bg-[--lines] transitioning text-sm md:text-base p-6"
                >
                  <span className="text-[--primary]">10 - 30 days</span>

                  <span className="text-[--color-brand]">@7% per annum</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Overlay2>
  );
}

export default CreateSafelock;
