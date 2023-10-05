"use client";
import { useState } from "react";
import Image from "next/image";

import { BsFilterRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import notFoundImg from "../../../assets/images/notFoundImg.png";

function ReferralHistory({ data }) {
	return (
		<div>
			<div className="flex flex-col md:flex-row justify-between gap-5 items-center pt-8">
				<p className="text-[--color-brand] font-medium text-lg px-5">
					Referral History
				</p>
				<div className="flex gap-3">
					<div className="w-full max-w-[300px] bg-[--b1] rounded-[1.1rem] flex gap-3 px-6 items-center">
						<FiSearch className="font-bold text-xl" />
						<input
							type="text"
							placeholder="First Name"
							className="block py-2 w-full rounded outline-none placeholder:text-[--placeholder] font-normal bg-transparent"
						/>
					</div>

					<button className="bg-[--b1] rounded-[1.1rem] flex gap-3 px-6 items-center">
						<BsFilterRight className="font-bold text-xl" />
						<span className="hidden lg:block">Filter</span>
					</button>
				</div>
			</div>

			{data.length < 1 ? (
				<div className="w-full flex flex-col items-center gap-8 pt-8 pb-4">
					<p className="max-w-[300px] text-center text-[--color-brand">
						You have not made any referral yet. Share your code to earn rewards
					</p>
					<div className="max-w-[250px]">
						<Image
							src={notFoundImg}
							width="auto"
							height="auto"
							alt="not found"
							className="w-full h-auto"
						/>
					</div>
				</div>
			) : (
				<div className="py-8">
					<table className="w-full table text-[--text-secondary] font-normal ">
						<thead className="w-full">
							<tr className="table-row w-full uppercase bg-[--b1]">
								<th className=" text-center whitespace-nowrap  py-5 "> S/N </th>
								<th className=" text-left px-6 whitespace-nowrap  py-5 ">
									Date
								</th>
								<th className=" text-left px-6 whitespace-nowrap  py-5 ">
									Referral Name
								</th>
							</tr>
						</thead>

						<tbody>
							{data.map((item, i) => (
								<tr
									key={i}
									className={`table-row text-left text-sm ${
										i % 2 !== 0 && "py-5 uppercase bg-[--b1]"
									}`}
								>
									<td className="py-4 text-center">{i}</td>
									<td className="text-left px-6"> {item.date} </td>
									<td className="text-left px-6">{item.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			<div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-7 border-b border-[--text-brand] py-3 font-semibold text-[--color-brand]">
					<p>Amount earned per referral</p>
					<h3>₦2,000</h3>
				</div>
				<p className="text-sm pt-3">
					This is the amount you earn when your Referrals become members
				</p>
			</div>
		</div>
	);
}

export default ReferralHistory;
