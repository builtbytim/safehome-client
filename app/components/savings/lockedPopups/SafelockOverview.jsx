import Overlay2 from "../../Overlay2";
import { Slide } from "react-awesome-reveal";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";

function SafelockOverview({ toggleShow, handleSubmit }) {
  return (
    <Overlay2 pos="center">
      <div right duration={300} delay={200}>
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
              <h1 className="font-bold  text-[--primary] text-lg md:text-xl">
                Smart Office Lekki
              </h1>
            </div>

            <div className="p-6">
              <h2 className="font-bold text-[--color-brand] text-2xl md:text-2xl text-center">
                {" "}
                ₦1,000,000.00
              </h2>
            </div>

            <div className="px-6 gap-y-4 gap-x-4  grid grid-cols-2">
              <SmallDetailsCard title="Lock Funds" value="#500,000" />
              <SmallDetailsCard title="Interest Earned" value="10%" />
              <SmallDetailsCard title="Total Interest Earned" value="#50,000" />
              <SmallDetailsCard title="Payback Date" value="11th Sep, 2023" />
              <SmallDetailsCard title="Status" value="Ongoing" />
              <SmallDetailsCard title="Payback Time" value="06:09 AM" />
            </div>

            <div className="pt-10">
              <p className="text-[--color-brand] text-lg md:text-xl font-bold text-center">
                Safelock is currently Ongoing
              </p>
            </div>
          </div>

          <div className=" space-y-4 p-6  flex flex-col justify-center items-center  mx-auto">
            <button type="submit" className="btn-1 w-full  ">
              Topup SafeLock
            </button>

            <button
              type="button"
              onClick={toggleShow}
              className="btn-2 w-full  "
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </Overlay2>
  );
}

export default SafelockOverview;
