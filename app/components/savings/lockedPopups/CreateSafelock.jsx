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
				<div className="flex popup-px py-6 flex-row justify-end items-center">
					<div
						onClick={toggleShow}
						className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
					>
						<BiX className="text-[--text] text-3xl" />
					</div>
				</div>

				<div className="overflow-y-auto  scroll-fix max-h-[90vh] md:max-h-[85vh] pb-8">
					<div className="px-6">
						<h1 className="popup-miniheader">
							How long do you want to invest funds?
						</h1>
						<p className="font-medium text-sm pt-2">
							Select a duration that you want to invest your funds before it is
							invested in an investment of your choice
						</p>
					</div>

					<div className="popup-px space-y-3 md:space-y-4  pt-6">
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
								<span className="">
									{v} {v > 1 ? "months" : "month"}{" "}
								</span>

								{/* <span className="text-[--header]">@7% per annum</span> */}
							</div>
						))}
					</div>
				</div>
			</section>
		</Overlay2>
	);
}

export default CreateSafelock;
