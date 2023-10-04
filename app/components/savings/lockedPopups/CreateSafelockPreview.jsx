import Overlay2 from "../../Overlay2";
import { Slide } from "react-reveal";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";
import SwitchField from "../../forms/branded/SwitchField";

function CreateSafelockPreview({ toggleShow, handleSubmit }) {
  return (
    <Overlay2 pos="center">
      <Slide right duration={300} delay={200}>
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

          <div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[75vh] pb-8">
            <div className="px-6">
              <h1 className="font-bold  text-[--color-brand] text-lg md:text-xl">
                Preview
              </h1>
              <p className="text-[--primary] font-medium text-sm pt-2">
                Preview details of safelock
              </p>
            </div>

            <div className="px-6 gap-8 pt-6 grid grid-cols-2">
              <SmallDetailsCard title="Amount to Lock" value="#500,000" />
              <SmallDetailsCard title="Interest" value="10%" />
              <SmallDetailsCard title="Interest to Earn" value="#50,000" />
              <SmallDetailsCard title="Maturity date" value="11th Sep, 2023" />
              <SmallDetailsCard title="Lock Duration" value="365 Days" />
              <SmallDetailsCard title="Mature into your" value="SafeHome" />
            </div>

            <div className="w-full relative flex flex-col justify-center items-start space-y-2 p-6">
              <SwitchField color="#8d4000" />
              <p className="text-[--text-secondary] font-medium text-sm text-left">
                I authorize safeHome to SafeLock ₦500,000 immediately and return
                it in full on Wednesday 6th of September 2023 by 04:17 PM to my
                safeHome account. I confirm and approve this transaction. I
                hereby acknowledge that this SafeLock CANNOT be broken once it
                has been created.
              </p>
            </div>
          </div>

          <div className="absolute w-[90%]  inset-x-0 bottom-4  flex flex-col justify-center items-center  mx-auto">
            <button type="submit" className="btn-1 w-full  ">
              Continue
            </button>
          </div>
        </section>
      </Slide>
    </Overlay2>
  );
}

export default CreateSafelockPreview;
