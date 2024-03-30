import Image from "next/image";

import closeIcon from "../../../../assets/images/icons/closeIcon.svg";

const PopUpTopBar = ({ close, title, desc }) => {
	return (
		<div className=" bg-white ">
			<div className="popup-px flex justify-end items-center w-full h-[60px] lg:h-[80px]">
				<button
					className="p-[4px] border-2 border-[--lines] hover:bg-[--b1] transitioning rounded-full"
					onClick={() => close()}
				>
					<Image
						src={closeIcon}
						alt="close"
						priority
						width={24}
						height={24}
						className="object-contain w-[24px] h-[24px]"
					/>
				</button>
			</div>
			{title && (
				<div className="pb-2 popup-px space-y-1 text-[--text]">
					<h3 className="popup-header">{title}</h3>
					<p>{desc}</p>
				</div>
			)}
		</div>
	);
};

export default PopUpTopBar;
