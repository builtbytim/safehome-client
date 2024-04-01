import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import SmallDetailsCard from "./SmallDetailsCard";
import SwitchField from "../../forms/branded/SwitchField";
import { NumericFormat } from "react-number-format";
import { useRef, useState } from "react";
import Spinner from "../../Spinner";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import Image from "next/image";
import dummyImage from "../../../../assets/images/investment/inv2.png";
import ProgressBar from "../ProgressBar";
import GoalImage from "../../../../assets/images/investment/inv1.png";

function CreateSafelockPreview({
	closeSelf,
	show,
	handleSubmit,
	formData,
	isLoading,
}) {
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [showErorMsg, setShowErorMsg] = useState(false);
	const ref = useRef(null);

	useOutsideClickDetector(ref, () => {
		if (show) {
			closeSelf();
		}
	});

	function onCreateLockClick() {
		if (!acceptTerms) {
			setShowErorMsg(true);
			return;
		}

		if (isLoading) return;

		handleSubmit();
	}

	return (
		<Overlay2 pos="center">
			<section
				ref={ref}
				className={"w-full md:max-w-[493px] bg-white h-[100vh] z-40"}
			>
				<div className="flex popup-px py-6 flex-row justify-end items-center">
					<div
						onClick={closeSelf}
						className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
					>
						<BiX className="text-3xl" />
					</div>
				</div>

				<div className="overflow-y-auto popup-px scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8 space-y-7">
					<div className="space-y-0">
						<h1 className="popup-miniheader">Savings Investment Preview</h1>
						<p className="font-medium pb-5">Preview details of investment</p>

						{/* image area --------------------- */}
						<div className="">
							<div className={"relative h-[210px] truncate  w-full "}>
								<Image
									src={formData.investibleAsset.coverImageUrl || GoalImage}
									alt="goal image"
									fill
									className="object-cover  h-[210px] w-full"
								/>
								<div className="absolute bg-black/60  inset-0  flex flex-col justify-center items-center truncate">
									<h1 className="text-white capitalize  font-semibold truncate text-xl md:text-2xl xl:text-3xl text-center">
										{formData.investibleAsset.assetName}
									</h1>
								</div>
							</div>
						</div>
					</div>

					<div className="gap-4 md:gap-6 grid grid-cols-2">
						<SmallDetailsCard
							title="Amount to Invest"
							value={
								<NumericFormat
									value={formData.investibleAsset.pricePerUnit}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₦ "}
								/>
							}
						/>
						<SmallDetailsCard
							title="Saving Preference"
							value={
								<span className="capitalize"> {formData.paymentMode} </span>
							}
						/>
						<SmallDetailsCard
							title="Interval"
							value={
								<span className="capitalize">
									{" "}
									{formData.preferredInterval}{" "}
								</span>
							}
						/>
						<SmallDetailsCard
							title="Investment Duration"
							value={`${formData.lockDurationInMonths} ${
								formData.lockDurationInMonths > 1 ? "months" : "month"
							}`}
						/>
					</div>

					<div className="w-full relative flex flex-col justify-center items-start space-y-4">
						<SwitchField
							handleChange={(v) => {
								setAcceptTerms(v);
							}}
							color="#ff9100"
						/>
						<p className="text-[--text] font-medium text-left">
							I hereby acknowledge and authorize SafeHome to invest my funds
							into the designated property. This authorization signifies my
							approval for SafeHome to proceed with the investment on my behalf,
							adhering to the agreed terms and conditions.
						</p>

						{showErorMsg && (
							<p className="absolute -bottom-[25%] left-0 text-[--text-danger] text-xs text-left">
								You must accept the terms and conditions to continue
							</p>
						)}
					</div>

					<div className="flex flex-col justify-center items-center space-y-4 pb-10">
						<button
							disabled={!acceptTerms || isLoading}
							onClick={onCreateLockClick}
							type="submit"
							className="btn-1 w-full  "
						>
							{isLoading ? <Spinner /> : "Invest funds"}
						</button>

						<button
							onClick={closeSelf}
							type="button"
							className="btn-2 w-full  "
						>
							Go Back
						</button>
					</div>
				</div>
			</section>
		</Overlay2>
	);
}

export default CreateSafelockPreview;
