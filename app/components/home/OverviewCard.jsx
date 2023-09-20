import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

import Image from "next/image";
import FundsImage from "../../../assets/images/icons/Funds.svg";
import Savingsmage from "../../../assets/images/icons/SavingsLite.svg";
import TrendsImage from "../../../assets/images/icons/Trends.svg";
import LoanImage from "../../../assets/images/icons/loan.svg";

function OverviewCard() {
  return (
    <section className="bg-white rounded-brand p-4 lg:p-8 space-y-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
          {" "}
          Overview{" "}
        </h1>

        <div className=" md:hidden self-center">
          <PiDotsThreeOutlineVertical className="text-xl text-[--placeholder]" />
        </div>

        <div className="hidden self-center md:flex justify-center items-center space-x-4">
          <button className="btn-2 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center">
            <AiOutlineMinus className="" />
            <span>Withdraw</span>
          </button>

          <button className="btn-1 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center">
            <AiOutlinePlus className="" />
            <span>Add Fund</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 scrollbar-fix text-sm lg:text-lg">
        <div className="bg-[#8d4000]/10 min-w-[80%]  lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6">
          <div>
            <Image src={FundsImage} alt="my funds" width="48" />
          </div>

          <h2 className=" text-[--text-secondary] font-medium"> My Funds </h2>

          <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
            ₦0
          </p>
        </div>

        <div className="bg-[#ff6100]/10 min-w-[80%]  lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 ">
          <div>
            <Image src={Savingsmage} alt="my funds" width="48" />
          </div>

          <h2 className=" text-[--text-secondary] font-medium">
            {" "}
            Total Savings{" "}
          </h2>

          <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
            ₦0
          </p>
        </div>

        <div className="bg-[#ff6100]/10 min-w-[80%]  lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6">
          <div>
            <Image src={TrendsImage} alt="my funds" width="48" />
          </div>

          <h2 className=" text-[--text-secondary] font-medium">
            {" "}
            Total Investments
          </h2>

          <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
            ₦0
          </p>
        </div>

        <div className="bg-[#ff6100]/10 min-w-[80%]  lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6">
          <div>
            <Image src={LoanImage} alt="my funds" width="48" />
          </div>

          <h2 className=" text-[--text-secondary] font-medium"> Total Loan</h2>

          <p className="text-[--text-secondary] font-bold text-xl lg:text-2xl">
            ₦0
          </p>
        </div>
      </div>
    </section>
  );
}

export default OverviewCard;
