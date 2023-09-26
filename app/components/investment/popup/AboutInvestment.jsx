import React from "react";
import Image from "next/image";

const AboutInvestment = ({ data, investNowFunction }) => {
	return (
		<div>
			<div className="px-7 pb-8 space-y-8 text-[--text-secondary]">
				{/* <div className="py-3 px-7 space-y-2 text-[--text-secondary]">
					<h3 className="text-3xl text-[--text-brand] font-semibold">
						About Investment
					</h3>
					<p>Use the form below to purchase enough investment units.</p>
				</div> */}
				<div className="space-y-5">
					<div className="h-[250px] w-full">
						<Image
							src={data.img}
							alt={data.title}
							width={429}
							height={240}
							className="w-full h-full"
						/>
					</div>
					<p className="pb-3">
						Lorem ipsum dolor sit amet consectetur. Proin risus elit vulputate
						sed ornare aliquet pellentesque. Dignissim venenatis dolor ultrices
						interdum imperdiet pharetra imperdiet tincidunt. Volutpat nunc eget
						lacinia diam libero scelerisque elit sit. Sit condimentum montes
						ante egestas sed sed odio at habitasse.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur. Proin risus elit vulputate
						sed ornare aliquet pellentesque. Dignissim venenatis dolor ultrices
					</p>
				</div>

				<div className="grid grid-cols-3 gap-3">
					<div className="h-[150px] w-full">
						<Image
							src={data.img}
							alt={data.title}
							width={429}
							height={240}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="h-[150px] w-full">
						<Image
							src={data.img}
							alt={data.title}
							width={429}
							height={240}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="h-[150px] w-full">
						<Image
							src={data.img}
							alt={data.title}
							width={429}
							height={240}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>

			<div className="shadow-2xl bg-white px-7 py-9">
				<button
					className="w-full text-white bg-[--text-brand] py-3 px-5 shadow rounded"
					onClick={() => investNowFunction()}
				>
					Invest Now
				</button>
			</div>
		</div>
	);
};

export default AboutInvestment;
