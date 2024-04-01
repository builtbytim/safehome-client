import Link from "next/link";
import Image from "next/image";
import SavingsImage from "../../../assets/images/icons/SavingsLite.svg";
import TargetImage from "../../../assets/images/icons/target.svg";
import LockImage from "../../../assets/images/icons/lock.svg";
import ScrollLink from "../ScrollLink";
import { BiChevronRight } from "react-icons/bi";
import useUserSavingsStats from "../../utils/hooks/useUserSavingsStats";
import { NumericFormat } from "react-number-format";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function OverviewCard({ token, launchCreateGoal, launchCreateLock }) {
	const { data, isError, isLoading, isSuccess, refetch } = useUserSavingsStats(
		token,
		null,
		null,
		true
	);

	return (
		<section className="bg-white rounded-brand  md:p-8 space-y-4 lg:space-y-8">
			<div className="hidden md:flex flex-row justify-between items-center">
				<h1 className="text-[--text] capitalize text-xl sm:text-2xl md:text-3xl lg:text-3xl  font-medium">
					{" "}
					Overview{" "}
				</h1>

				<div className="hidden self-center md:flex justify-center items-center space-x-4">
					<Link
						href="/savings/goals"
						className="btn-1 px-6 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center"
					>
						<span>Goal Savings</span>
					</Link>
					<Link
						href="/savings/locked"
						className="btn-2 px-6 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center"
					>
						<span>Investment Savings</span>
					</Link>
				</div>
			</div>

			<div>
				{/* Scroll Indicators  */}

				<div className="md:hidden pb-1 flex flex-row justify-end items-center space-x-1 px-2">
					<ScrollLink
						containerId="scroll-indicators"
						activeClass="scroll-link-active"
						className="scroll-link"
						to="total-balance"
					></ScrollLink>

					<ScrollLink
						containerId="scroll-indicators"
						activeClass="scroll-link-active"
						className="scroll-link"
						to="goal-savings"
					></ScrollLink>

					<ScrollLink
						containerId="scroll-indicators"
						activeClass="scroll-link-active"
						className="scroll-link"
						to="locked-savings"
					></ScrollLink>
					{/* <ScrollLink
            containerId="scroll-indicators"
            activeClass="inline-block rounded-full  w-[8px] bg-[--text-brand] p-1"
            className="inline-block rounded-full border p-1 "
            to="interest-earned"
          ></ScrollLink> */}
				</div>

				{/* Scroll Indicatots end  */}

				<div
					id="scroll-indicators"
					className="flex  flex-row justify-between items-center overflow-x-auto whitespace-nowrap space-x-4 no-scrollbar text-sm lg:text-lg"
				>
					<div
						id="total-balance"
						className="bg-[#1E07001A] w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
					>
						<div>
							<Image src={SavingsImage} alt="my funds" width="48" />
						</div>

						<h2 className=" text-[--text] font-medium">Total Balance</h2>

						<p className="text-[--text] font-bold text-xl lg:text-2xl">
							<NumericFormat
								value={data ? data.balance : 0}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"₦ "}
							/>
						</p>
					</div>

					<div
						id="goal-savings"
						className="bg-[#FF91001A] w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6 "
					>
						<div className="w-full flex flex-row justify-between items-center">
							<div className="self-center">
								<Image src={TargetImage} alt="my funds" width="48" />
							</div>

							<div
								role="button"
								onClick={launchCreateGoal}
								className="flex flex-row justify-center items-center space-x-2 self-center text-[--text]"
							>
								<span> Create Goal </span>

								<BiChevronRight className="inline-block text-2xl self-center" />
							</div>
						</div>

						<h2 className=" text-[--text] font-medium"> Goal Savings </h2>

						<p className="text-[--text] font-bold text-xl lg:text-2xl">
							<NumericFormat
								value={data ? data.goalSavingsBalance : 0}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"₦ "}
							/>
						</p>
					</div>

					<div
						id="locked-savings"
						className="bg-[#ff6100]/10 w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
					>
						<div className="w-full flex flex-row justify-between items-center">
							<div className="self-center">
								<Image src={LockImage} alt="my funds" width="48" />
							</div>

							<div
								role="button"
								onClick={launchCreateLock}
								className="flex flex-row justify-center items-center space-x-2 self-center text-[--text]"
							>
								<span> Invest funds </span>

								<BiChevronRight className="inline-block text-2xl self-center" />
							</div>
						</div>
						<h2 className=" text-[--text] font-medium"> Investment Savings </h2>

						<p className="text-[--text] font-bold text-xl lg:text-2xl">
							<NumericFormat
								value={data ? data.lockedSavingsBalance : 0}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"₦ "}
							/>
						</p>
					</div>

					{/* <div
            id="interest-earned"
            className="bg-[#1E07001A] w-full min-w-[100%] sm:min-w-[60%] lg:min-w-[344px] rounded-brand p-6 flex flex-col justify-center items-start space-y-6"
          >
            <div>
              <Image src={SavingsImage} alt="my funds" width="48" />
            </div>

            <h2 className=" text-[--text] font-medium">
              Interest Earned
            </h2>

            <p className="text-[--text] font-bold text-xl lg:text-2xl">
               <NumericFormat
                      value={0}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦ "}
                    />
            </p>
          </div> */}
				</div>
			</div>

			<div className=" flex flex-row  md:hidden justify-between items-center space-x-4">
				<Link
					href="/savings/goals"
					className="btn-2 py-3 flex justify-center whitespace-nowrap text-sm lg:text-base space-x-2 items-center"
				>
					<span>Goal Savings</span>
				</Link>

				<Link
					href="/savings/locked"
					className="btn-1 py-3 flex justify-center text-sm lg:text-base whitespace-nowrap space-x-2 items-center"
				>
					<span>Investment Savings</span>
				</Link>
			</div>
		</section>
	);
}

export default OverviewCard;
