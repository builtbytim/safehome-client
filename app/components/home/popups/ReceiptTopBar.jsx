import Image from "next/image";

import closeIcon from "../../../../assets/images/icons/closeIcon.svg";

const ReceiptTopBar = ({ close, title, desc }) => {
	return (
		<div className=" bg-white">
			<div className="px-5 flex justify-end items-center w-full h-[100px]">
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
			{title && (
				<div className="pb-3 px-7 space-y-1 text-[--text-secondary] text-center py-3 text-lg">
					<p>{title}</p>
					<h3 className="text-3xl font-medium capitalize">{desc}</h3>
				</div>
			)}
		</div>
	);
};

export default ReceiptTopBar;
