import Image from "next/image";

import closeIcon from "../../../assets/images/icons/closeIcon.svg";

const PopUpTopBar = ({ close, title, desc }) => {
	return (
		<div className=" bg-white  ">
			<div className="popup-px flex justify-end items-center w-full h-[100px]">
				<button
					className="p-[4px] border-2 border-[--lines] hover:bg-[--b1] transitioning rounded-full"
					onClick={() => close()}
				>
					<Image
						src={closeIcon}
						alt="close"
						width={24}
						height={24}
						className="object-contain w-[24px] h-[24px]"
					/>
				</button>
			</div>
			{title && (
				<div className="pb-3 popup-px space-y-2 text-[--text]">
					<h3 className="popup-header">{title}</h3>
					<p className="">{desc}</p>
				</div>
			)}
		</div>
	);
};

export default PopUpTopBar;
