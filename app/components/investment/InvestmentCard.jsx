"use client";

import React from "react";
import Image from "next/image";

const InvestmentCard = ({
	img,
	title,
	returns,
	value,
	investors,
	quantity,
	openInfo,
}) => {
	return (
		<div className="rounded md:rounded-lg lg:rounded-xl border overflow-hidden text-[--text-secondary] text-left relative grid grid-cols-5 md:grid-cols-5 h-[165px] md:h-[192px]">
			<div className="w-full h-full col-span-2 md:col-span-2 overflow-x-hidden">
				<Image
					src={img}
					alt={title}
					className="object-cover w-full h-full"
					width={200}
					height={192}
				/>
			</div>
			<div className="p-3 md:px-4 xl:px-7 col-span-3 md:col-span-3 space-y-1">
				<button
					className="uppercase font-medium text-[1rem] leading-[1.2rem] md:text-xl md:leading-[1.4rem] xl:text-[1.35rem] xl:leading-[1.55rem] max-h-[2.4rem] md:max-h-[2.8rem] xl:max-h-[3.1rem] text-left overflow-hidden hover:text-[--text-brand]"
					onClick={() => openInfo()}
				>
					{title}
				</button>
				<p className="text-[0.75rem] leading-[1] md:text-sm">
					<span className="text-[--green] font-medium">{returns}</span> returns
					in 12 months
				</p>
				<div className="flex gap-3 md:gap-5 pt-3 text-[0.75rem] leading-[1] md:text-sm">
					<div>
						<h3 className="text-[--text-brand] text-[1rem] leading-[1.2rem] md:text-xl pb-1 font-medium">
							₦{value}
						</h3>
						<p className="mt-[-4px]">Asset Value</p>
					</div>
					<div>
						<h3 className="text-[--text-brand] text-[1rem] leading-[1.2rem] md:text-xl pb-1 font-medium">
							{investors}
						</h3>
						<p className="mt-[-4px]">Investors</p>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 right-0 rounded-tl-xl py-[0.4rem] md:py-2 px-3 text-white bg-[--green] text-[0.7rem] md:text-sm">
				{quantity} Available
			</div>
		</div>
	);
};

export default InvestmentCard;
