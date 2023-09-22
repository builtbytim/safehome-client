import Image from "next/image";
import HomeTargetImage from "../../../assets/images/target-home.jpeg";

function HomeTarget() {
  return (
    <div className="rounded-[8px] md:rounded-[16px]">
      <div className="grid grid-cols-5 p-1 md:p-0 rounded-brand border border-[--lines]">
        <div className="col-span-5  xl:col-span-2 border border-transparent rounded-brand self-stretch ">
          <Image
            className="rounded-[16px]  md:rounded-r-0 object-cover"
            width="100%"
            height="100%"
            src={HomeTargetImage}
            alt="home target"
          />
        </div>

        <div className="self-stretch rounded-r-[16px] col-span-5 xl:col-span-3 py-4 px-2 md:px-4 space-y-4">
          <h1 className="text-[--primary] text-left font-bold capitalize text-lg  ">
            Lekki Estate
          </h1>

          <div className=" flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-start">
              <span className="text-[--text-brand-2] font-medium text-sm">
                ₦50,000
              </span>
              <span className="text-[--primary] text-left  capitalize text-sm  ">
                {" "}
                Amount Saved{" "}
              </span>
            </div>

            <div className="flex flex-col justify-center items-end md:items-start">
              <span className="text-[--text-brand-2] text-right font-medium text-sm">
                307
              </span>
              <span className="text-[--primary] text-right  capitalize text-sm  ">
                Days Left
              </span>
            </div>
          </div>

          {/* Progress bar and percent */}

          <div className="flex flex-row  justify-between items-center md:items-start space-x-8 lg:space-x-16">
            <div className="relative self-center w-full h-[10px] rounded-brand  bg-[#DDDDDD] ">
              <div className="absolute w-[20%] h-full rounded-brand border-transparent bg-[--text-brand-2]"></div>
            </div>

            <div className="self-center">
              <span className="text-[--primary] md:font-medium text-left  capitalize text-sm  ">
                10%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTarget;
