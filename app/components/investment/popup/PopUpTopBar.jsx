import Image from "next/image";

import closeIcon from "../../../../assets/images/icons/closeIcon.svg";

const PopUpTopBar = ({ close }) => {
	return (
		<div className="py-10 px-5 flex justify-end items-center">
			<button
				className="p-[4px] border-2 border-[--lines] rounded-full"
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
	);
};

export default PopUpTopBar;
