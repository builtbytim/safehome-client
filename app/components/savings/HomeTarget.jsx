import Image from "next/image";
import HomeTargetImage from "../../../assets/images/target-home.jpeg";

function HomeTarget() {
	return (
		<div className="">
			<div className="grid grid-cols-5 rounded-[10px] lg:rounded-[16px] border border-[--lines] p-1 lg:p-0">
				<div className="col-span-2">
					<Image
						className="w-full h-full object-cover rounded-[10px] lg:rounded-l-[16px] lg:rounded-r-0"
						width="auto"
						height="auto"
						src={HomeTargetImage}
						alt="home target"
					/>
				</div>

				<div className="self-stretch rounded-r-[16px] col-span-3 py-1 lg:pt-3 lg:pb-4 px-2 md:px-4 space-y-4">
					<h1 className="text-[--primary] text-left font-semibold capitalize xl:text-lg">
						Lekki Estate
					</h1>

					<div className=" flex flex-row justify-between items-center">
						<div className="flex flex-col justify-center items-start">
							<span className="text-[--text-brand-2] font-medium text-sm">
								₦50,000
							</span>
							<span className="text-[--primary] text-left  capitalize text-[0.8rem] leading-[0.88rem] md:text-sm">
								{" "}
								Amount Saved{" "}
							</span>
						</div>

						<div className="flex flex-col justify-center items-end md:items-start">
							<span className="text-[--text-brand-2] text-right font-medium text-sm">
								307
							</span>
							<span className="text-[--primary] text-right  capitalize text-[0.8rem] leading-[0.88rem] md:text-sm  ">
								Days Left
							</span>
						</div>
					</div>

					{/* Progress bar and percent */}

					<div className="flex flex-row  justify-between items-center md:items-start space-x-8 lg:space-x-16">
						<div className="relative self-center w-full h-[7px] rounded-brand  bg-[#DDDDDD] ">
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
