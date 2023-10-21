import Image from "next/image";
import img from "../../../assets/images/target-home.jpeg";
import { NumericFormat } from "react-number-format";
import ProgressBar from "./ProgressBar";

export default function GoalSavingsCard(props) {
  const {
    goalName,
    goalImageUrl,
    goalAmount,
    amountSaved,
    startDate,
    endDate,
    setSelectedGoal,
    paymentMode,
  } = props;

  const percentageSaved = Math.ceil((amountSaved / goalAmount) * 100);

  const daysLeft = Math.ceil((endDate - startDate) / (60 * 60 * 24));

  return (
    <div
      onClick={setSelectedGoal}
      className="hover:ring-2 hover:ring-[--lines] hover:ring-offset-2 transitioning rounded-[10px] lg:rounded-[16px] group self-stretch"
    >
      <div className="grid grid-cols-5 rounded-[10px] h-full lg:rounded-[16px] border border-[--lines] p-1 lg:p-0">
        <div className="col-span-2 relative overflow-hidden rounded-[10px] lg:rounded-l-[16px]">
          <Image
            className="absolute w-full h-full object-cover rounded-[10px] lg:rounded-l-[16px] lg:rounded-r-0 group-hover:scale-110 transform transition-all duration-1000 ease-in-out"
            fill
            src={goalImageUrl ? goalImageUrl : img}
            alt="goal savings plan"
          />
        </div>

        <div className="self-stretch rounded-r-[16px] col-span-3 py-1 lg:pt-3 lg:pb-4 px-2 md:px-4 space-y-4">
          <div className="">
            <h1 className="text-[--primary] text-left font-semibold capitalize xl:text-lg">
              {goalName}
            </h1>
            {paymentMode === "auto" && (
              <p className="text-xs pt-1 font-light    text-[--placeholder]">
                Auto Savings
              </p>
            )}
          </div>

          <div className=" flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-start">
              <span className="text-[--text-brand-2] font-medium text-sm">
                <NumericFormat
                  value={amountSaved}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦ "}
                />
              </span>
              <span className="text-[--primary] text-left  capitalize text-[0.8rem] leading-[0.88rem] md:text-sm">
                {" "}
                Amount Saved{" "}
              </span>
            </div>

            <div className="flex flex-col justify-center items-end md:items-start">
              <span className="text-[--text-brand-2] text-right font-medium text-sm">
                {daysLeft}
              </span>
              <span className="text-[--primary] text-right  capitalize text-[0.8rem] leading-[0.88rem] md:text-sm  ">
                Days Left
              </span>
            </div>
          </div>

          {/* Progress bar and percent */}

          <div className="flex flex-row  justify-between items-center md:items-start space-x-8 lg:space-x-16">
            <ProgressBar percentage={percentageSaved} />

            <div className="self-center">
              <span className="text-[--primary] md:font-medium text-left  capitalize text-sm  ">
                {percentageSaved}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
